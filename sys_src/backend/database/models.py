from pydantic import BaseModel, Field
import datetime

class State(BaseModel):
    game_id: str = Field(..., description = "Unique id for the game")
    player1: str = Field(..., description = "Name of player 1")
    player2: str = Field(..., description = "Name of player 2")
    next_player: str = Field(..., description = "Name of next player in turn")
    gameMode: str = Field(..., description = "against pc/random/friend")
    isFinished: bool = Field(..., description = "True if game is over")
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
    #Siege durch Kapitulation entfernen?
    #Bei State: capitulation bool = Field(..., description = "True if opponent capitulated")
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
    shipPositions: list[int] = Field(..., description = "Total positions of ships")
    moves: list[int] = Field(..., description = "(Normalized) total moves") #Mongo: Absolut, Frontend: Relativ ?
    #firstMoves: list[int] = Field(..., description = "Most commonly chosen first moves")
    #popularShipPositions: list[list[int]] = Field(..., description = "Most popular ship positions")
    totalShipsHit: list[int] = Field(..., description = "Total count of winner's ships hit per shiptype by end of game")#Zahl der mind 1x getroffenen Schiffe #vllt auch Gesamtanzahl
    averageShipsHit: list[float] = Field(..., description = "Average count of winner's ships hit per shiptype by end of game")
    totalShiphits: list[int] = Field(..., description = "Total count of winner's ships' hits per shiptype by end of game")#Anteile der Schiffe, die getroffen sind
    averageShiphits: list[float] = Field(..., description = "Average count of winner's ships' hits per shiptype by end of game")
    timestamp: datetime.datetime = Field(..., description = "Current utc date and time")