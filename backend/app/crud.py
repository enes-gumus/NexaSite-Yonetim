from sqlalchemy.orm import Session

from . import models, schemas
from .security import get_password_hash



# ==========================
# TEXT NORMALIZE
# ==========================

def normalize_text(text: str):

    replacements = {
        "ş": "s",
        "Ş": "S",
        "ğ": "g",
        "Ğ": "G",
        "ı": "i",
        "İ": "I",
        "ö": "o",
        "Ö": "O",
        "ü": "u",
        "Ü": "U",
        "ç": "c",
        "Ç": "C",
    }


    for old, new in replacements.items():

        text = text.replace(
            old,
            new
        )


    return text.lower()





# ==========================
# MEMBER CRUD
# ==========================


def get_members(db: Session):

    return db.query(models.Member).all()





def get_member(
    db: Session,
    member_id: int
):

    return (
        db.query(models.Member)
        .filter(
            models.Member.id == member_id
        )
        .first()
    )





def create_member(
    db: Session,
    member: schemas.MemberCreate
):

    db_member = models.Member(
        **member.model_dump()
    )


    db.add(db_member)

    db.commit()

    db.refresh(db_member)


    return db_member





def update_member(
    db: Session,
    member_id: int,
    member: schemas.MemberUpdate
):

    db_member = get_member(
        db,
        member_id
    )


    if not db_member:

        return None



    for key, value in member.model_dump().items():

        setattr(
            db_member,
            key,
            value
        )


    db.commit()

    db.refresh(db_member)


    return db_member





def delete_member(
    db: Session,
    member_id: int
):

    db_member = get_member(
        db,
        member_id
    )


    if not db_member:

        return None


    db.delete(db_member)

    db.commit()


    return db_member







# ==========================
# MEMBER DETAIL
# ==========================


def get_member_detail(
    db: Session,
    member_id: int,
    year: int
):

    member = get_member(
        db,
        member_id
    )


    if not member:

        return None



    payments = []

    total_paid = 0



    for payment in member.payments:

        amount = float(
            payment.amount
        )


        total_paid += amount


        payments.append({

            "id": payment.id,

            "amount": amount,

            "month": payment.month

        })




    setting = (

        db.query(models.Setting)

        .first()

    )


    fee = 500


    if setting:

        fee = float(
            setting.fee
        )





    months = [

        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık"

    ]



    payment_status = []



    for month in months:

        search = normalize_text(
            f"{month} {year}"
        )


        paid = False


        for payment in member.payments:

            if normalize_text(payment.month) == search:

                paid = True



        payment_status.append({

            "month": month,

            "year": year,

            "paid": paid

        })




    return {

        "id": member.id,

        "name": member.name,

        "apartment": member.apartment,

        "phone": member.phone,

        "fee": fee,

        "total_paid": total_paid,

        "payments": payments,

        "payment_status": payment_status

    }
# ==========================
# PAYMENT CRUD
# ==========================


def get_payments(db: Session):

    payments = (
        db.query(models.Payment)
        .all()
    )


    result = []



    for payment in payments:

        result.append({

            "id": payment.id,

            "amount": float(
                payment.amount
            ),

            "month": payment.month,

            "member_id": payment.member_id,

            "member_name": payment.member.name,

            "apartment": payment.member.apartment

        })


    return result





def get_payment(
    db: Session,
    payment_id: int
):

    return (

        db.query(models.Payment)

        .filter(
            models.Payment.id == payment_id
        )

        .first()

    )





def create_payment(
    db: Session,
    payment: schemas.PaymentCreate
):


    existing_payment = (

        db.query(models.Payment)

        .filter(

            models.Payment.member_id == payment.member_id,

            models.Payment.month == payment.month

        )

        .first()

    )


    if existing_payment:

        raise Exception(
            "Bu üye için bu ayın ödemesi zaten mevcut."
        )



    db_payment = models.Payment(

        **payment.model_dump()

    )


    db.add(db_payment)

    db.commit()

    db.refresh(db_payment)


    return db_payment





def update_payment(
    db: Session,
    payment_id: int,
    payment: schemas.PaymentUpdate
):

    db_payment = get_payment(
        db,
        payment_id
    )


    if not db_payment:

        return None



    for key, value in payment.model_dump().items():

        setattr(
            db_payment,
            key,
            value
        )



    db.commit()

    db.refresh(db_payment)


    return db_payment





def delete_payment(
    db: Session,
    payment_id: int
):

    db_payment = get_payment(
        db,
        payment_id
    )


    if not db_payment:

        return None



    db.delete(db_payment)

    db.commit()


    return db_payment







# ==========================
# DASHBOARD
# ==========================


def get_dashboard_stats(
    db: Session
):

    total_members = (

        db.query(models.Member)

        .count()

    )


    paid_members = (

        db.query(models.Payment.member_id)

        .distinct()

        .count()

    )


    waiting_members = (

        total_members - paid_members

    )



    payments = (

        db.query(models.Payment.amount)

        .all()

    )


    total_amount = sum(

        float(payment[0])

        for payment in payments

    )



    return {

        "total_members": total_members,

        "paid_members": paid_members,

        "waiting_members": waiting_members,

        "total_collected": total_amount

    }








# ==========================
# REPORTS DETAIL
# ==========================


def get_reports(
    db: Session,
    month: str
):

    total_members = (

        db.query(models.Member)

        .count()

    )


    search_month = normalize_text(
        month
    )


    payments = (

        db.query(models.Payment)

        .all()

    )


    paid_payments = []


    paid_member_ids = []



    for payment in payments:


        if normalize_text(payment.month) == search_month:


            paid_payments.append(payment)

            paid_member_ids.append(
                payment.member_id
            )




    paid_members = len(
        paid_member_ids
    )


    waiting_members = (

        total_members - paid_members

    )



    total_collected = sum(

        float(payment.amount)

        for payment in paid_payments

    )



    setting = (

        db.query(models.Setting)

        .first()

    )


    fee = 500


    if setting:

        fee = float(
            setting.fee
        )



    total_debt = (

        waiting_members * fee

    )


    collection_rate = 0


    if total_members > 0:

        collection_rate = (

            paid_members / total_members

        ) * 100





    debtors = []



    members = (

        db.query(models.Member)

        .all()

    )



    for member in members:


        if member.id not in paid_member_ids:


            debtors.append({

                "name": member.name,

                "apartment": member.apartment

            })




    return {

        "month": month,

        "total_members": total_members,

        "paid_members": paid_members,

        "waiting_members": waiting_members,

        "total_collected": total_collected,

        "total_debt": total_debt,

        "collection_rate": round(
            collection_rate,
            2
        ),

        "debtors": debtors

    }







# ==========================
# SETTINGS
# ==========================


def get_settings(
    db: Session
):

    setting = (

        db.query(models.Setting)

        .first()

    )


    if not setting:


        setting = models.Setting(

            fee=500

        )


        db.add(setting)

        db.commit()

        db.refresh(setting)



    return setting






def update_settings(
    db: Session,
    fee: float
):

    setting = (

        db.query(models.Setting)

        .first()

    )


    if not setting:


        setting = models.Setting(

            fee=fee

        )


        db.add(setting)


    else:

        setting.fee = fee



    db.commit()

    db.refresh(setting)


    return setting







# ==========================
# USER AUTH
# ==========================


def get_user_by_username(
    db: Session,
    username: str
):

    return (

        db.query(models.User)

        .filter(

            models.User.username == username

        )

        .first()

    )





def create_user(
    db: Session,
    user: schemas.UserCreate
):

    db_user = models.User(

        username=user.username,

        password_hash=get_password_hash(
            user.password
        )

    )


    db.add(db_user)

    db.commit()

    db.refresh(db_user)


    return db_user

# ==========================
# PAYMENT STATUS
# ==========================

def get_payment_status(
    db: Session,
    month: str
):

    members = (
        db.query(models.Member)
        .all()
    )


    payments = (
        db.query(models.Payment)
        .all()
    )


    search_month = normalize_text(
        month
    )


    result = []


    for member in members:

        paid = False

        amount = 0


        for payment in payments:


            payment_month = normalize_text(
                payment.month
            )


            if (
                payment.member_id == member.id
                and payment_month == search_month
            ):

                paid = True

                amount = float(
                    payment.amount
                )



        result.append({

            "member_id": member.id,

            "name": member.name,

            "apartment": member.apartment,

            "paid": paid,

            "amount": amount

        })


    return result
