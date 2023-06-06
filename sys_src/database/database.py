import pymongo
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import math
from models import State, Winner, WinnerWithRank, Stat

mongo_url = "mongodb+srv://nn_user:nn_bsyjntss@nauticalnonsens.lflmzfg.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_url, server_api=ServerApi('1'))
db = client.NauticalNonsens
gamestates = db.gamestates
stats = db.stats
leaderboard = db.leaderboard

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


#Leaderboard
def get_leaderboard(againstComputer:bool, limit: int = 10) -> list[Winner]:
    leaders = []
    winners = leaderboard.find({"againstComputer": againstComputer}, sort=[("moves",pymongo.ASCENDING), ("name",pymongo.ASCENDING)], limit=limit)
    for winner in winners:
        leaders.append(Winner.parse_obj(winner))
    return leaders

def insert_winner(current_state: State) -> Winner:
    name = current_state.winner
    moves = math.ceil(current_state.step/2)#nochmal dran nach Treffer?
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
    
    #for move in end_state.firstMoves: #in end_state.firstMoves die zwei ersten geklickten Felder
    #    stat.firstMoves[move] += 1
        
    
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