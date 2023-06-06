import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import math
from database.models import State, Winner, WinnerWithRank
import uuid
import datetime

mongo_url = "mongodb+srv://nn_user:nn_bsyjntss@nauticalnonsens.lflmzfg.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_url, server_api=ServerApi('1'))
db = client.NauticalNonsens
gamestates = db.gamestates
stats = db.stats
leaderboard = db.leaderboard
games = db.games


def get_current_state(game_id: str) -> State:
    current_state = gamestates.find_one({"game_id": game_id}, sort=[("timestamp",pymongo.DESCENDING)])
    if not current_state:
        return None
    return State.parse_obj(current_state)

def save_state(state: State) -> State:
    gamestates.insert_one(state.dict())
    return state

def get_map(client_id: str, mode: str, game_id: uuid = None) -> State:
    '''
    return map_id for the connection in websockets.
    if there is no map with a player waiting create a new map
    '''
    if mode == 'computer':
        pass
    elif mode == 'friend':
        pass
    elif mode == 'random':
        map_data = games.find_one({"game_id": {"$exists": True, "$ne": ""}, "gameMode": mode, "player1": {"$exists": True, "$ne": ""}, "player2": {"$exists": True, "$eq": ""}})
        if map_data:
            games.update_one({"_id": map_data["_id"]}, {"$set": {"player2": client_id}})
            # player2 is client_id, because this if-statement is only executed with player2, so client_id is the id of player2
            # in addition is the map_data still the old one before games.update_one(), so if you query the same way as player1,
            # you get an empty string
            ret_obj = {"player1": State.parse_obj(map_data).player1,
                       "player2": client_id}
            return ret_obj
        else:
            game_id = create_map(client_id, mode)
            map_data = games.find_one({"game_id": str(game_id), "gameMode": mode, "player1": {"$exists": True, "$ne": ""}, "player2": {"$exists": ""}})
            return {"not ready": False}
    

def create_map(client_id: uuid, mode: str) -> uuid:
    game_id = uuid.uuid4()
    map_data = {
        "game_id": str(game_id),
        "gameMode": mode,
        "player1": str(client_id),
        "player2": "",
        "next_player": "",
        "isFinished": False,
        "winner": "",
        "step": 0,
        "board1": [],
        "board2": [],
        "ships1": [],
        "ships2": [],
        "timestamp": datetime.datetime.now()
    }

    str(games.insert_one(map_data).inserted_id)
    
    return game_id

async def get_partner(client_id: str):
    map_data = games.find_one({"$or": [{"player1": client_id}, {"player2": client_id}]})
    if map_data:
        if map_data["player1"] == client_id:
            return map_data["player2"]
        else:
            return map_data["player1"]
    else:
        return None


# deletes all entrys
#games.delete_many({})


def get_leaderboard(againstComputer:bool, limit: int = 10) -> list[Winner]:
    leaders = []
    winners = leaderboard.find({"againstComputer": againstComputer}, sort=[("moves",pymongo.ASCENDING), ("name",pymongo.ASCENDING)], limit=limit)
    for winner in winners:
        leaders.append(Winner.parse_obj(winner))
    return leaders

def insert_winner(current_state: State) -> Winner:
    name = current_state.winner
    moves = math.ceil(current_state.step/2)
    againstComputer = current_state.againstComputer
    
    winner = Winner(name=name, moves=moves, againstComputer=againstComputer)
    leaderboard.insert_one(winner.dict())
    return winner

def add_rank(leaders = list[Winner]) -> list[WinnerWithRank]:
    leaders_rank = []
    current_moves = 0
    rank = 0
    for leader in leaders:
        if leader.moves > current_moves:
            rank += 1
            current_moves = leader.moves
        leaders_rank.append(WinnerWithRank(name=leader.name,moves=leader.moves,rank=rank))
    return leaders_rank