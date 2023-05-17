from fastapi import FastAPI, WebSocket
import random

app = FastAPI()

polling_count = 0

@app.get("/")
def startpage():
    return {"message": "Hello World"}


@app.get("/polling")
def polling():
    global polling_count
    polling_count += 1
    return {"message": f"Es wurde {polling_count} Mal gepollt"}


#todo: multiple persistente websocket verbindungen
@app.websocket("/ws")
async def websocket(websocket: WebSocket):
    await websocket.accept()
    #data = await websocket.receive_json()
    # do something with data
    await websocket.send_json({"msg": f"Hello WebSocket"})
    await websocket.close()
