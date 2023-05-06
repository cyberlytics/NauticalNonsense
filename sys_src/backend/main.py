import uvicorn
from fastapi import FastAPI

app = FastAPI()



@app.get("/")
def startpage():
    return {"message": "Hello World"}

@app.get("/route2/")
def startpage():
    return {"message": "das ist root2"}
