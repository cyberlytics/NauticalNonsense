from pydantic import BaseModel, Field
import datetime

class State(BaseModel):
    game_id: str = Field(..., description = "Unique id for the game")
    player1: str = Field(..., description = "Id of player 1")
    player1Name: str = Field(..., description = "Name of player 1")
    player2: str = Field(..., description = "Id of player 2")
    player2Name: str = Field(..., description = "Name of player 2")
    next_player: str = Field(..., description = "Id of next player in turn")
    gameMode: str = Field(..., description = "against pc/random/friend")
    gameStatus: str = Field(..., description = "status of game: wait/place/play/finished")
    winner: str = Field(..., description = "Name of player, who won")
    step: int = Field(..., description = "Count of total moves of game")
    board1: list[int] = Field(..., description = "Playing board owned by player1")
    board2: list[int] = Field(..., description = "Playing board owned by player2")
    ships1: list[list[int]] = Field(..., description = "Ships owned by player1")
    ships2: list[list[int]] = Field(..., description = "Ships owned by player2")
    timestamp: datetime.datetime = Field(..., description = "Current utc date and time")

class Winner(BaseModel):
    name: str = Field(..., description = "Name of player")
    moves: int = Field(..., description = "Moves needed to win game")
    againstComputer: bool = Field(..., description = "True if player plays against computer")

class WinnerWithRank(BaseModel):
    name: str = Field(..., description = "Name of player")
    moves: int = Field(..., description = "Moves needed to win game")
    rank: int = Field(..., description = "Rank of player")

class LeaderboardWithRank(BaseModel):
    leadersHuman: list[WinnerWithRank] = Field(..., description = "Best players against other players")
    leadersComputer: list[WinnerWithRank] = Field(..., description = "Best players against computer")

class Stat(BaseModel):
    gamesCount: int = Field(..., description = "Total number of games played") #int has no limit in python3
    gamesCountHuman: int = Field(..., description = "Number of games played against other players")
    gamesCountComputer: int = Field(..., description = "Number of games played against computer")
    winCountComputer: int = Field(..., description = "Number of games won against computer")
    totalMoves: int = Field(..., description = "Total number of moves") #Worst case: 199 per game
    totalMovesHuman: int = Field(..., description = "Total number of moves against other player")
    totalMovesComputer: int = Field(..., description = "Total number of moves against computer")
    averageMoves: float = Field(..., description = "Average number of moves until end of game")
    averageMovesHuman: float = Field(..., description = "Average number of moves until end of game against player")
    averageMovesComputer: float = Field(..., description = "Average number of moves until end of game against computer") #vllt /2 ?
    capitulations: int = Field(..., description = "Total number of capitulations")
    shipPositions: list[int] = Field(..., description = "Total positions of ships")
    moves: list[int] = Field(..., description = "Total moves")
    firstMoves: list[int] = Field(..., description = "Most commonly chosen first moves")
    totalShipsHit: list[int] = Field(..., description = "Total count of winner's ships hit per shiptype by end of game")#Zahl der mind 1x getroffenen Schiffe
    averageShipsHit: list[float] = Field(..., description = "Average count of winner's ships hit per shiptype by end of game")
    totalShiphits: list[int] = Field(..., description = "Total count of winner's ships' hits per shiptype by end of game")#Anteile der Schiffe, die getroffen sind
    averageShiphits: list[float] = Field(..., description = "Average count of winner's ships' hits per shiptype by end of game")
    timestamp: datetime.datetime = Field(..., description = "Current utc date and time")