import httpx
import os
from fastapi import status, HTTPException, Depends
from models.models import Users, session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv

BOOK_API_URL = os.getenv("BOOK_API_URL", "")
# Configuração para geração do token JWT
SECRET_KEY = os.getenv("SECRET_KEY", "SECRET_KEY")
ALGORITHM = "HS256"
EXPIRES_IN = 30

class BooksUseCase:
    book_api_url = BOOK_API_URL
    
    
    async def find_all_books(self,  search_text: str = None):
        async with httpx.AsyncClient() as client:

            params = None
            if search_text:
                params = {"search": search_text}

            response = await client.get(self.book_api_url, params=params)
            
            if response.status_code == 200:
                return {
                        'detail': response.json(),
                        'status_code': response.status_code
                        }
                
            return {
                'error': 'Request failed',
                'status_code': response.status_code
                }
        
    
    async def create_books(self, payload):
        payload = payload.__dict__

        async with httpx.AsyncClient() as client:
            response = await client.post(self.book_api_url, json=payload)

        if response.status_code == 201:
            return {
                'detail': response.json(),
                'status_code': response.status_code
            }
        
        return {
            'error': 'Failed to create book',
            'status_code': response.status_code
        }
    

class UsersUseCase:

    def create_user(self, email, password, access_token):
        
        try:
            new_user = Users(email=email, password=password)
            session.add(new_user)
            session.commit()
            status_created = True
        
        except Exception as e:
            session.rollback()
            status_created = False
            
        finally:
            session.close()
        
        if status_created:
            return {'detail': 'Successfully created', 'status_code': 201}
        
        return {'error': 'Failed to create user', 'status_code': 500}

    def find_user_by_email(self, login_data: dict):

        password = login_data['password']
        email = login_data['email']
        user = session.query(Users).filter_by(email=email).one_or_none()
        session.close()
        if user:
            if password != user.password:
                return {'error': 'Invalid email or password', 'status_code': 400}
            
            exp = datetime.utcnow() + timedelta(minutes=EXPIRES_IN)
            payload = {
                'sub': user.email,
                'exp': exp
            }

            access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

            return {
                'status_code': 200,
                'detail': {'access_token': access_token,
                'exp': exp.isoformat()
                }
            }
        
        return {'error': 'User not found', 'status_code': 404}

    
    def verify_token(self, access_token):
        try:
            data = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid access token'
            )

        user_on_db = session.query(Users).filter_by(email=data['email']).one_or_none()

        if user_on_db is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid access token'
            )