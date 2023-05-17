from pymongo import MongoClient
from pymongo.server_api import ServerApi

mongo_url = "mongodb+srv://nn_user:nn_bsyjntss@nauticalnonsens.lflmzfg.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_url, server_api=ServerApi('1'))
db = client.NauticalNonsens
games = db.games

#Example: Get last entry in collection
game = games.find_one()