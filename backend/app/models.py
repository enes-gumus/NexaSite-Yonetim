from sqlalchemy import Column, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship

from .database import Base


class Member(Base):

    __tablename__ = "members"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String(100),
        nullable=False
    )


    apartment = Column(
        String(20),
        nullable=False,
        unique=True
    )


    phone = Column(
        String(20),
        nullable=False
    )


    payments = relationship(
        "Payment",
        back_populates="member",
        cascade="all, delete"
    )





class Payment(Base):

    __tablename__ = "payments"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    amount = Column(
        Numeric(10,2),
        nullable=False
    )


    month = Column(
        String(50),
        nullable=False
    )


    member_id = Column(
        Integer,
        ForeignKey("members.id"),
        nullable=False
    )


    member = relationship(
        "Member",
        back_populates="payments"
    )





class Setting(Base):

    __tablename__ = "settings"


    id = Column(
        Integer,
        primary_key=True
    )


    fee = Column(
        Numeric(10,2),
        nullable=False,
        default=500
    )





class User(Base):

    __tablename__ = "users"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    username = Column(
        String(50),
        unique=True,
        nullable=False
    )


    password_hash = Column(
        String(255),
        nullable=False
    )
