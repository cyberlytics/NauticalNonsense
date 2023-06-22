from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from play_game import prepare_room, get_partner_id, make_move, _create_game_field, set_gameover_fields
from websocket_manager import ConnectionManager
import uuid
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database.examples import get_all_games
from database.database import get_current_state, get_leaderboard, add_rank, add_placement, get_stat, update_game_capitulation
from database.models import LeaderboardWithRank, Stat
import datetime

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


async def handle_websocket_disconnect(manager: ConnectionManager, data: dict, client_id: str):
    # Disconnect command
    if 'Disconnect' in data:
        await manager.disconnect(client_id)

    # Disconnect if partner has disconnected
    if 'Client has left' in data:
        await manager.disconnect(client_id)
        

async def handle_websocket_data(manager: ConnectionManager, data: dict, client_id: str, partner_id: str):
    # get_uuid_from_websocket geht noch nicht
    uuid_client = manager.get_uuid_from_websocket(manager)
    # ship placement
    # todo wenn beide ihr Schiffe versendet haben dann noch eine flag an beide senden
    if data.get('Shiplist', False) and len(data['Shiplist']) == 7:
        # validate ship placement
        game_id = data['GameID']
        board = _create_game_field(data['Shiplist'])

        # add ships and board placement to map
        player_which_starts = add_placement(client_id, data["Shiplist"], board, game_id)
        data['message'] = ["ship_placement_ready", player_which_starts]
        return None

    if data.get('Fire', False):
        move = data['Fire']
        game_id = data['GameID']
        data['lose'], data['hit'], data['board'] = make_move(move, partner_id, game_id)
        if data['lose'] == True:
            end_state = get_current_state(game_id)
            data['finished'] = True
            data['gameover'] = {}
            set_gameover_fields(client_id, end_state, True, data['gameover'])
        return None

    if data.get('Capitulate', False):
        game_id = data['GameID']
        end_state = update_game_capitulation(client_id, game_id)
        data['finished'] = True
        data['gameover'] = {}
        set_gameover_fields(client_id, end_state, True, data['gameover'])
        return None
    

# Use Kafka for a persistant WebSocket-List
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    
    # partner is viable, because ws only build if 2 guys are waiting
    partner_id = await get_partner_id(client_id)
    
    # if partner_id != None -> Message partner that game is ready
    if partner_id != None and partner_id != "":
        init_message = {"message": "ready"}
        await manager.send_personal_message(init_message, client_id)
        await manager.send_personal_message(init_message, partner_id)

    try:
        while True:       
            data = await websocket.receive_json()

            if partner_id != None or partner_id != "":
                partner_id = await get_partner_id(client_id)

            await handle_websocket_disconnect(manager, data, client_id)
            await handle_websocket_data(manager, data, client_id, partner_id)

            response = {"message": data}
            await manager.send_personal_message(response, partner_id)

            if data.get('board', False):
                await manager.send_personal_message(response, client_id)

            if data.get('finished', False):
                end_state = get_current_state(data['GameID'])
                set_gameover_fields(partner_id, end_state, False, data['gameover'])
                response = {"message": data}
                await manager.send_personal_message(response, client_id)

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

#Route for statistics
@app.get("/stats", response_model = Stat)
def get_stat_api():
    stat = get_stat()
    return stat