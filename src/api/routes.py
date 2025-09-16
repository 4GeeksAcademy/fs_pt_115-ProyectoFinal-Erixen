"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from .models import db, User, Club, Pista, Reserva, Contacto

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# ------------------------------------------------------------------------------------------------

# Registro de usuario
@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    required_fields = ["nombre", "apellidos", "email", "password", "telefono", "rol"]

    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "All fields are required"}), 400
    
    existing_user = db.session.execute(db.select(User).where(
        User.email == data["email"]
    )).scalar_one_or_none()

    if existing_user:
        return jsonify({"msg": "User with this email already exists"}), 400
    
    new_user = User(
        nombre = data["nombre"],
        apellidos = data["apellidos"],
        email = data["email"],
        telefono = data["telefono"],
        rol = data["rol"]
    )
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# Login de usuario
@api.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    if not data["email"] or not data["password"]:
        return jsonify({"msg": "Email and password are required"}), 400
    
    user = db.session.execute(db.select(User).where(
        User.email == data["email"]
    )).scalar_one_or_none()

    if user is None:
        return jsonify({"msg": "Invalid email or password"}), 400
    
    if user.check_password(data["password"]):
        access_token = create_access_token(identity = str(user.id))
        return jsonify({"msg": "Login successful", "token": access_token}), 200
    else:
        return jsonify({"msg": "Invalid email or password"}), 400

# ------------------------------------------------------------------------------------------------
# Users endpoints.

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    if not users:
        return jsonify({'message': 'ERROR, There not users.'}), 404

    return jsonify([user.serialize() for user in users]), 200

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    unique_user = User.query.get(id)
    if not unique_user:
        return ({'message': 'User not found, try with other user.'}), 404

    return jsonify([unique_user.serialize()]), 200

@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({'Error': 'User not found'}), 404

    data = request.get_json()

    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)

    db.session.commit()

    return jsonify({
        "message": f"user with id {id} updated succesfully",
        "user updated": user.serialize()
    }), 200

@api.route("/users/<int:id>", methods=['DELETE'])
def delete_user(id):
    my_user = User.query.get(id)

    if not my_user:
        return jsonify({'Error': 'Inexistent user'}), 404

    db.session.delete(my_user)
    db.session.commit()
    return jsonify({"message": f"User id {id} deleted succesfully"}), 200


# ------------------------------------------------------------------------------------------------
# Club endpoints.


@api.route('/clubs', methods=['GET'])
def get_all_clubs():
    clubs = Club.query.all()
    if not clubs:
        return jsonify({'message': 'ERROR, There not clubs.'}), 404
    return jsonify([club.serialize() for club in clubs]), 200


@api.route('/clubs/<int:id>', methods=['GET'])
def get_club(id):
    unique_club = Club.query.get(id)
    if not unique_club:
        return ({"message": "Club not found, try with other club."}), 404
    return jsonify(unique_club.serialize()), 200


@api.route('/clubs', methods=['POST'])
def create_club():
    data = request.get_json()

    if not data.get("email") or not data.get("password") or not data.get("cif_nif"):
        return jsonify({"message": "Email, Password and CIF/NIF are required."}), 400

    if data.get('email') or data.get('cif_nif') in [club.email for club in Club.query.all()]:
        return jsonify({"error": "Email or CIF/NIF already in use"}), 400

    hashed_password = bcrypt.generate_password_hash(
        data.get("password")
    ).decode('utf-8')

    new_club = Club(
        email=data.get("email"),
        password=hashed_password,
        cif_nif=data.get("cif_nif")
    )

    db.session.add(new_club)
    db.session.commit()

    return jsonify(new_club.serialize()), 201


@api.route('/clubs/<int:id>', methods=['PUT'])
def update_club(id):
    club = Club.query.get(id)

    if not club:
        return jsonify({"error": f"club with id {id} not found"}), 404

    data = request.get_json()

    club.email = data.get("email", club.email)
    club.password = data.get("password", club.password)
    club.cif_nif = data.get("cif_nif", club.cif_nif)

    db.session.commit()

    return jsonify({
        "message": f"club with id {id} succesfully updated",
        "club updated": club.serialize()
    }), 200


@api.route('/clubs/<int:id>', methods=['DELETE'])
def delete_club(id):
    my_club = Club.query.get(id)

    if not my_club:
        return jsonify({"error": f"club with id {id} doesn´t exist"}), 404

    db.session.delete(my_club)
    db.session.commit()
    return jsonify({"message": f"club with id {id} deleted"})


# ------------------------------------------------------------------------------------------------
# Pista endpoints.


@api.route('/pistas', methods=['GET'])
def get_all_pistas():
    pistas = Pista.query.all()
    if not pistas:
        return jsonify({'message': 'ERROR, There not pistas.'}), 404

    return jsonify([pista.serialize() for pista in pistas]), 200


@api.route('/pistas/<int:id>', methods=['GET'])
def get_pista(id):
    unique_pista = Pista.query.get(id)
    if not unique_pista:
        return jsonify({"message": "Pista not found, try with other pista."})
    return jsonify(unique_pista.serialize()), 200

# Pistas de un club concreto


@api.route('clubs/<int:club_id>/pistas', methods=['GET'])
def get_pistas_de_un_club(club_id):
    pistas_del_club = Pista.query.filter(Pista.id_club == club_id).all()

    if not pistas_del_club:
        return jsonify({"error": f"pistas for club with id {club_id} not found"}), 404

    return jsonify([pista_del_club.serialize() for pista_del_club in pistas_del_club]), 200


@api.route('/pistas', methods=['POST'])
def create_pista():
    data = request.get_json()

    if not data.get("id_club") or not data.get("numero_pista") or not data.get("precio_hora"):
        return jsonify({"error": "Id del club, número de pista, precio por hora and estado actual are required"}), 400

    new_pista = Pista(
        id_club=data.get("id_club"),
        numero_pista=data.get("numero_pista"),
        precio_hora=data.get("precio_hora")
    )

    db.session.add(new_pista)
    db.session.commit()
    return jsonify({
        "message": "pista created succesfully",
        "pista": new_pista.serialize()
    }), 201


@api.route('/pistas/<int:id>', methods=['PUT'])
def update_pista(id):
    pista = Pista.query.get(id)

    if not pista:
        return jsonify({"error": f"pista with id {id} not found"}), 404

    data = request.get_json()

    pista.id_club = data.get("id_club", pista.id_club)
    pista.numero_pista = data.get("numero_pista", pista.numero_pista)
    pista.superficie = data.get("superficie", pista.superficie)
    pista.precio_hora = data.get("precio_hora", pista.precio_hora)
    pista.estado = data.get("estado", pista.estado)

    db.session.commit()

    return jsonify({
        "message": f"pista with id {id} updated succesfully",
        "pista updated": pista.serialize()
    })


@api.route('/pistas/<int:id>', methods=['DELETE'])
def delete_pista(id):
    my_pista = Pista.query.get(id)

    if not my_pista:
        return jsonify({"error": f"pista with id {id} doesn´t exist"}), 404

    db.session.delete(my_pista)
    db.session.commit()
    return jsonify({"message": f"pista with id {id} deleted succesfully"}), 200

# ------------------------------------------------------------------------------------------------
# Reserva endpoints.


@api.route('/reservas', methods=['GET'])
def get_all_reservas():
    reservas = Reserva.query.all()

    if not reservas:
        return jsonify({'message': 'ERROR, There not reservas.'}), 404

    return jsonify([reserva.serialize() for reserva in reservas]), 200


@api.route('/reservas/<int:id>', methods=['GET'])
def get_reserva(id):
    my_reserva = Reserva.query.get(id)

    if not my_reserva:
        return jsonify({"error": f"Reserva with id {id} doesn't exist"}), 404

    return jsonify(my_reserva.serialize()), 200

# get reservas de un usuario


@api.route('/users/<int:usuario_id>/reservas', methods=['GET'])
def reservas_de_un_usuario(usuario_id):
    reservas_de_usuario = Reserva.query.filter(
        Reserva.id_usuario == usuario_id).all()

    # en este caso si no hay reservas devuelve list vacío en vez de devolver error
    return jsonify([reserva_de_usuario.serialize() for reserva_de_usuario in reservas_de_usuario]), 200

# get reservas que tiene una pista


@api.route('/pistas/<int:pista_id>/reservas', methods=['GET'])
def get_reservas_de_una_pista(pista_id):
    reservas_de_una_pista = Reserva.query.filter(
        Reserva.id_pista == pista_id).all()

    if not reservas_de_una_pista:
        return jsonify({"error": f"reservas for pista with id {pista_id} not found"}), 404

    return jsonify([reserva_de_una_pista.serialize() for reserva_de_una_pista in reservas_de_una_pista]), 200


@api.route('/reservas', methods=['POST'])
def create_reserva():
    data = request.get_json()

    if not data.get("id_pista") or not data.get("fecha_reserva") or not data.get("hora_inicio") or not data.get("hora_fin") or not data.get("precio_total"):
        return jsonify({"error": "id pista, fecha reserva, hora de inicio, hora de fin, precio total and estado are required fields"})

    new_reserva = Reserva(
        id_pista=data.get("id_pista"),
        id_usuario=data.get("id_usuario"),
        fecha_reserva=data.get("fecha_reserva"),
        hora_inicio=data.get("hora_inicio"),
        hora_fin=data.get("hora_fin"),
        precio_total=data.get("precio_total")
        
    )

    db.session.add(new_reserva)
    db.session.commit()
    return jsonify({
        "message": "new reserva created succesfully",
        "reserva": new_reserva.serialize()
    }), 201


@api.route('/reservas/<int:id>', methods=['PUT'])
def update_reserva(id):
    reserva = Reserva.query.get(id)

    if not reserva:
        return jsonify({"error": "reserva not found"}), 404

    data = request.get_json()

    reserva.id_pista = data.get("id_pista", reserva.id_pista)
    reserva.fecha_reserva = data.get("fecha_reserva", reserva.fecha_reserva)
    reserva.hora_inicio = data.get("hora_inicio", reserva.hora_inicio)
    reserva.hora_fin = data.get("hora_fin", reserva.hora_fin)
    reserva.precio_total = data.get("precio_total", reserva.precio_total)
    reserva.estado = data.get("estado", reserva.estado)

    db.session.commit()

    return jsonify({
        "message": f"reserva with id {id} updated succesfully",
        "reserva updated": reserva.serialize()
    })


@api.route('/reservas/<int:id>', methods=['DELETE'])
def delete_reserva(id):
    my_reserva = Reserva.query.get(id)

    if not my_reserva:
        return jsonify({"error": f"reserva with id {id} doesn't exist"}), 404

    db.session.delete(my_reserva)
    db.session.commit()
    return jsonify(f"reserva with id: {id} deleted succesfully"), 200

# ------------------------------------------------------------------------------------------------
