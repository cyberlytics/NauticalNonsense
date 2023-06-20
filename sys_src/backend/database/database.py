import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import math
from database.models import State, Winner, WinnerWithRank, Stat
import uuid
import datetime
import random

mongo_url = "mongodb+srv://nn_user:nn_bsyjntss@nauticalnonsens.lflmzfg.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_url, server_api=ServerApi('1'))
db = client.NauticalNonsens
gamestates = db.gamestates
stats = db.stats
leaderboard = db.leaderboard
games = db.games

shipsCount = [2,2,1,1,1] #number of ships per type
shipsTiles = [2,4,3,4,5] #number of tiles per shiptype

#Gamestates
def get_current_state(game_id: str) -> State:
    current_state = gamestates.find_one({"game_id": game_id}, sort=[("timestamp",pymongo.DESCENDING)])
    if not current_state:
        return None
    return State.parse_obj(current_state)

def save_state(state: State) -> State:
    gamestates.insert_one(state.dict())
    return state

# todo unbennen in anderen Namen, man bekommt ja effektiv den Spielernamen zurück, nicht die map data
def get_map(client_id: str, mode: str, friend: str = None, game_id: uuid = None) -> dict:
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
                       "player2": client_id,
                       "game_id": State.parse_obj(map_data).game_id}
            return {"ready": ret_obj}
        else:
            game_id = create_map(client_id, mode)
            map_data = games.find_one({"game_id": str(game_id), "gameMode": mode, "player1": {"$exists": True, "$ne": ""}, "player2": {"$exists": ""}})
            return {"ready": False, "game_id": State.parse_obj(map_data).game_id}
    

def create_map(client_id: uuid, mode: str) -> uuid:
    game_id = uuid.uuid4()
    map_data = {
        "game_id": str(game_id),
        "player1": str(client_id),
        "player1Name": "",
        "player2": "",
        "player2Name": "",
        "next_player": "",
        "gameMode": mode,
        "gameStatus": "",
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


def add_placement(client_id: str, list_of_ships: list, board: list, game_id: str):
    map_data = games.find_one({
        "$or": [{"player1": client_id}, {"player2": client_id}],
        "game_id": game_id,
        "ships1": {"$eq": []},
        "ships2": {"$eq": []}
    })
    if map_data:
        # Wenn next_player noch nicht gesetzt ist, zufällig auswählen, welcher Spieler das Spiel beginnt.
        first_player = map_data["next_player"]
        if not first_player:
            first_player = random.choice([map_data["player1"], map_data["player2"]])

        if map_data["player1"] == client_id:
            games.update_one({"_id": map_data["_id"]}, {"$set": {"ships1": list_of_ships, "board1": board, "next_player": first_player}})
        elif map_data["player2"] == client_id:
            games.update_one({"_id": map_data["_id"]}, {"$set": {"ships2": list_of_ships, "board2": board, "next_player": first_player}})
        
        # return the starting player
        return first_player
    else:
        print("No matching game for this client")
        return None


def get_ships(client_id, game_id):
    filter = {'game_id': game_id}
    count = games.count_documents(filter)
    result = games.find(filter).sort('step', -1).limit(1)

    if count > 0:
        game_state = result.next()

        if game_state['player1'] == client_id:
            return game_state['ships1'], game_state['board1']
        elif game_state['player2'] == client_id:
            return game_state['ships2'], game_state['board2']
    
    return None

def get_board(client_id, game_id):
    filter = {'game_id': game_id}
    count = games.count_documents(filter)
    result = games.find(filter).sort('step', -1).limit(1)

    if count > 0:
        game_state = result.next()

        if game_state['player1'] == client_id:
            return game_state['board1']
        elif game_state['player2'] == client_id:
            return game_state['board2']
    
    return None

def update_game_with_playermove(client_id: str, game_id: str, game_field: list[int], ships: list[list[int]], won: bool = None) -> None:
    filter = {'game_id': game_id}
    count = games.count_documents(filter)
    result = games.find(filter).sort('step', -1).limit(1)

    if count > 0:
        game_state = result.next()

        # Define the field names
        board_field = 'board1' if game_state['player1'] == client_id else 'board2'
        ships_field = 'ships1' if game_state['player1'] == client_id else 'ships2'

        update_fields = {
            board_field: game_field,
            ships_field: ships
        }

        # If the game is won, set the isFinished field to True and update the winner
        if won:
            update_fields.update({
                'isFinished': True,
                'winner': client_id
            })

        # Update the game state
        games.update_one(
            {'_id': game_state['_id']},
            {'$set': update_fields, '$inc': {'step': 1}}
        )
    else:
        print(f"No game found with game_id: {game_id}")



# deletes all entrys
#games.delete_many({})


#Leaderboard
def get_leaderboard(againstComputer:bool, limit: int = 10) -> list[Winner]:
    leaders = []
    winners = leaderboard.find({"againstComputer": againstComputer}, sort=[("moves",pymongo.ASCENDING), ("name",pymongo.ASCENDING)], limit=limit)
    for winner in winners:
        leaders.append(Winner.parse_obj(winner))
    return leaders

def insert_winner(current_state: State) -> Winner:
    name = current_state.winner
    moves = math.ceil(current_state.step/2)
    if current_state.gameMode == "pc":
        againstComputer = True
    else:
        againstComputer = False    
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


#Gamestatistics
def get_stat() -> Stat:
    stat = stats.find_one({}, sort=[("timestamp",pymongo.DESCENDING)])
    return Stat.parse_obj(stat)

def update_stats(end_state: State, capitulation: bool) -> Stat:
    #old stats
    stat_old = get_stat()
    
    #make new stats
    stat = stat_old.copy()
    
    stat.gamesCount += 1
    stat.totalMoves += end_state.step    
    if end_state.gameMode == "pc":
        stat.gamesCountComputer += 1
        stat.totalMovesComputer += end_state.step
        if end_state.winner == "pc":
            winCountComputer += 1            
    else:
        stat.gamesCountHuman += 1
        stat.totalMovesHuman += end_state.step
    if stat.gamesCount !=0:
        stat.averageMoves = stat.totalMoves / stat.gamesCount
    if stat.gamesCountHuman != 0:
        stat.averageMovesHuman = stat.totalMovesHuman / stat.gamesCountHuman
    if stat.gamesCountComputer != 0:
        stat.averageMovesComputer = stat.totalMovesComputer / stat.gamesCountComputer
    
    if capitulation == True:
        stat.capitulations += 1

    shipPositions1 = [1 if pos==1 or pos==3 or pos==4 else 0 for pos in end_state.board1] #part of ship if 1,3,4
    shipPositions2 = [1 if pos==1 or pos==3 or pos==4 else 0 for pos in end_state.board2]
    stat.shipPositions = [sum(p) for p in zip(stat.shipPositions, shipPositions1)]
    stat.shipPositions = [sum(p) for p in zip(stat.shipPositions, shipPositions2)]
    
    moves1 = [1 if pos>=2 else 0 for pos in end_state.board1] #field clicked if >=2
    moves2 = [1 if pos>=2 else 0 for pos in end_state.board2]
    stat.moves = [sum(p) for p in zip(stat.moves, moves1)]
    stat.moves = [sum(p) for p in zip(stat.moves, moves2)]
    
    firstMoves = get_first_moves(end_state.game_id)
    for move in firstMoves:
        stat.firstMoves[move] += 1
        
    if end_state.winner == end_state.player1Name:
        ships_winner = end_state.ships1
    else:
        ships_winner = end_state.ships2
        
    for ship in ships_winner:
        if any(pos > 100 for pos in ship):
            stat.totalShipsHit[len(ship)-1] += 1
    stat.averageShipsHit = [total / (factor*stat.gamesCount) for total, factor in zip(stat.totalShipsHit, shipsCount)]#oder gamesCountHuman
    
    for ship in ships_winner:
        for pos in ship:
            if pos > 100:
                stat.totalShiphits[len(ship)-1] += 1                
    stat.averageShiphits = [total / (factor*stat.gamesCount) for total, factor in zip(stat.totalShiphits, shipsTiles)]#oder gamesCountHuman
    
    stat.timestamp = datetime.datetime.utcnow()    
    
    stats.insert_one(stat.dict())
    return stat


def get_first_moves(game_id: str) -> list[int]:
    firstMoves = []

    start_state = State.parse_obj(gamestates.find_one({"game_id": game_id, "step": 0}, sort=[("timestamp",pymongo.DESCENDING)]))
    board1Start = start_state.board1
    board2Start = start_state.board2
    
    cursor = gamestates.find({"game_id": game_id, "step": { "$gte": 1 }}, sort=[("timestamp",pymongo.ASCENDING)], limit=18)
    states = [State.parse_obj(c) for c in cursor]
    
    for state in states:
        diff = [b-bStart for bStart, b in zip(board1Start, state.board1)]
        move = [index for index, d in enumerate(diff) if d != 0]
        if(move):
            firstMoves.append(move[0])
            break
            
    for state in states:
        diff = [b-bStart for bStart, b in zip(board2Start, state.board2)]
        move = [index for index, d in enumerate(diff) if d != 0]
        if(move):
            firstMoves.append(move[0])
            break
            
    return firstMoves