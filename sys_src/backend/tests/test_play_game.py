import pytest
from ..play_game import check_sink_ship, make_move, check_win


def test_check_sink_ship():

    ship = [100, 101, 102]
    game_field = [3, 3, 3, 0, 0, 0, 0, 0, 0, 0]

    assert check_sink_ship(ship, game_field) == [4, 4, 4, 0, 0, 0, 0, 0, 0, 0]


def test_check_sink_ship_not_yet():

    ship = [100, 1, 102]
    game_field = [3, 1, 3, 0, 0, 0, 0, 0, 0, 0]

    assert check_sink_ship(ship, game_field) == [3, 1, 3, 0, 0, 0, 0, 0, 0, 0]


def test_check_sink_ship_multiple():

    ships = [[100, 101, 102], [108, 109]]
    game_field = [3, 3, 3, 0, 0, 0, 0, 0, 3, 3]

    for ship in ships:
        game_field = check_sink_ship(ship, game_field)

    assert game_field == [4, 4, 4, 0, 0, 0, 0, 0, 4, 4]


def test_check_sink_ship_only_one():

    ships = [[100, 101, 102], [8, 109]]
    game_field = [3, 3, 3, 0, 0, 0, 0, 0, 1, 3]

    for ship in ships:
        game_field = check_sink_ship(ship, game_field)

    assert game_field == [4, 4, 4, 0, 0, 0, 0, 0, 1, 3]


def test_check_sink_ship_touching_ships():

    ships = [[100, 101, 102], [103, 4]]
    game_field = [3, 3, 3, 3, 1, 0, 0, 0, 0, 0]

    for ship in ships:
        game_field = check_sink_ship(ship, game_field)

    assert game_field == [4, 4, 4, 3, 1, 0, 0, 0, 0, 0]


def test_check_sink_ship_nothing_to_sink():

    ship_pos = [0]
    game_field = [1, 0]

    assert check_sink_ship(ship_pos, game_field) == [1, 0]


def test_make_move_water():

    game_field = [0]
    move = 0
    ships = [[0]]

    _, hit, game_field = make_move(move, game_field, ships)

    assert game_field == [2]
    assert hit is False


def test_make_move_hit():

    game_field = [1, 1, 0]
    move = 0
    ships = [[0, 1]]

    _, hit, game_field = make_move(move, game_field, ships)

    assert game_field == [3, 1, 0]
    assert ships == [[100, 1]]
    assert hit is True


def test_make_move_won():

    game_field = [1, 3, 0]
    move = 0
    ships = [[0, 101]]

    won, hit, game_field = make_move(move, game_field, ships)

    assert game_field == [4, 4, 0]
    assert ships == [[100, 101]]
    assert hit is True
    assert won is True


def test_make_move_error():

    game_field = [3, 1, 0]
    move = 0
    ships = [[100, 1]]

    with pytest.raises(ValueError, match="Move has been played before"):
        make_move(move, game_field, ships)


def test_make_move_not_int():

    game_field = [3, 1, 0]
    move = 0.5
    ships = [[100, 1]]

    with pytest.raises(AssertionError, match="Move is not an integer"):
        make_move(move, game_field, ships)


def test_make_move_out_of_range():

    game_field = [3, 1, 0]
    move = -51231123
    ships = [[100, 1]]

    with pytest.raises(AssertionError, match="Move out of range"):
        make_move(move, game_field, ships)

    move = 4

    with pytest.raises(AssertionError, match="Move out of range"):
        make_move(move, game_field, ships)


def test_check_win_true():
    
    game_field = [4, 4, 0, 0]

    assert check_win(game_field) is True


def test_check_win_false():
    
    game_field = [3, 3, 0, 0]

    assert check_win(game_field) is False
