from database.database import get_map, get_partner
import uuid

def prepare_room(client_id: uuid, game_type: str, name: str = None) -> int:
    '''
    Check in Database if a map exists, which the client can use.
    If not, construct a new map will be constructed.
    name is for name of friend
    '''
    ret = get_map(client_id, game_type)
    return ret

async def get_partner_id(client_id: str):
    '''
    With room_id and first_client_id get the partners id from db
    Either get partner_id from database or from flag in create_map()
    '''
    partner_id = await get_partner(client_id)
    return partner_id

def new_game_init():
    # place ships
    pass

def validate_move(client_json):
    # check if the game_field key in client_json only changed in one position.
    # check if all fields are the same (game_id, and more), only step and one position in game_field should be off.
    # step size has to be one more then the previous, nothing else
    # only one move per player, keep care that one player dont send more times a move
    pass


def check_sink_ship(ship: list[int], game_field: list[int]) -> list[int]:
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


def check_win(game_field: list[int]) -> bool:
    """
    Check if the game has been won.

    Args:
        game_field (list[int]): The game field
    
    Returns:
        bool: Whether the game has been won
    """
    return not bool(game_field.count(3))


def make_move(
    move: int, 
    game_field: list[int], 
    ships: list[list[int]]
    ) -> tuple[bool, bool, list[int]]:
    """
    Make a move on the game field.

    Args:
        move (int): The move to be played
        game_field (list[int]): The game field
        ships (list[list[int]]): The ships on the game field
    
    Returns:
        bool: Whether the game has been won
        list[int]: The updated game field
    
    Raises:
        ValueError: If the move has been played before
        AssertionError: If the move is not an integer or out of range
    """
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
        for ship in ships:
            if move in ship:
                ship[ship.index(move)] += 100
                game_field = check_sink_ship(ship, game_field)

        # We only have to check for winning if a ship was hit
        won = check_win(game_field)
    else:
        raise ValueError("Move has been played before")
    
    return won, hit, game_field
