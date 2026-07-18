from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, schemas
from .auth import get_current_user
from .database import Base, engine, get_db
from .security import (
    create_access_token,
    verify_password,
    get_password_hash
)

from .models import User



Base.metadata.create_all(bind=engine)
db = next(get_db())


existing_user = db.query(User).filter(
    User.username == "enes123"
).first()


if not existing_user:

    admin_user = User(
        username="enes123",
        password_hash=get_password_hash("134679")
    )

    db.add(admin_user)

    db.commit()


db.close()


app = FastAPI(
    title="Aidat Yönetim Sistemi API",
    version="1.0.0",
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/")
def root():

    return {
        "message": "Aidat Yönetim Sistemi API çalışıyor."
    }





# ======================
# AUTH
# ======================


@app.post("/register")
def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    existing = crud.get_user_by_username(
        db,
        user.username
    )


    if existing:

        raise HTTPException(
            status_code=400,
            detail="Kullanıcı zaten mevcut"
        )


    return crud.create_user(
        db,
        user
    )





@app.post("/login")
def login(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    db_user = crud.get_user_by_username(
        db,
        user.username
    )


    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Kullanıcı bulunamadı"
        )



    if not verify_password(
        user.password,
        db_user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Şifre yanlış"
        )



    token = create_access_token({

        "sub": db_user.username

    })



    return {

        "access_token": token,

        "token_type": "bearer"

    }







# ======================
# ÜYELER
# ======================


@app.get("/members")
def get_members(
    db: Session = Depends(get_db)
):

    return crud.get_members(db)





@app.post("/members")
def create_member(
    member: schemas.MemberCreate,
    db: Session = Depends(get_db)
):

    return crud.create_member(
        db,
        member
    )

@app.put("/members/{member_id}")
def update_member(
    member_id: int,
    member: schemas.MemberCreate,
    db: Session = Depends(get_db)
):

    result = crud.update_member(
        db,
        member_id,
        member
    )


    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Üye bulunamadı"
        )


    return result






@app.delete("/members/{member_id}")
def delete_member(
    member_id: int,
    db: Session = Depends(get_db)
):

    result = crud.delete_member(
        db,
        member_id
    )


    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Üye bulunamadı"
        )


    return {
        "message": "Üye silindi"
    }



@app.get("/members/{member_id}/detail")
def member_detail(
    member_id: int,
    year: int = 2026,
    db: Session = Depends(get_db)
):

    result = crud.get_member_detail(
        db,
        member_id,
        year
    )


    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Üye bulunamadı"
        )


    return result







# ======================
# ÖDEMELER
# ======================


@app.get("/payments")
def get_payments(
    db: Session = Depends(get_db)
):

    return crud.get_payments(db)





@app.post("/payments")
def create_payment(
    payment: schemas.PaymentCreate,
    db: Session = Depends(get_db)
):

    try:

        return crud.create_payment(
            db,
            payment
        )


    except Exception as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

@app.put("/payments/{payment_id}")
def update_payment(
    payment_id: int,
    payment: schemas.PaymentCreate,
    db: Session = Depends(get_db)
):

    result = crud.update_payment(
        db,
        payment_id,
        payment
    )


    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Ödeme bulunamadı"
        )


    return result






@app.delete("/payments/{payment_id}")
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):

    result = crud.delete_payment(
        db,
        payment_id
    )


    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Ödeme bulunamadı"
        )


    return {
        "message": "Ödeme silindi"
    }







# ======================
# DASHBOARD
# ======================


@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    return crud.get_dashboard_stats(db)







# ======================
# REPORTS
# ======================


@app.get("/reports")
def reports(
    month: str,
    db: Session = Depends(get_db)
):

    return crud.get_reports(
        db,
        month
    )







# ======================
# SETTINGS
# ======================


@app.get("/settings")
def settings(
    db: Session = Depends(get_db)
):

    return crud.get_settings(db)





@app.put("/settings")
def update_settings(
    fee: float,
    db: Session = Depends(get_db)
):

    return crud.update_settings(
        db,
        fee
    )





# ======================
# PAYMENT STATUS
# ======================


@app.get("/payment-status")
def payment_status(
    month: str,
    db: Session = Depends(get_db)
):

    return crud.get_payment_status(
        db,
        month
    )
