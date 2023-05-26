from ..play_game import check_sink_ship

def test_check_sink_ship():

    ship_pos = [0, 1, 2]
    game_field = [3, 3, 3, 0, 0, 0, 0, 0, 0, 0]

    assert check_sink_ship(ship_pos, game_field) == [4, 4, 4, 0, 0, 0, 0, 0, 0, 0]