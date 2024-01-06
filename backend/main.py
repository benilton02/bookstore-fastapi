from routers.router import app
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


PORT = 7070
HOST = '127.0.0.1'

if __name__ == "__main__":
    app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    )
    
    uvicorn.run(app, host=HOST, port=PORT)
