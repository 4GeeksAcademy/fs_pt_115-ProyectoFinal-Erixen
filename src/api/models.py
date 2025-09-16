import enum
from sqlalchemy import Enum as SqlEnum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, ForeignKey, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import date, time
from sqlalchemy import Date, Time

db = SQLAlchemy()

# ------------------------------------------------------------------------------------------------

class User(db.Model):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    telefono: Mapped[str] = mapped_column(String(30))

    reservas: Mapped[list["Reserva"]] = relationship(back_populates="usuario", cascade="all, delete-orphan")
    mensajes: Mapped[list["Contacto"]] = relationship(back_populates="usuario", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
            "telefono": self.telefono,
            "reservas": [reserva.id for reserva in self.reservas],
            "mensajes": [mensaje.id for mensaje in self.mensajes]
        }

# ------------------------------------------------------------------------------------------------


class Club(db.Model):
    __tablename__ = "clubs"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    direccion: Mapped[str] = mapped_column(String(255), nullable=False)
    telefono: Mapped[str] = mapped_column(String(20), nullable=False)
    hora_apertura: Mapped[time] = mapped_column(Time, nullable=False)
    hora_cierre: Mapped[time] = mapped_column(Time, nullable=False)

    pistas: Mapped[list["Pista"]] = relationship(back_populates="club", cascade="all, delete-orphan")
    mensajes: Mapped[list["Contacto"]] = relationship(back_populates="club", cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "direccion": self.direccion,
            "telefono": self.telefono,
            "hora_apertura": self.hora_apertura.strftime("%H:%M"),
            "hora_cierre": self.hora_cierre.strftime("%H:%M"),
            "pistas": [pista.id for pista in self.pistas],
            "mensajes": [mensaje.id for mensaje in self.mensajes]
        }

# ------------------------------------------------------------------------------------------------


class TipoSuperficie(enum.Enum):
    CESPED = "cesped"
    HORMIGON = "hormigon"
    SINTETICO = "sintetico"


class EstadoPista(enum.Enum):
    LIBRE = "libre"
    RESERVADA = "reservada"
    MANTENIMIENTO = "mantenimiento"


class Pista(db.Model):
    __tablename__ = "pistas"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_club: Mapped[int] = mapped_column(ForeignKey("clubs.id"))
    numero_pista: Mapped[int] = mapped_column(unique=True)
    superficie: Mapped[TipoSuperficie] = mapped_column(SqlEnum(TipoSuperficie), default=TipoSuperficie.CESPED)
    precio_hora: Mapped[float] = mapped_column(nullable=False)
    estado_pista: Mapped[EstadoPista] = mapped_column(SqlEnum(EstadoPista), default=EstadoPista.LIBRE)

    club: Mapped["Club"] = relationship(back_populates="pistas")
    reservas: Mapped[list["Reserva"]] = relationship(back_populates="pista", cascade="all, delete-orphan")

    __table_args__ = (
        db.UniqueConstraint("id_club", "numero_pista", name="num_pista_unico"),
    )

    def serialize(self):
        return {
            "id": self.id,
            "id_club": self.id_club,
            "numero_pista": self.numero_pista,
            "superficie": self.superficie.value,
            "precio_hora": self.precio_hora,
            "estado_pista": self.estado_pista.value,
            "reservas": [reserva.id for reserva in self.reservas]
        }

# ------------------------------------------------------------------------------------------------


class Reserva(db.Model):
    __tablename__ = "reservas"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_usuario: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    id_pista: Mapped[int] = mapped_column(ForeignKey("pistas.id"))
    fecha_reserva: Mapped[date] = mapped_column(Date, nullable=False)
    hora_inicio: Mapped[time] = mapped_column(Time, nullable=False)
    hora_fin: Mapped[time] = mapped_column(Time, nullable=False)

    usuario: Mapped["User"] = relationship(back_populates="reservas")
    pista: Mapped["Pista"] = relationship(back_populates="reservas")

    __table_args__ = (
        CheckConstraint("hora_fin > hora_inicio", name="check_rango_horas_valido"),
    )

    def serialize(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_pista": self.id_pista,
            "fecha_reserva": self.fecha_reserva.isoformat(),
            "hora_inicio": self.hora_inicio.strftime("%H:%M"),
            "hora_fin": self.hora_fin.strftime("%H:%M")
        }

# ------------------------------------------------------------------------------------------------

class Contacto(db.Model):
    __tablename__ = "mensajes"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_usuario: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)
    id_club: Mapped[int] = mapped_column(ForeignKey("clubs.id"), nullable=True)
    texto: Mapped[str] = mapped_column(String(300), nullable=False)

    usuario: Mapped["User"] = relationship(back_populates="mensajes")
    club: Mapped["Club"] = relationship(back_populates="mensajes")

    __table_args__ = (
        CheckConstraint(
            "((id_usuario IS NOT NULL) AND (id_club IS NULL)) OR "
            "((id_usuario IS NULL) AND (id_club IS NOT NULL))",
            name="check_existe_1_remitente"
        ),
    )

    def serialize(self):
        return{
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_club": self.id_club,
            "texto": self.texto
        }