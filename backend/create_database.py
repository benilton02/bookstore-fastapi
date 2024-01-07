import os
from dotenv import load_dotenv
import urllib.parse
from sqlalchemy import create_engine

load_dotenv()

POSTGRES_DB=os.getenv('POSTGRES_DB','postgresdatabase')
POSTGRES_USER=os.getenv('POSTGRES_USER','postgresuser')
POSTGRES_PASSWORD=os.getenv('POSTGRES_PASSWORD','postgrespassword')
DOCKER_IP=os.getenv('DOCKER_IP','172.17.0.1')




DB_NAME = POSTGRES_DB
password = urllib.parse.quote_plus(POSTGRES_PASSWORD)
user = POSTGRES_USER
print('password', password)
print('user', user)

DB_URL = f'postgresql+pg8000://{user}:{password}@{DOCKER_IP}'

engine = create_engine(DB_URL, isolation_level='AUTOCOMMIT')

conn = engine.connect()

conn.execute(f'CREATE DATABASE {DB_NAME}')