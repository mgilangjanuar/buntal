from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/json")
def read_json():
    return JSONResponse(content={"message": "Hello, World!"})
