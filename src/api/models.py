
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship 
import enum
from sqlalchemy import Enum as SqlEnum


db = SQLAlchemy()

#------------------------------------------------------------------------------------------------
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    lastname: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    telefono: Mapped[str] = mapped_column(String(30), nullable=False)
    rol: Mapped[str] = mapped_column(String(255))
    password: Mapped[str] = mapped_column(nullable=False)
    reservas_id: Mapped[list["Reserva"]] = relationship(back_populates="user_reserva")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "telefono": self.telefono,
            "email": self.email,
            "rol": self.rol,
            "reservas_id": self.reservas_id
            # do not serialize the password, its a security breach
        }

#------------------------------------------------------------------------------------------------
class Club(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    cif_nif: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    direccion: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    telefono: Mapped[str] = mapped_column(String(20), nullable=False)
    horario_apertura_cierre: Mapped[str] = mapped_column(String(255))
    num_pista: Mapped[list["Pista"]] = relationship(back_populates="pista")
    # password: Mapped[str] = mapped_column(nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cif_nif": self.cif_nif,
            "direccion": self.direccion,
            "telefono": self.telefono,
            "email": self.email,
            "horario_apertura_cierre": self.horario_apertura_cierre,
            "num_pista": self.num_pista
            # do not serialize the password, its a security breach
        }

#------------------------------------------------------------------------------------------------
class TipoSuperficie(enum.Enum):
    CESPED="cesped"
    HORMIGON="hormigon"
    SINTETICO="sintetico"

class Pista(db.Model):

    id: Mapped[int] = mapped_column(primary_key=True)
    id_club: Mapped[int] = mapped_column(ForeignKey("club_id"))
    numero_pista: Mapped[int]
    superficie: Mapped[TipoSuperficie] = mapped_column(
        SqlEnum(TipoSuperficie, name="tipo_superficie"), 
        nullable=False, 
        default=TipoSuperficie.CESPED
    )
    precio_hora: Mapped[float]
    estado: Mapped[str]
    pista:Mapped["Club"] = relationship(back_populates="num_pista")
    reserva_pista: Mapped[list["Reserva"]] = relationship(back_populates="pista_reservada")

    def serialize(self):
        return {
            "id": self.id,
            "numero_pista": self.numero_pista,
            "superficie": self.superficie,
            "precio_hora": self.precio_hora,
            "estado": self.estado
        }

#------------------------------------------------------------------------------------------------
class Reserva(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_pista: Mapped[int]
    fecha_reserva: Mapped[str] #aqui va un dato de tiempo
    hora_inicio: Mapped[str]
    hora_fin: Mapped[str] 
    precio_total: Mapped[float]
    estado: Mapped[str]
    user_reserva: Mapped[int] = relationship(back_populates="reserva_id")
    pista_reservada: Mapped["Pista"] = relationship(back_populates="reserva_pista")
    pago_id: Mapped["Pago"] = relationship(back_populates="reserva_pago")

    def serialize(self):
        return{
            "id": self.id,
            "id_pista": self.id_pista,
            "fecha_reserva": self.fecha_reserva,
            "hora_inicio": self.hora_inicio,
            "hora_fin": self.hora_fin,
            "precio_total": self.precio_total,
            "estado": self.estado
        }
    
#------------------------------------------------------------------------------------------------    
class Pago(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_reserva: Mapped[int] = mapped_column(ForeignKey("reserva.id"))  
    metodo_pago: Mapped[str]
    monto_cantidad: Mapped[float]
    estado_pago: Mapped[str] 
    pago_reserva: Mapped["Reserva"] = relationship(back_populates="pago_id")

    def serialize(self):
        return{
            "id": self.id,
            "id_reserva": self.id_reserva,
            "metodo_pago": self.metodo_pago,
            "monto_cantidad": self.monto_cantidad,
            "estado_pago": self.estado_pago
        }
    

#------------------------------------------------------------------------------------------------    