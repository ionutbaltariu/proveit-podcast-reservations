import sqlalchemy
from db import Base


class Notificare(Base):
    __tablename__ = "notificari"
    idNotificare = sqlalchemy.Column(sqlalchemy.Integer, nullable=False, primary_key=True)
    idUserSursa = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    idUserDestinatie = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
    timestamp = sqlalchemy.Column(sqlalchemy.DATETIME, nullable=False)
