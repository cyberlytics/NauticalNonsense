import uuid
from utils import is_valid_uuid, is_incremental

def test_is_valid_uuid():
    valid_uuid = str(uuid.uuid4())
    assert is_valid_uuid(valid_uuid) == True

def test_is_not_valid_uuid():
    not_uuid = '12345'
    assert is_valid_uuid(not_uuid) == False

def test_is_valid_uuid_empty_string():
    empty_string = ''
    assert is_valid_uuid(empty_string) == False


def test_is_incremental_true():
    incremental_list = [1, 2, 3, 4, 5]
    assert is_incremental(incremental_list) == True

def test_is_incremental_false():
    not_incremental_list = [1, 3, 5, 7, 9]
    assert is_incremental(not_incremental_list) == False

def test_is_incremental_empty_list():
    empty_list = []
    assert is_incremental(empty_list) == False

def test_is_incremental_increment_by_ten():
    incremental_list_by_ten = [10, 20, 30, 40, 50]
    assert is_incremental(incremental_list_by_ten) == True
