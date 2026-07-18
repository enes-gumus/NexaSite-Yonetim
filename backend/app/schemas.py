from pydantic import BaseModel



# ==========================
# MEMBER
# ==========================


class MemberBase(BaseModel):

    name: str

    apartment: str

    phone: str





class MemberCreate(MemberBase):

    pass





class MemberUpdate(BaseModel):

    name: str | None = None

    apartment: str | None = None

    phone: str | None = None





class MemberResponse(MemberBase):

    id: int


    class Config:

        from_attributes = True







# ==========================
# PAYMENT
# ==========================


class PaymentBase(BaseModel):

    amount: float

    month: str

    member_id: int





class PaymentCreate(PaymentBase):

    pass





class PaymentUpdate(BaseModel):

    amount: float | None = None

    month: str | None = None

    member_id: int | None = None





class PaymentResponse(PaymentBase):

    id: int


    class Config:

        from_attributes = True







# ==========================
# SETTINGS
# ==========================


class SettingResponse(BaseModel):

    id: int

    fee: float


    class Config:

        from_attributes = True







# ==========================
# AUTH
# ==========================


class UserCreate(BaseModel):

    username: str

    password: str





class UserLogin(BaseModel):

    username: str

    password: str





class Token(BaseModel):

    access_token: str

    token_type: str





# ==========================
# REPORT
# ==========================


class ReportResponse(BaseModel):

    month: str

    total_members: int

    paid_members: int

    waiting_members: int

    total_collected: float

    total_debt: float

    collection_rate: float

    debtors: list
