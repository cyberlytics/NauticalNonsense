import uuid

def get_new_room(client_id: int, game_type: str, name: str) -> int:
    '''
    Check in Database if a map exists, which the client can use.

    If not, construct a new map.
        The map is first empty (new_game_init has to be called).
    if there is a existing map with a player waiting, use it (friend or other random guy is waiting)
    return the room_id
    '''
    return uuid.uuid4().int

def get_partner_id(room_id: int, first_client_id):
    '''
    With room_id and first_client_id get the partners id from db
    '''
    pass

def new_game_init():
    # place ships
    pass

def existing_game(client_json):
    # search in game_id in client_json. if it's there, then reuse this game
    # if this is not already existing in the database start a new game
    pass

def validate_move(client_json):
    # check if the game_field key in client_json only changed in one position.
    # check if all fields are the same (game_id, and more), only step and one position in game_field should be off.
    # step size has to be one more then the previous, nothing else
    # only one move per player, keep care that one player dont send more times a move
    pass