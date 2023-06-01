from fastapi.testclient import TestClient
import uuid
import time

from main import app
from utils import is_valid_uuid

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert isinstance(response.json(), str)
    assert is_valid_uuid(response.json())

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
    assert len(response.json()) == 1
    assert response.json() == {"not ready": False}

    second_client_id = str(uuid.uuid4())
    response = client.post(f"/against_random?client_id={second_client_id}")
    assert len(response.json()) == 2
    assert response.json() == {"player1": first_client_id, "player2": second_client_id}


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
        websocket1.close()
            


'''
        send_data = {"msg": "Hello WebSocket"}
        websocket.send_json(send_data)

    with client.websocket_connect("/ws/54321") as websocket:
        data = websocket.receive_json()
        assert data == {"msg": "Hello WebSocket"}
'''