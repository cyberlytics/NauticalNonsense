from pydantic import BaseModel, Field
import datetime

class State(BaseModel):
    game_id: str = Field(..., description = "Unique id for the game")
    player1: str = Field(..., description = "Name of player 1")
    player2: str = Field(..., description = "Name of player 2")
    next_player: str = Field(..., description = "Name of next player in turn")
    againstComputer: bool = Field(..., description = "True if opponent is computer")
    isFinished: bool = Field(..., description = "True if game is over")
    winner: str = Field(..., description = "Name of player, who won")
    board1: list[list[int]] = Field(..., description = "Playing board owned by player1") #oder list[int]
    board2: list[list[int]] = Field(..., description = "Playing board owned by player2") #oder list[int]
    openships1: list[int] = Field(..., description = "Ships onwed by player1 not hit")
    openships2: list[int] = Field(..., description = "Ships owned by player2 not hit")
    timestamp: datetime.datetime = Field(..., description = "Current utc date and time")