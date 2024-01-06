
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from use_cases.use_cases import UsersUseCase

oauth_scheme = OAuth2PasswordBearer(tokenUrl='/user/login')




def token_verifier(
    token = Depends(oauth_scheme)
):
    uc = UsersUseCase()
    uc.verify_token(access_token=token)