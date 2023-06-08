import pytest
from websocket_manager import ConnectionManager
from unittest.mock import AsyncMock
from typing import Any


class MockWebSocket:
    def __init__(self, path: str):
        self.path = path
        self.send_text = AsyncMock()
        self.receive_text = AsyncMock()
        self.accept = AsyncMock()
        self.close = AsyncMock()
        self.send_json = AsyncMock()
        self.receive_json = AsyncMock()


@pytest.fixture
def manager():
    manager = ConnectionManager()
    return manager

@pytest.fixture
def websocket1():
    return MockWebSocket('/ws/1')

@pytest.fixture
def websocket2():
    return MockWebSocket('/ws/2')


@pytest.mark.asyncio
async def test_connect(manager, websocket1, websocket2):
    await manager.connect(websocket1, '1')
    await manager.connect(websocket2, '2')
    assert len(manager.active_connections) == 2


@pytest.mark.asyncio
async def test_send_personal_message(manager, websocket1, websocket2):
    await manager.connect(websocket1, '1')
    await manager.connect(websocket2, '2')

    message = {"test": "test"}
    await manager.send_personal_message(message, '2')

    websocket2.send_json.assert_called_once_with(message)


@pytest.mark.asyncio
async def test_disconnect(manager, websocket1, websocket2):
    await manager.connect(websocket1, '1')
    await manager.connect(websocket2, '2')
    manager.disconnect('1')

    assert len(manager.active_connections) == 1


@pytest.mark.asyncio
async def test_broadcast(manager, websocket1, websocket2):
    await manager.connect(websocket1, '1')
    await manager.connect(websocket2, '2')

    websocket2.send_json.reset_mock()

    broadcast_message = {"broadcast": "test"}
    await manager.broadcast(broadcast_message)

    websocket2.send_json.assert_called_with(broadcast_message)


@pytest.mark.asyncio
async def test_all_websockets(manager, websocket1, websocket2):
    await manager.connect(websocket1, '1')
    await manager.connect(websocket2, '2')
    manager.disconnect('1')

    all_websockets = manager.all_websockets()
    assert len(all_websockets) == 1