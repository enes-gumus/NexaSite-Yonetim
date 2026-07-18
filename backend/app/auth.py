from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from . import models
from .database import get_db
from .security import decode_access_token



oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login"
)





def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):


    payload = decode_access_token(
        token
    )


    if payload is None:

        raise HTTPException(
            status_code=401,
            detail="Geçersiz token"
        )



    username = payload.get(
        "sub"
    )


    if username is None:

        raise HTTPException(
            status_code=401,
            detail="Yetkisiz kullanıcı"
        )



    user = (

        db.query(models.User)

        .filter(
            models.User.username == username
        )

        .first()

    )



    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Kullanıcı bulunamadı"
        )



    return user
