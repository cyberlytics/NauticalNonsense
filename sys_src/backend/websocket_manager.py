from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: str):
        del self.active_connections[client_id]

    async def send_personal_message(self, message: dict, partner_id: str):
        try:
            print("websocket_manager, partner_id = " + partner_id)
            target_client = self.active_connections.get(partner_id)
            print("websocket_manager, target_client = " + str(target_client))
            await target_client.send_json(message)
        except:
            pass

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

    def all_websockets(self):
        print(self.active_connections.keys())