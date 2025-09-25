from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from .models import db, User, Club, Pista, Reserva, Contacto

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# ------------------------------------------------------------------------------------------------

# Registro de usuario
@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    required_fields = ["nombre", "apellidos", "email", "password", "telefono"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400

    existing_user = db.session.execute(db.select(User).where(
        User.email == data["email"]
    )).scalar_one_or_none()

    if existing_user:
        return jsonify({"msg": "Ya existe un usuario con este email"}), 400

    new_user = User(
        nombre=data["nombre"],
        apellidos=data["apellidos"],
        email=data["email"],
        telefono=data["telefono"]
    )
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado con éxito"}), 201

# Registro de club
@api.route('/clubs', methods=['POST'])
def create_club():
    data = request.get_json()

    required_fields = ["nombre", "email", "password",
                       "direccion", "telefono", "hora_apertura", "hora_cierre"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400

    existing_club = db.session.execute(db.select(Club).where(
        Club.email == data["email"]
    )).scalar_one_or_none()

    if existing_club:
        return jsonify({"msg": "Ya existe un club con este email"}), 400

    new_club = Club(
        nombre=data["nombre"],
        email=data["email"],
        direccion=data["direccion"],
        telefono=data["telefono"],
        hora_apertura=data["hora_apertura"],
        hora_cierre=data["hora_cierre"]
    )
    new_club.set_password(data["password"])

    db.session.add(new_club)
    db.session.commit()

    return jsonify({"msg": "Club creado con éxito"}), 201

# Login
@api.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    if not data["email"] or not data["password"]:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    user = db.session.execute(
        db.select(User).where(User.email == data["email"]
                              )).scalar_one_or_none()

    if user:
        user_type = "user"
    else:
        user = db.session.execute(
            db.select(Club).where(Club.email == data["email"])
        ).scalar_one_or_none()
        user_type = "club"

    if user is None:
        return jsonify({"msg": "Email o contraseña inválidos"}), 400

    if user.check_password(data["password"]):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "Login completado con éxito", "token": access_token, "user_type": user_type, "id": user.id}), 200
    else:
        return jsonify({"msg": "Email o contraseña inválidos"}), 400

# ------------------------------------------------------------------------------------------------

# Obtener todos los usuarios
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()

    if not users:
        return jsonify({"msg": "No se han encontrado usuarios"}), 404

    return jsonify([user.serialize() for user in users]), 200

# Obtener un usuario concreto
@api.route('/user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    unique_user = User.query.get(current_user_id)

    if not unique_user:
        return ({"msg": f"Usuario con id {id} no encontrado"}), 404

    return jsonify([unique_user.serialize()]), 200

# Modificar usuario
@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()

    user = User.query.get(id)

    if not user:
        return jsonify({"msg": f"Usuario con id {id} no encontrado"}), 404
    
    required_fields = ["nombre", "apellidos", "email", "telefono"]

    if not all(data.get(f) and str(data[f]).strip() for f in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400
    
    existing_user = db.session.execute(db.select(User).where(
        User.email == data["email"], User.id != id
    )).scalar_one_or_none()

    if existing_user:
        return jsonify({"msg": "Ya existe un usuario con este email"}), 400
    
    user.nombre=data["nombre"]
    user.apellidos=data["apellidos"]
    user.email=data["email"]
    user.telefono=data["telefono"]

    db.session.commit()

    return jsonify({"msg": f"Usuario con id {id} modificado con éxito"}), 200

# Eliminar usuario
@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    my_user = User.query.get(id)

    if not my_user:
        return jsonify({"msg": f"Usuario con id {id} no encontrado"}), 404

    db.session.delete(my_user)
    db.session.commit()

    return jsonify({"msg": f"Usuario con id {id} eliminado con éxito"}), 200


@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"msg": f"Usuario con id {id} no encontrado"}), 404
    
    return jsonify(user.serialize()),200


# ------------------------------------------------------------------------------------------------

# Obtener todos los clubes
@api.route('/clubs', methods=['GET'])
def get_all_clubs():
    clubs = Club.query.all()

    if not clubs:
        return jsonify({"msg": "No se han encontrado clubes"}), 404

    return jsonify([club.serialize() for club in clubs]), 200

# Obtener un club concreto
@api.route('/clubs/<int:id>', methods=['GET'])
def get_club(id):
    unique_club = Club.query.get(id)

    if not unique_club:
        return ({"message": f"Club con id {id} no encontrado"}), 404

    return jsonify(unique_club.serialize()), 200

@api.route('/club', methods=['GET'])
@jwt_required()
def get_club_profile():
    current_club_id = get_jwt_identity()
    unique_club = Club.query.get(current_club_id)

    if not unique_club:
        return ({"message": f"Club con id {id} no encontrado"}), 404

    return jsonify([unique_club.serialize()]), 200
# Modificar club
@api.route('/clubs/<int:id>', methods=['PUT'])
def update_club(id):
    data = request.get_json()

    club = Club.query.get(id)

    if not club:
        return jsonify({"msg": f"Club con id {id} no encontrado"}), 404
    
    required_fields = ["nombre", "email", "direccion", "telefono", "hora_apertura", "hora_cierre"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400
    
    existing_club = db.session.execute(db.select(Club).where(
        Club.email == data["email"]
    )).scalar_one_or_none()

    if existing_club:
        return jsonify({"msg": "Ya existe un club con este email"}), 400
    
    club.nombre=data["nombre"]
    club.email=data["email"]
    club.direccion=data["direccion"]
    club.telefono=data["telefono"]
    club.hora_apertura=data["hora_apertura"]
    club.hora_cierre=data["hora_cierre"]

    db.session.commit()

    return jsonify({"msg": f"Club con id {id} modificado con éxito"}), 200

# Eliminar club
@api.route('/clubs/<int:id>', methods=['DELETE'])
def delete_club(id):
    my_club = Club.query.get(id)

    if not my_club:
        return jsonify({"msg": f"Club con id {id} no encontrado"}), 404

    db.session.delete(my_club)
    db.session.commit()

    return jsonify({"msg": f"Club con id {id} eliminado con éxito"}), 200

# ------------------------------------------------------------------------------------------------

# Obtener todas las pistas
@api.route('/pistas', methods=['GET'])
def get_all_pistas():
    pistas = Pista.query.all()

    if not pistas:
        return jsonify({"msg": "No se han encontrado pistas"}), 404

    return jsonify([pista.serialize() for pista in pistas]), 200

# Obtener una pista concreta
@api.route('/pistas/<int:id>', methods=['GET'])
def get_pista(id):
    unique_pista = Pista.query.get(id)

    if not unique_pista:
        return jsonify({"msg": f"Pista con id {id} no encontrada"})

    return jsonify(unique_pista.serialize()), 200

# Obtener todas las pistas de un club concreto
@api.route('clubs/<int:club_id>/pistas', methods=['GET'])
def get_pistas_de_un_club(club_id):
    pistas_del_club = Pista.query.filter(Pista.id_club == club_id).all()

    if not pistas_del_club:
        return jsonify({"msg": f"Pistas del club con id {club_id} no encontradas"}), 404

    return jsonify([pista_del_club.serialize() for pista_del_club in pistas_del_club]), 200

# Crear pista
@api.route('/pistas', methods=['POST'])
def create_pista():
    data = request.get_json()

    required_fields = ["id_club", "numero_pista",
                       "superficie", "precio_hora", "estado_pista"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400

    existing_numero_pista = db.session.execute(db.select(Pista).where(
        Pista.id_club == data["id_club"],
        Pista.numero_pista == data["numero_pista"]
    )).scalar_one_or_none()

    if existing_numero_pista:
        return jsonify({"msg": "Ya existe una pista con este número"}), 400

    new_pista = Pista(
        id_club=data["id_club"],
        numero_pista=data["numero_pista"],
        superficie=data["superficie"],
        precio_hora=data["precio_hora"],
        estado_pista=data["estado_pista"]
    )

    db.session.add(new_pista)
    db.session.commit()

    return jsonify({"msg": "Pista creada con éxito"}), 201

# Modificar pista
@api.route('/pistas/<int:id>', methods=['PUT'])
def update_pista(id):
    data = request.get_json()

    pista = Pista.query.get(id)

    if not pista:
        return jsonify({"msg": f"Pista con id {id} no encontrada"}), 404
    
    required_fields = ["numero_pista", "superficie", "precio_hora", "estado_pista"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400
    
    existing_numero_pista = db.session.execute(db.select(Pista).where(
        Pista.id_club == pista.id_club,
        Pista.numero_pista == data["numero_pista"],
        Pista.id != id
    )).scalar_one_or_none()

    if existing_numero_pista:
        return jsonify({"msg": "Ya existe una pista con este número"}), 400
    
    pista.numero_pista=data["numero_pista"]
    pista.superficie=data["superficie"]
    pista.precio_hora=data["precio_hora"]
    pista.estado_pista=data["estado_pista"]

    db.session.commit()

    return jsonify({"msg": f"Pista con id {id} modificada con éxito"}), 200

# Eliminar pista
@api.route('/pistas/<int:id>', methods=['DELETE'])
def delete_pista(id):
    my_pista = Pista.query.get(id)

    if not my_pista:
        return jsonify({"msg": f"Pista con id {id} no encontrada"}), 404

    db.session.delete(my_pista)
    db.session.commit()

    return jsonify({"msg": f"Pista con id {id} eliminada con éxito"}), 200

# ------------------------------------------------------------------------------------------------

# Obtener todas las reservas
@api.route('/reservas', methods=['GET'])
def get_all_reservas():
    reservas = Reserva.query.all()

    if not reservas:
        return jsonify({"msg": "No se han encontrado reservas"}), 404

    return jsonify([reserva.serialize() for reserva in reservas]), 200

# Obtener una reserva concreta
@api.route('/reservas/<int:id>', methods=['GET'])
def get_reserva(id):
    unique_reserva = Reserva.query.get(id)

    if not unique_reserva:
        return jsonify({"msg": f"Reserva con id {id} no encontrada"}), 404

    return jsonify(unique_reserva.serialize()), 200

# Crear reserva
@api.route('/reservas', methods=['POST'])
def create_reserva():
    data = request.get_json()

    required_fields = ["id_usuario", "id_pista",
                       "fecha_reserva", "hora_inicio", "hora_fin"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400

    hora_inicio = datetime.strptime(data["hora_inicio"], "%H:%M").time()
    hora_fin = datetime.strptime(data["hora_fin"], "%H:%M").time()

    if hora_fin <= hora_inicio:
        return jsonify({"msg": "La hora de fin de la reserva debe ser posterior que la hora de inicio"}), 400

    new_reserva = Reserva(
        id_usuario=data["id_usuario"],
        id_pista=data["id_pista"],
        fecha_reserva=data["fecha_reserva"],
        hora_inicio=data["hora_inicio"],
        hora_fin=data["hora_fin"]
    )

    db.session.add(new_reserva)
    db.session.commit()

    return jsonify({"msg": "Reserva creada con éxito"}), 201

# Modificar reserva
@api.route('/reservas/<int:id>', methods=['PUT'])
def update_reserva(id):
    data = request.get_json()

    reserva = Reserva.query.get(id)

    if not reserva:
        return jsonify({"msg": f"Reserva con id {id} no encontrada"}), 404
    
    required_fields = ["id_pista", "fecha_reserva", "hora_inicio", "hora_fin"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "Todos los campos son requeridos"}), 400
    
    hora_inicio = datetime.strptime(data["hora_inicio"], "%H:%M").time()
    hora_fin = datetime.strptime(data["hora_fin"], "%H:%M").time()

    if hora_fin <= hora_inicio:
        return jsonify({"msg": "La hora de fin de la reserva debe ser posterior que la hora de inicio"}), 400
    
    reserva.id_pista=data["id_pista"]
    reserva.fecha_reserva=data["fecha_reserva"]
    reserva.hora_inicio=data["hora_inicio"]
    reserva.hora_fin=data["hora_fin"]

    db.session.commit()

    return jsonify({"msg": f"Reserva con id {id} modificada con éxito"}), 200

# Eliminar reserva
@api.route('/reservas/<int:id>', methods=['DELETE'])
def delete_reserva(id):
    my_reserva = Reserva.query.get(id)

    if not my_reserva:
        return jsonify({"msg": f"Reserva con id {id} no encontrada"}), 404

    db.session.delete(my_reserva)
    db.session.commit()

    return jsonify({"msg": f"Reserva con id {id} eliminada con éxito"}), 200

# ------------------------------------------------------------------------------------------------

# Obtener todos los mensajes
@api.route('/mensajes', methods=['GET'])
def get_all_mensajes():
    mensajes = Contacto.query.all()

    if not mensajes:
        return jsonify({"msg": "No se han encontrado mensajes"}), 404

    return jsonify([mensaje.serialize() for mensaje in mensajes]), 200

# Crear mensaje
@api.route('/mensajes', methods=['POST'])
def create_mensaje():
    data = request.get_json()

    id_usuario = data.get("id_usuario")
    id_club = data.get("id_club")

    if not (id_usuario or id_club):
        return jsonify({"msg": "Debe especificar al menos un id de usuario o de club"}), 400

    if id_usuario and id_club:
        return jsonify({"msg": "Debe especificar únicamente un id"}), 400
    
    if not (data.get("texto")):
        return jsonify({"msg": "El texto del mensaje es requerido"}), 400

    new_mensaje = Contacto(
        id_usuario=id_usuario,
        id_club=id_club,
        texto=data["texto"]
    )

    db.session.add(new_mensaje)
    db.session.commit()

    return jsonify({"msg": "Mensaje creado con éxito"}), 201