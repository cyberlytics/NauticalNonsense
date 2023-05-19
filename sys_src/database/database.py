import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from models import State

mongo_url = "mongodb+srv://nn_user:nn_bsyjntss@nauticalnonsens.lflmzfg.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_url, server_api=ServerApi('1'))
db = client.NauticalNonsens
gamestates = db.gamestates
stats = db.stats


def get_current_state(game_id: str) -> State:
    current_state = gamestates.find_one({"game_id": game_id}, sort=[("timestamp",pymongo.DESCENDING)])
    if not current_state:
        return None
    return State.parse_obj(current_state)

def save_state(state: State) -> State:
    gamestates.insert_one(state.dict())
    return state