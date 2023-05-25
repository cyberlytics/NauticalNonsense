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
    ships1: list[list[int]] = Field(..., description = "Ships onwed by player1")
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
