from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_polling():
    response = client.get("/polling")
    assert response.status_code == 200
    assert response.json() == {"message": "Es wurde 1 Mal gepollt"}

    response = client.get("/polling")
    assert response.status_code == 200
    assert response.json() == {"message": "Es wurde 2 Mal gepollt"}

# def test_websocket():
#     with client.websocket_connect("/ws") as websocket:
#         data = websocket.receive_json()
#         assert data == {"msg": "Hello WebSocket"}
