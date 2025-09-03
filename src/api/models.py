import enum
from sqlalchemy import Enum as SqlEnum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime, time
from sqlalchemy import DateTime, Time

db = SQLAlchemy()

#------------------------------------------------------------------------------------------------
class UserRol(enum.Enum):
    USER = "user"
    CLUB = "club"
    ADMIN = "admin"

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    lastname: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    telefono: Mapped[str] = mapped_column(String(30), nullable=False)
    rol: Mapped[UserRol] = mapped_column(SqlEnum(UserRol), default=UserRol.USER)
    password_hash: Mapped[str] = mapped_column(nullable=False)

    reservas: Mapped[list["Reserva"]] = relationship(back_populates="reservas_usuario")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "telefono": self.telefono,
            "email": self.email,
            "rol": self.rol.value,
            "reservas": [reserva.id for reserva in self.reservas]
        }

#------------------------------------------------------------------------------------------------

class Club(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    cif_nif: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    direccion: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    telefono: Mapped[str] = mapped_column(String(20), nullable=False)
    hora_apertura: Mapped[time] = mapped_column(Time, nullable=False)
    hora_cierre: Mapped[time] = mapped_column(Time, nullable=False)

    pistas: Mapped[list["Pista"]] = relationship(back_populates="pistas_club")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cif_nif": self.cif_nif,
            "direccion": self.direccion,
            "telefono": self.telefono,
            "email": self.email,
            "hora_apertura": self.hora_apertura.isoformat(),
            "hora_cierre": self.hora_cierre.isoformat(),
            "pistas": [pista.id for pista in self.pistas]
        }

#------------------------------------------------------------------------------------------------

class TipoSuperficie(enum.Enum):
    CESPED = "cesped"
    HORMIGON = "hormigon"
    SINTETICO = "sintetico"

class EstadoPista(enum.Enum):
    LIBRE = "libre"
    RESERVADA = "reservada"

class Pista(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_club: Mapped[int] = mapped_column(ForeignKey("club.id"))
    numero_pista: Mapped[int] = mapped_column(nullable=False)
    superficie: Mapped[TipoSuperficie] = mapped_column(SqlEnum(TipoSuperficie), default=TipoSuperficie.CESPED)
    precio_hora: Mapped[float] = mapped_column(nullable=False)
    estado_pista: Mapped[EstadoPista] = mapped_column(SqlEnum(EstadoPista), default=EstadoPista.LIBRE)
    
    club: Mapped["Club"] = relationship(back_populates="pistas_club")
    reservas: Mapped[list["Reserva"]] = relationship(back_populates="reservas_pista")

    def serialize(self):
        return {
            "id": self.id,
            "numero_pista": self.numero_pista,
            "superficie": self.superficie.value,
            "precio_hora": self.precio_hora,
            "estado_pista": self.estado_pista.value
        }

#------------------------------------------------------------------------------------------------

class Reserva(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_pista: Mapped[int] = mapped_column(ForeignKey("pista.id"))
    fecha_reserva: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    hora_inicio: Mapped[time] = mapped_column(Time, nullable=False)
    hora_fin: Mapped[time] = mapped_column(Time, nullable=False)
    precio_total: Mapped[float] = mapped_column(nullable=False)
    id_usuario: Mapped[int] = mapped_column(ForeignKey("user.id"))

    usuario: Mapped["User"] = relationship(back_populates="reservas_usuario")
    pista: Mapped["Pista"] = relationship(back_populates="reservas_pista")

    def serialize(self):
        return{
            "id": self.id,
            "id_pista": self.id_pista,
            "fecha_reserva": self.fecha_reserva.isoformat(),
            "hora_inicio": self.hora_inicio.isoformat(),
            "hora_fin": self.hora_fin.isoformat(),
            "precio_total": self.precio_total
        }
    
#------------------------------------------------------------------------------------------------    
# class Pago(db.Model):
#     id: Mapped[int] = mapped_column(primary_key=True)
#     id_reserva: Mapped[int] = mapped_column(ForeignKey("reserva.id"))  
#     metodo_pago: Mapped[str]
#     monto_cantidad: Mapped[float]
#     estado_pago: Mapped[str] 
#     pago_reserva: Mapped["Reserva"] = relationship(back_populates="pago_id")

#     def serialize(self):
#         return{
#             "id": self.id,
#             "id_reserva": self.id_reserva,
#             "metodo_pago": self.metodo_pago,
#             "monto_cantidad": self.monto_cantidad,
#             "estado_pago": self.estado_pago
#         }
    

#------------------------------------------------------------------------------------------------    
