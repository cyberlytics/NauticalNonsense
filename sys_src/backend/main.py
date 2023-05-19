from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from play_game import existing_game, validate_move, get_new_room, get_partner_id
from websocket_manager import ConnectionManager
import uuid
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()
polling_count = 0


@app.get("/")
def startpage():
    return {"message": "Hello World"}


@app.get("/polling")
def polling():
    global polling_count
    polling_count += 1
    return {"message": f"Es wurde {polling_count} Mal gepollt"}


@app.get("/against_random")
def against_random():
    # create uuid for client
    client_id = uuid.uuid4().int
    # check if someone is waiting for opponent
    room_id = get_new_room(client_id, "random")
    return JSONResponse({"websocket_route": f"ws/{room_id}"})


@app.post("/against_friend")
def against_friend(name: str):
    client_id = uuid.uuid4().int
    room_id = get_new_room(client_id, "friend")
    return JSONResponse({"websocket_route": f"ws/{room_id}"})
    

@app.get("/against_computer")
def against_computer():
    client_id = uuid.uuid4().int
    room_id = get_new_room(client_id, "computer")
    return JSONResponse({"websocket_route": f"ws/{room_id}"})


# Diese Route wird vom Frontend aufgerufen, wenn die Verbindung bei den Websockets abbricht (ohne sieger)
# reconnect to most recent game played with the player_id
@app.get("/continue")
def continue_game(player_id: int):
    pass


# hier noch nicht sicher, ob ich room_id oder client_id nutze.
@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    # check if connection is correct
    
    partner_id = get_partner_id(client_id)

    await manager.connect(websocket, client_id)
    try:
        while True:
            # check if two guys are in one room
            # if ready(): 
            data = await websocket.receive_json()
            # validate the data
            response = {"message received in the backend": data}
            await manager.send_personal_message(response, partner_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.send_personal_message({"Client has left": client_id}, partner_id)

