from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}

    async def connect(self, websocket: WebSocket, client_id: int):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: int):
        del self.active_connections[client_id]

    async def send_personal_message(self, message: dict, partner_id: int):
        try:
            target_client = self.active_connections.get(partner_id)
            await target_client.send_json(message)
        except:
            pass

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)