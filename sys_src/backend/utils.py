import uuid

def is_valid_uuid(val: str) -> bool:
    """
    Test if a value is a valid UUID.
    """
    try:
        uuid.UUID(str(val))
        return True
    except ValueError:
        return False
    
# TODO this function only checks for horizontal ships, not vertical
'''
def is_incremental(my_l):
   return my_l == list(range(my_l[0], my_l[0] + len(my_l)))
'''