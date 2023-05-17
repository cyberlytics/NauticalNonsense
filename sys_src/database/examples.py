from pymongo import MongoClient
from pymongo.server_api import ServerApi

mongo_url = "mongodb+srv://nn_user:nn_bsyjntss@nauticalnonsens.lflmzfg.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_url, server_api=ServerApi('1'))
db = client.NauticalNonsens
games = db.games

#Example: Get last entry in collection
game = games.find_one()

#Example: Insert one entry in collection
doc = {"game_id": 3,
       "current_player": 1,
       "board":{"11": 1, "12": 1, "21": 0, "22": 2}}
doc_id = str(games.insert_one(doc).inserted_id)

#Examples: Insert more entries in collection
doc2 = {"game_id": 1,
       "current_player": 2,
       "board":{"11": 0, "12": 1, "21": 1, "22": 2}}
doc3 = {"game_id": 2,
       "current_player": 1,
       "board":{"11": 0, "12": 0, "21": 0, "22": 0}}
doc4 = {"game_id": 2,
       "current_player": 2,
       "board":{"11": 1, "12": 0, "21": 0, "22": 0}}
inserted_games = games.insert_many([doc2,doc3,doc4])

#Example: Get all entries in collection
all_games = games.find()

#Example: Get all entries for specific game_id
game_with_id1 = games.find({"game_id": 1})
#Iterate over cursor
for game1 in game_with_id1:
    print(game1)