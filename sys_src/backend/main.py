from fastapi import FastAPI

app = FastAPI()

polling_count = 0

@app.get("/")
def startpage():
    return {"message": "Hello World"}


@app.get("/polling/")
def polling():
    global polling_count
    polling_count += 1
    return {"message": f"Es wurde {polling_count} Mal gepollt"}
