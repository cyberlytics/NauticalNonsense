from fastapi import FastAPI, WebSocket


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


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")