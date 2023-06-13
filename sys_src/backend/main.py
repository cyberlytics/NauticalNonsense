from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from play_game import prepare_room, get_partner_id
from websocket_manager import ConnectionManager
import uuid
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database.examples import get_all_games
from database.database import get_leaderboard, add_rank
from database.models import LeaderboardWithRank

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080","http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()


@app.get("/")
def startpage():
    client_id = uuid.uuid4()
    return client_id


@app.post("/play")
def play(user_input: dict):
    if 'client_id' not in user_input:
        return JSONResponse(
            status_code=404,
            content={"message": "invalid data"},
        )
    if 'mode' not in user_input:
        return JSONResponse(
            status_code=404,
            content={"message": "invalid data"},
        )
    if 'friend' not in user_input:
        return JSONResponse(
            status_code=404,
            content={"message": "invalid data"},
        )
    
    # init to wait/play against random
    # if frontend gets two player_ids, then it should use websockets
    ready = prepare_room(user_input['client_id'], user_input['mode'], user_input['friend'])
    return ready

@app.get("/mongo_entries")
def mongo_entries():
    games = get_all_games()
    games_list = []
    for i, x in enumerate(games):
        games_list.append(x)
    return str(games_list), i


# Diese Route wird vom Frontend aufgerufen, wenn die Verbindung bei den Websockets abbricht (ohne sieger)
# reconnect to most recent game played with the player_id
@app.get("/continue")
def continue_game(player_id: int):
    pass


async def handle_websocket_data(manager: ConnectionManager, data: dict, client_id: str):
    # Disconnect command
    print("manger in handle_websocket_data ist:" + str(id(manager)))

    if 'Disconnect' in data:
        await manager.disconnect(client_id)

    # Disconnect if partner has disconnected
    if 'Client has left' in data:
        await manager.disconnect(client_id)


# Use Kafka for a persistant WebSocket-List
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    
    # partner is viable, because ws only build if 2 guys are waiting
    partner_id = await get_partner_id(client_id)
    
    # if partner_id != None -> Message partner that game is ready
    if partner_id != None and partner_id != "":
        init_message = {"message received in the backend": "ready"}
        await manager.send_personal_message(init_message, client_id)
        await manager.send_personal_message(init_message, partner_id)

    try:
        while True:       
            data = await websocket.receive_json()

            await handle_websocket_data(manager, data, client_id)
            
            # validate the data
            response = {"message received in the backend": data}
            await manager.send_personal_message(response, partner_id)

    except WebSocketDisconnect:
        await manager.disconnect(client_id)
        await manager.send_personal_message({"Client has left": client_id}, partner_id)


#Route for leaderboard
@app.get("/leaderboard", response_model = LeaderboardWithRank)
def get_leaderboard_api():
    leaders_human = get_leaderboard(againstComputer=False)
    leaders_human_rank = add_rank(leaders_human)
    leaders_computer = get_leaderboard(againstComputer=True)
    leaders_computer_rank = add_rank(leaders_computer)
    return LeaderboardWithRank(leadersHuman=leaders_human_rank, leadersComputer=leaders_computer_rank)