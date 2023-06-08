from fastapi.testclient import TestClient
from fastapi import WebSocket
import uuid
import time
from websocket_manager import ConnectionManager
import pytest
from play_game import get_partner_id



from main import app

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert isinstance(response.json(), str)

def test_polling():
    response = client.get("/polling")
    assert response.status_code == 200
    assert response.json() == {"message": "Es wurde 1 Mal gepollt"}

    response = client.get("/polling")
    assert response.status_code == 200
    assert response.json() == {"message": "Es wurde 2 Mal gepollt"}

def test_against_random():
    first_client_id = str(uuid.uuid4())
    response = client.post(f"/against_random?client_id={first_client_id}")
    # unit-test runs with one guy beforehand waiting for random guy.
    # if that case happens, client.post() should run only one time
    if len(response.json()) == 1:
        assert len(response.json()) == 1
        assert response.json() == {"not ready": False}
        second_client_id = str(uuid.uuid4())
        response = client.post(f"/against_random?client_id={second_client_id}")
        assert len(response.json()) == 2
        assert response.json() == {"player1": first_client_id, "player2": second_client_id}
    elif len(response.json()) == 2:
        assert len(response.json()) == 2
        second_client_id = first_client_id
        assert second_client_id in response.json()['player2']


def test_websocket():
    first_client_id = str(uuid.uuid4())
    second_client_id = str(uuid.uuid4())
    client.post(f"/against_random?client_id={first_client_id}")
    client.post(f"/against_random?client_id={second_client_id}")

    with client.websocket_connect(f"/ws/{first_client_id}") as websocket1:
        with client.websocket_connect(f"/ws/{second_client_id}") as websocket2:
            send_data = {"msg": "Hello WebSocket"}
            websocket1.send_json(send_data)
            time.sleep(1)
            received_data = websocket2.receive_json()
            assert received_data == {"message received in the backend": send_data}
            websocket2.close()

        received_break_data = websocket1.receive_json()
        assert received_break_data == {"Client has left": second_client_id}

        websocket1.close()

'''
@pytest.mark.asyncio
async def test_websocket_class():
    manager = ConnectionManager()
    first_client_id = str(uuid.uuid4())
    second_client_id = str(uuid.uuid4())
    client.post(f"/against_random?client_id={first_client_id}")
    client.post(f"/against_random?client_id={second_client_id}")
    with client.websocket_connect(f"/ws/{first_client_id}") as websocket1:
        with client.websocket_connect(f"/ws/{second_client_id}") as websocket2:
            await manager.connect(websocket1, first_client_id)
            await manager.connect(websocket2, second_client_id)
            await manager.disconnect(second_client_id)
        received_break_data = websocket1.receive_json()
        assert received_break_data == {"Client has left": second_client_id}
        await websocket1.close()
'''