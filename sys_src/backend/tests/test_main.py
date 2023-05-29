from fastapi.testclient import TestClient
import uuid

from ..main import app

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
    assert len(response.json()) == 1
    assert response.json() == {"not ready": False}

    second_client_id = str(uuid.uuid4())
    response = client.post(f"/against_random?client_id={second_client_id}")
    assert len(response.json()) == 2
    assert response.json() == {"player1": first_client_id, "player2": second_client_id}


# def test_websocket():
#     with client.websocket_connect("/ws") as websocket:
#         data = websocket.receive_json()
#         assert data == {"msg": "Hello WebSocket"}
