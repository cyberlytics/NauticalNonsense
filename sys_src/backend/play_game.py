from database.database import get_map, get_partner, get_ships, get_board, update_game_with_playermove, update_ship_list
from database.models import State

from datetime import datetime

#from utils import is_incremental

import uuid

def prepare_room(client_id: str, game_mode: str, friend: str = None) -> dict:
    '''
    Check in Database if a map exists, which the client can use.
    If not, construct a new map will be constructed.
    name is for name of friend
    '''
    ready = get_map(client_id, game_mode, friend)
    return ready

async def get_partner_id(client_id: str):
    '''
    With room_id and first_client_id get the partners id from db
    Either get partner_id from database or from flag in create_map()
    '''
    partner_id = await get_partner(client_id)
    return partner_id

def new_game_init(
    game_id: str,
    player_1_id: str,
    player_2_id: str,
    player_1_ships: list[list[int]],
    player_2_ships: list[list[int]],
    game_mode: str,
    size: int = 100,
    num_ships: int = 6,
    expected_ships: dict[int, int] = {
        5: 1,
        4: 2,
        3: 3,
        2: 4
    }
    ) -> State:
    
    game_field_player_1 = _create_game_field(
        player_1_ships,
        size=size,
        num_ships=num_ships,
        expected_ships=expected_ships
    )

    game_field_player_2 = _create_game_field(
        player_2_ships,
        size=size,
        num_ships=num_ships,
        expected_ships=expected_ships
    )

    game_state = State(
        game_id=game_id,
        player1=player_1_id,
        player2=player_2_id,
        next_player=player_1_id,
        gameMode=game_mode,
        isFinished=False,
        winner="",
        step=0,
        board1=game_field_player_1,
        board2=game_field_player_2,
        ships1=player_1_ships,
        ships2=player_2_ships,
        timestamp=datetime.utcnow()
    )

    return game_state

def validate_move(client_json):
    # check if the game_field key in client_json only changed in one position.
    # check if all fields are the same (game_id, and more), only step and one position in game_field should be off.
    # step size has to be one more then the previous, nothing else
    # only one move per player, keep care that one player dont send more times a move
    pass


# hier von private auf public ändern
def _create_game_field(
    ships: list[list[int]], 
    size: int = 100, 
    num_ships: int = 7,
    expected_ships: dict[int, int] = {
        5: 1,
        4: 1,
        3: 1,
        2: 2,
        1: 2
    }
    ) -> list[int]:
    """
    Create a game field and check if the ship placement is valid.

    Args:
        ships (list[list[int]]): The ships on the game field
        size (int, optional): The size of the game field. Defaults to 100.
    
    Returns:
        list[int]: The game field
    
    Raises:
        ValueError: If the ship coordinates overlap or are out of range
    """

    if not ships:
        raise ValueError("No ships given")
    
    if len(ships) != num_ships:
        raise ValueError("Wrong amount of ships given")
    

    ship_counts = {key: 0 for key in expected_ships.keys()}

    game_field = [0] * size

    for ship in ships:

        ship = sorted(ship)
        size = len(ship)

        if size in ship_counts.keys():
            ship_counts[size] += 1

        if not all([isinstance(coord, int) for coord in ship]):
            raise ValueError("Ship coordinates are not integers")
        
        # TODO first correct this function bevore use
        #if not is_incremental(ship):
            #raise ValueError("Ship coordinates are not one apart")

        for coord in ship:
            if coord < len(game_field) and coord >= 0:
                if game_field[coord] == 0:
                    game_field[coord] = 1
                else:
                    raise ValueError("Ship coordinates overlap")
            else:
                raise ValueError("Ship coordinates out of range")
            
    if ship_counts != expected_ships:
        raise ValueError("Wrong amount of ships given")
    
    return game_field


def _check_sink_ship(ship: list[int], game_field: list[int]) -> list[int]:
    """
    Check if a ship has been sunk.

    Args:
        ship (list[int]): The ship to be checked
        game_field (list[int]): The game field
    
    Returns:
        list[int]: The updated game field
    """
    hit = [True if coord >= 100 else False for coord in ship]
    
    if all(hit):
        for coord in ship:
            game_field[coord % 100] = 4
    
    return game_field


def _check_win(partner_id, ships: list[list[int]]) -> str:
    """
    Check if the game has been won.

    Args:
        ships (list[list[int]]): The ships on the game field
    
    Returns:
        str: return the id of the partner
    """
    if all([all([coord >= 100 for coord in ship]) for ship in ships]):
        return partner_id
    else:
        return False


def make_move(
    move: int, 
    partner_id: str,
    game_id: str
    ) -> tuple[bool, bool, list[int]]:
    """
    Make a move on the game field.

    Args:
        move (int): The move to be played
        game_field (list[int]): The game field
        ships (list[list[int]]): The ships on the game field
    
    Returns:
        str: Whether the game has been won
        list[int]: The updated game field
    
    Raises:
        ValueError: If the move has been played before
        AssertionError: If the move is not an integer or out of range
    """
    ships = get_ships(partner_id, game_id)
    game_field = get_board(partner_id, game_id)

    if not isinstance(move, int):
        raise AssertionError("Move is not an integer")
    
    if move < 0 or move >= len(game_field):
        raise AssertionError("Move out of range")

    hit = False
    won = False

    if game_field[move] == 0:
        game_field[move] = 2
    elif game_field[move] == 1:
        game_field[move] = 3

        hit = True

        # We only have to check for sinking if a ship was hit
        for ship in ships[0]:
            if move in ship:
                ship[ship.index(move)] += 100     
                # save the shiplist to the database
                update_ship_list(partner_id, game_id, ships[0])
                game_field = _check_sink_ship(ship, game_field)

        # We only have to check for winning if a ship was hit
        print("Die Shipliste vor check win ist:")
        print(str(ships))
        lose = _check_win(partner_id, ships[0])
    else:
        # TODO das raus machen? Program soll doch nicht abstürzen wenn gleicher move bereits gemacht wurde?!
        raise ValueError("Move has been played before")
    
    # save results in db
    update_game_with_playermove(partner_id, game_id, game_field, lose)

    # delete all ship positions from the board, because client shouldnt know the position of opponent ships
    board = [0 if i == 1 else i for i in game_field]

    return lose, hit, board
