from fastapi import FastAPI, Depends, HTTPException, status
from use_cases.use_cases import BooksUseCase
from fastapi_pagination import Page, add_pagination, paginate
from pydantic import BaseModel
from use_cases.use_cases import UsersUseCase 
from security.jwt_token import token_verifier
from fastapi.security import OAuth2PasswordRequestForm



app = FastAPI()


class BookPayload(BaseModel):
    nome: str
    nomeDoAutor: str
    lancamento: int
    tipo: str
    genero: str
    editora: str
    anoEdicao: int
    numEdicao: int


class LoginPayload(BaseModel):
    email: str
    password: str

# Simula um banco de dados de usuários
USERS_DB = {
    "user1": {
        "email": "user1",
        "hashed_password": "j",
    }
}
 

@app.get("/")
def read_root():
    print('API is available')
    return {"Hello": "World"}


# Endpoint para login
@app.post("/login")
async def login_for_access_token(request_form_user: OAuth2PasswordRequestForm = Depends()):
    login_data = {
        'email': request_form_user.username,
        'password': request_form_user.password
        }
    response = UsersUseCase().find_user_by_email(login_data)
    if response['status_code'] == 200:
        return response['detail']
    
    raise HTTPException(status_code=response['status_code'], detail=response['error'])


# Endpoint para criar usuário
@app.post("/singup", status_code=status.HTTP_201_CREATED, response_model=dict)
async def login_for_access_token(email: str, password: str):
    response = UsersUseCase().create_user(email=email, password=password)
    if response['status_code'] == 201:
        return {'detail': response['detail']}
    
    raise HTTPException(status_code=response['status_code'], detail=response['error'])


# Endpoint para logout
@app.post("/logout", response_model=dict)
async def logout(access_token: str = Depends(token_verifier),):
    return {"message": "Logout successful"}


# Endpoint para encontrar todos os livros
@app.get("/books", response_model=Page)
async def find_all_books(
    search: str = None,
    # access_token: str = Depends(token_verifier),
    ):
    response = await BooksUseCase().find_all_books(search_text=search)

    if response['status_code'] == 200:
        return paginate(response['detail'])
    
    raise HTTPException(status_code=response['status_code'], detail=response['error'])
    


# Endpoint para criar um livro
@app.post("/books", status_code=status.HTTP_201_CREATED)
async def create_books(
    book_payload: BookPayload,
    access_token: str = Depends(token_verifier),
    ):
    response = await BooksUseCase().create_books(payload=book_payload)

    if response['status_code'] == 201:
        return response['detail']
    
    raise HTTPException(status_code=response['status_code'], detail=response['error'])
    
add_pagination(app)


