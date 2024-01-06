from sqlalchemy import Column, Integer, DateTime, String, create_engine, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()

class Users(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    blocked = Column(Boolean, default=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow())


POSTGRES_DB=os.getenv('POSTGRES_DB','mydatabase')
POSTGRES_USER=os.getenv('POSTGRES_USER','myuser')
POSTGRES_PASSWORD=os.getenv('POSTGRES_PASSWORD','mypassword')
DOCKER_IP=os.getenv('DOCKER_IP','172.17.0.1')

engine = create_engine(f'postgresql+pg8000://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DOCKER_IP}:5432/{POSTGRES_DB}')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
