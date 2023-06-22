from fastapi.testclient import TestClient
import uuid
import time
from websocket_manager import ConnectionManager
import pytest
from unittest.mock import AsyncMock
from main import handle_websocket_disconnect, websocket_endpoint
from fastapi.responses import JSONResponse
import asyncio
from unittest.mock import patch, AsyncMock
import pytest
from fastapi import WebSocket
from database.models import LeaderboardWithRank, Stat


from main import app
from utils import is_valid_uuid

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert isinstance(response.json(), str)
    
    
def test_play_no_data():
    response = client.post("/play", json={})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}

    response = client.post("/play")
    assert response.status_code == 422


def test_play_false_data():
    response = client.post("/play", json={"false1": 1, "false2": 3, "false3": 3})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}

    response = client.post("/play", json=123)
    assert response.status_code == 422

    response = client.post("/play", json=["client_id", "mode", "friend"])
    assert response.status_code == 422

    response = client.post("/play", content=b"test")
    assert response.status_code == 422


def test_play_incomplete_data():
    response = client.post("/play", json={"client_id": "some_id"})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}
    
    response = client.post("/play", json={"mode": "random"})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}

    response = client.post("/play", json={"friend": "some_name"})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}

    response = client.post("/play", json={"client_id": "some_id", "mode": "random"})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}

    response = client.post("/play", json={"friend": "some_name", "mode": "random"})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}

    response = client.post("/play", json={"friend": "some_name", "client_id": "some_id"})
    assert response.status_code == 404
    assert response.json() == {"message": "invalid data"}


def test_play_against_random():
    client_id1 = str(uuid.uuid4())
    client_id2 = str(uuid.uuid4())

    mock_data_player1 = {"client_id": client_id1, "mode": "random", "friend": None}
    mock_data_player2 = {"client_id": client_id2, "mode": "random", "friend": None}

    response = client.post(f"/play", json=mock_data_player1)

    # need this check, if an imbalance in database is. because a open random game could hinder this unit-test
    if response.json()['ready'] == False:
        assert response.status_code == 200
        assert response.json() == {"ready": False}

        response = client.post(f"/play", json=mock_data_player2)
        assert response.status_code == 200
        assert set(response.json()['ready'].values()) == {client_id1, client_id2}

    else:
        assert response.status_code == 200
        assert client_id1 in response.json()['ready'].values()

'''
Hier ist folgendes Problem:
durch with client.websocket_connect(f"/ws/{client_id1}") as websocket1: wird der websocket nicht im websocker_manager.py erfasst
dadurch kann keine Verbindung zum zweiten Websocket aufgebaut werden. Wenn keine Verbindung zwischen den beiden Websockets ist,
können keine Nachrichten hin und her geschickt werden.
Des Weiteren kann man das websocket1 Objekt nicht einfach an die connect Methode von websocket_manager.py übergeben, hier wirft er einen Fehler

@pytest.mark.asyncio
async def test_websocket_messages():
    client_id1 = str(uuid.uuid4())
    client_id2 = str(uuid.uuid4())

    mock_data_player1 = {"client_id": client_id1, "mode": "random", "friend": None}
    mock_data_player2 = {"client_id": client_id2, "mode": "random", "friend": None}

    response = client.post(f"/play", json=mock_data_player1)

    if response.json()['ready'] == False:
        with client.websocket_connect(f"/ws/{client_id1}") as websocket1:
            client.post(f"/play", json=mock_data_player2)
            with client.websocket_connect(f"/ws/{client_id2}") as websocket2:

                send_data = {"msg": "Hello WebSocket"}
                websocket1.send_json(send_data)
                time.sleep(1)
                received_data = websocket2.receive_json()
                assert received_data == {"message received in the backend": send_data}
                websocket2.close()
            
            websocket1.close()

    else:
        with client.websocket_connect(f"/ws/{client_id1}") as websocket1:
            with client.websocket_connect(f"/ws/{response.json()['player2']}") as websocket2:
                send_data = {"msg": "Hello WebSocket"}
                websocket1.send_json(send_data)
                time.sleep(1)
                received_data = websocket2.receive_json()
                assert received_data == {"message received in the backend": send_data}
                websocket2.close()

            websocket1.close()
'''

@pytest.mark.asyncio
async def test_websocket_init():
    client_id1 = str(uuid.uuid4())
    client_id2 = str(uuid.uuid4())

    mock_data_player1 = {"client_id": client_id1, "mode": "random", "friend": None}
    mock_data_player2 = {"client_id": client_id2, "mode": "random", "friend": None}

    response = client.post(f"/play", json=mock_data_player1)

    if response.json()['ready'] == False:
        with client.websocket_connect(f"/ws/{client_id1}") as websocket1:
            client.post(f"/play", json=mock_data_player2)
            with client.websocket_connect(f"/ws/{client_id2}") as websocket2:
                time.sleep(1)
                assert websocket1.receive_json() == {"message": "ready"}
                assert websocket2.receive_json() == {"message": "ready"}
                websocket2.close()
            
            websocket1.close()
    
    else:
        with client.websocket_connect(f"/ws/{client_id1}") as websocket1:
            with client.websocket_connect(f"/ws/{response.json()['player2']}") as websocket2:
                time.sleep(1)
                assert websocket1.receive_json() == {"message": "ready"}
                assert websocket2.receive_json() == {"message": "ready"}
                websocket2.close()

            websocket1.close()
    


@pytest.mark.asyncio
async def test_websocket_disconnect():
    manager = ConnectionManager()
    first_client_id = str(uuid.uuid4())
    second_client_id = str(uuid.uuid4())

    # Mock the websockets
    mock_websocket1 = AsyncMock()
    mock_websocket1.accept = AsyncMock()
    mock_websocket1.close = AsyncMock()
    mock_websocket1.receive_json = AsyncMock(return_value={"Disconnect": ""})

    mock_websocket2 = AsyncMock()
    mock_websocket2.accept = AsyncMock()
    mock_websocket2.close = AsyncMock()
    mock_websocket2.receive_json = AsyncMock(return_value={"Client has left": first_client_id})

    # Connect the clients
    await manager.connect(mock_websocket1, first_client_id)
    await manager.connect(mock_websocket2, second_client_id)

    # Run the handle_websocket_data function
    await handle_websocket_disconnect(manager, {"Disconnect": ""}, first_client_id)
    await handle_websocket_disconnect(manager, {"Client has left": first_client_id}, second_client_id)

    # Ensure the clients have been disconnected
    assert second_client_id not in manager.all_websockets()
    assert first_client_id not in manager.all_websockets()


def test_leaderboard():
    response = client.get("/leaderboard")
    assert response.status_code == 200
    LeaderboardWithRank.parse_obj(response.json())

def test_stats():
    response = client.get("/stats")
    assert response.status_code == 200
    Stat.parse_obj(response.json())