"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from .models import User, Club, Pista, Reserva, Pago

#------------------------------------------------------------------------------------------------

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods = ['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#------------------------------------------------------------------------------------------------

@api.route('/users', methods = ['GET'])
def get_all_users():
    users = User.query.all()
    if not users:
        return jsonify({"msg": "ERROR"}), 404
    return jsonify([user.serialize() for user in users]), 200  

@api.route('/users/<int:id>', methods = ['GET'])
def get_user(id):
    unique_user = User.query.get(id)
    if not unique_user:
        return ({"message": "User not found, try with other user."}), 404
    return jsonify([unique_user.serialize()]), 200

@api.route('/users', methods = ['POST'])
def create_user():
    data = request.get_json()
    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Name, Email and Password are required"})
    
    new_user = User(
        name = data.get["name"],
        email = data.get["email"],
        password = data.get["password"]
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201

@api.route('/users/<int:id>', methods = ['PUT'])
def update_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "user not found"}), 404
    
    data = request.get_json()

    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)

    db.session.commit()
    
    return jsonify({
        "message": f"user with id {id} updated succesfully",
        "user updated": user.serialize()
    }), 200

@api.route("/users/<int:id>", methods = ['DELETE'])
def delete_user(id):
    my_user = User.query.get(id)
    if not my_user:
        return jsonify({"error": "inexistent user"})
    
    db.session.delete(my_user)
    db.session.commit()
    return jsonify({"message", f"User id {id} deleted succesfully"})

#------------------------------------------------------------------------------------------------

@api.route('/clubs', methods = ['GET'])
def get_all_clubs():
    clubs= Club.query.all()
    if not clubs:
        return jsonify({"message": "ERROR"}), 404
    return jsonify([club.serialize() for club in clubs]), 200


@api.route('/clubs/<int:id>', methods = ['GET'])
def get_club(id):
    unique_club = Club.query.get(id)
    if not unique_club:
        return({"message": "Club not found, try with other club."}), 404
    return jsonify(unique_club.serialize()), 200

@api.route('/clubs', methods = ['POST'])
def create_club():
    data = request.get_json()

    if not data.get("email") or not data.get("password") or not data.get("cif_nif"):
        return jsonify({"message": "Email, Password and CIF/NIF are required."}), 400
    
    new_club = Club(
        email = data.get["email"],
        password = data.get["password"],
        cif_nif = data.get["cif_nif"]
    )

    db.session.add(new_club)
    db.session.commit()

    return jsonify(new_club.serialize()), 201

@api.route('/clubs/<int:id>', methods = ['PUT'])
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

@api.route('/clubs/<int:id>', methods = ['DELETE'])
def delete_club(id):
    my_club = Club.query.get(id)

    if not my_club:
        return jsonify({"error": f"club with id {id} doesn´t exist"}), 404
    
    db.session.delete(my_club)
    db.session.commit()
    return jsonify({"message": f"club with id {id} deleted"})
    

#------------------------------------------------------------------------------------------------

@api.route('/pistas', methods = ['GET'])
def get_all_pistas():
    pistas = Pista.query.all()
    if not pistas:
        return jsonify({"message": "ERROR"}), 404
    
    return jsonify([pista.serialize() for pista in pistas]), 200

@api.route('/pistas/<int:id>', methods = ['GET'])
def get_pista(id):
    unique_pista = Pista.query.get(id)
    if not unique_pista:
        return jsonify({"message": "Pista not found, try with other pista."})
    return jsonify(unique_pista.serialize()), 200

@api.route('/pistas', methods = ['POST'])
def create_pista():
    data = request.get_json()

    if not data.get("id_club") or not data.get("numero_pista") or not data.get("precio_hora") or not data.get("estado"):
        return jsonify({"error": "Id del club, número de pista, precio por hora and estado actual are required"}), 400
    
    new_pista = Pista(
        id_club = data.get("id_club"),
        numero_pista = data.get("numero_pista"),
        precio_hora = data.get("precio_hora"),
        estado = data.get("estado")
    )
    
    db.session.add(new_pista)
    db.session.commit()
    return jsonify({
        "message": "pista created succesfully",
        "pista": new_pista.serialize()
        }), 201

@api.route('/pistas/<int:id>', methods = ['PUT'])
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


@api.route('/pistas/<int:id>', methods = ['DELETE'])
def delete_pista(id):
    my_pista = Pista.query.get(id)

    if not my_pista:
        return jsonify({"error": f"pista with id {id} doesn´t exist"}), 404
    
    db.session.delete(my_pista)
    db.session.commit()
    return jsonify({"message":f"pista with id {id} deleted succesfully"})

#------------------------------------------------------------------------------------------------

@api.route('/reservas', methods = ['GET'])
def get_all_reservas():
    reservas = Reserva.query.all()
    
    if not reservas:
        return jsonify({"error": "reservas not found"}), 404
    
    return jsonify([Reserva.serialize() for reserva in reservas]), 200

@api.route('/reservas/<int:id>', methods = ['GET'])
def get_reserva(id):
    my_reserva = Reserva.query.get(id)

    if not my_reserva:
        return jsonify({"error": f"Reserva with id {id} doesn't exist"}), 404
    
    return jsonify(my_reserva.serialize()), 200

@api.route('/reservas', methods = ['POST'])
def create_reserva():
    data = request.get_json()

    if not data.get("id_pista") or not data.get("fecha_reserva") or not data.get("hora_inicio") or not data.get("hora_fin") or not data.get("precio_total") or not data.get("estado"):
        return jsonify({"error": "id pista, fecha reserva, hora de inicio, hora de fin, precio total and estado are required fields"})
    
    new_reserva = Reserva(
        id_pista = data.get("id_pista"),
        fecha_reserva = data.get("fecha_reserva"),
        hora_inicio = data.get("hora_inicio"),
        hora_fin = data.get("hora_fin"),
        precio_total = data.get("precio_total"),
        estado = data.get("estado")
    )

    db.session.add(new_reserva)
    db.session.commit()
    return jsonify({
        "message": "new reserva created succesfully",
        "reserva": new_reserva.serialize()
    }), 201

@api.route('/reservas/<int:id>', methods = ['PUT'])
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

@api.route('/reservas/<int:id>', methods = ['DELETE'])
def delete_reserva(id):
    my_reserva = Reserva.query.get(id)

    if not my_reserva:
        return jsonify({"error": f"reserva with id {id} doesn't exist"}), 404
    
    db.session.delete(my_reserva)
    db.session.commit()
    return jsonify(f"reserva with id: {id} deleted succesfully")

#------------------------------------------------------------------------------------------------

@api.route('/pagos', methods = ['GET'])
def get_all_pagos():
    pagos = Pago.query.all()

    if not pagos:
        return jsonify({"error": "pagos not found"}), 404
    
    return jsonify([Pago.serialize() for pago in pagos]), 200

@api.route('/pagos/<int:id>', methods = ['GET'])
def get_pago(id):
    my_pago = Pago.query.get(id)

    if not my_pago:
        return jsonify({"error": f"pago with id {id} not found"})
    
    return jsonify(my_pago.serialize()), 200

@api.route('/pagos', methods = ['POST'])
def create_pago():
    data = request.get_json()

    if not data.get("metodo_pago") or not data.get("monto_cantidad") or not data.get("estado_pago"):
        return jsonify({"error": "Metodo de pago, monto cantidad and estado del pago are required fields"}), 400

    new_pago = Pago(
        metodo_pago = data.get("metodo_pago"),
        monto_cantidad = data.get("monto_cantidad"),
        estado_pago = data.get("estado_pago")
    )

    db.session.add(new_pago)
    db.session.commit()

    return jsonify({
        "message": "new pago registered",
        "pago": new_pago.serialize()
    })

@api.route('/pagos/<int:id>', methods = ['PUT'])
def update_pago(id):
    pago = Pago.query.get(id)

    if not pago:
        return jsonify({"error": f"pago with id {id} not found"}), 404
    
    data = request.get_json()

    pago.metodo_pago = data.get("metodo_pago", pago.metodo_pago)
    pago.monto_cantidad = data.get("monto_cantidad", pago.monto_cantidad)
    pago.estado_pago = data.get("estado_pago", pago.estado_pago)

    db.session.commit()

    return jsonify({
        "message": f"pago with id {id} updated succesfully",
        "pago updated": pago.serialize()
    })


@api.route('/pagos', methods = ['DELETE'])
def delete_pago(id):
    my_pago = Pago.query.get(id)

    if not my_pago:
        return jsonify({"error": f"pago with id: {id} not found"}), 404
    
    db.session.delete(my_pago)
    db.session.commit()
    return jsonify(f"pago with id {id} deleted succesfully"), 200
    


#------------------------------------------------------------------------------------------------