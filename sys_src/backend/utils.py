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