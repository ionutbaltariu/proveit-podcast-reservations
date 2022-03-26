import sqlalchemy
from db import Base


class Tichet(Base):
    __tablename__ = "tichete"
    idTichet = sqlalchemy.Column(sqlalchemy.Integer, nullable=False, primary_key=True)
    idUser = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    prioritate = sqlalchemy.Column(sqlalchemy.String(10), nullable=False)
    descriere = sqlalchemy.Column(sqlalchemy.String(300), nullable=False)
    stare = sqlalchemy.Column(sqlalchemy.String(15), nullable=False)
