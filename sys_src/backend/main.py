from fastapi import FastAPI, WebSocket, WebSocketDisconnect
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
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()
polling_count = 0

@app.get("/")
def startpage():
    client_id = uuid.uuid4()
    return client_id


@app.get("/polling")
def polling():
    global polling_count
    polling_count += 1
    return {"message": f"Es wurde {polling_count} Mal gepollt"}


@app.post("/against_random")
def against_random(client_id: str):
    # init to wait/play against random
    # if frontend gets two player_ids, then it should use websockets
    ready = prepare_room(client_id, "random")
    return ready

@app.post("/against_friend")
def against_friend(client_id, name: str):
    # init to wait/play against friend
    # rename get_new_room to prepare_room, doesnt have to return something
    prepare_room(client_id, "friend")
    return JSONResponse({"websocket_route": f"ws/{client_id}"})
    

@app.post("/against_computer")
def against_computer(client_id):
    # init to play against computer
    # rename get_new_room to prepare_room, doesnt have to return something
    prepare_room(client_id, "computer")
    return JSONResponse({"websocket_route": f"ws/{client_id}"})


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


# Use Kafka for a persistant WebSocket-List
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    
    # partner is viable, because ws only build if 2 guys are waiting
    partner_id = await get_partner_id(client_id)
    
    try:
        while True:       
            data = await websocket.receive_json()
            # validate the data
            response = {"message received in the backend": data}
            await manager.send_personal_message(response, partner_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.send_personal_message({"Client has left": client_id}, partner_id)


#Route for leaderboard
@app.get("/leaderboard", response_model = LeaderboardWithRank)
def get_leaderboard_api():
    leaders_human = get_leaderboard(againstComputer=False)
    leaders_human_rank = add_rank(leaders_human)
    leaders_computer = get_leaderboard(againstComputer=True)
    leaders_computer_rank = add_rank(leaders_computer)
    return LeaderboardWithRank(leadersHuman=leaders_human_rank, leadersComputer=leaders_computer_rank)