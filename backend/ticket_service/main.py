import uvicorn
from fastapi import FastAPI
from fastapi_hypermodel import HyperModel
import tichet_router

app = FastAPI()

app.include_router(tichet_router.router)

HyperModel.init_app(app)

if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=3030, reload=True, debug=True)
