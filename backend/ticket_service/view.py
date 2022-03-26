from fastapi_hypermodel import HyperModel, LinkSet, HALFor
from pydantic import constr, BaseModel


class Tichet(HyperModel):
    idTichet: int
    idUser: int
    prioritate: constr(min_length=1, max_length=10)
    descriere: constr(min_length=1, max_length=300)
    stare: constr(min_length=1, max_length=15)

    links = LinkSet(
        {
            "self": HALFor("get_tichet", {"idTichet": "<idTichet>"}, "Get the tichet"),
        }
    )

    class Config:
        orm_mode = True


class TichetPost(HyperModel):
    idUser: int
    prioritate: constr(min_length=1, max_length=10)
    descriere: constr(min_length=1, max_length=300)
    stare: constr(min_length=1, max_length=15)

    class Config:
        orm_mode = True


class Error(BaseModel):
    error_code: int
    error_source: str
    error_reason: str
