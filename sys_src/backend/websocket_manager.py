from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    async def disconnect(self, client_id: str):
        websocket = self.active_connections.get(client_id)
        if websocket:
            await websocket.close()
        try:
            del self.active_connections[client_id]
        except KeyError:
            raise KeyError

    async def send_personal_message(self, message: dict, partner_id: str):
        try:
            print("websocket_manager, partner_id = " + partner_id)
            target_client = self.active_connections.get(partner_id)
            print("websocket_manager, target_client = " + str(target_client))
            await target_client.send_json(message)
        except:
            pass

    async def broadcast(self, message: dict):
        for connection in self.active_connections.values():
            await connection.send_json(message)

    def all_websockets(self):
        return list(self.active_connections.keys())
