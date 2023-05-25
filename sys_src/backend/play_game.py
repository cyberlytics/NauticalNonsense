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