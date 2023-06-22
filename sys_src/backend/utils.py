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


def is_incremental(ship: list) -> bool:

    start = ship[0]
    end = ship[-1] + 1

    if ship == list(range(start, end)):
        return True
    
    if ship == list(range(start, end, 10)):
        return True
    
    return False
