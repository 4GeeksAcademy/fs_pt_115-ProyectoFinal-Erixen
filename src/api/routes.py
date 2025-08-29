"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from models import User, Club, Pista, Reserva, Pago

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

@api.routes('/users', methods = ['GET'])
def get_all_users():
    users = User.query.all()
    if not users:
        return jsonify({"msg": "ERROR"}), 404
    return jsonify([user.serialize() for user in users]), 200  

@api.routes('/users/<int:id>', methods = ['GET'])
def get_user(id):
    unique_user = User.query.get(id)
    if not unique_user:
        return ({"message": "User not found, try with other user."}), 404
    return jsonify([user.serialize()]), 200

@api.routes('/users', methods = ['POST'])
def create_user():
    data = request.get_json()
    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Name, Email and Password are required"})
    
    new_user = User(

        name = data["name"],
        email = data["email"],
        password = data["password"]
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201

@api.routes("/users/<int:id>", methods = ['DELETE'])
def delete_user(id):
    my_user = User.query.get(id)
    if not my_user:
        return jsonify({"error": "inexistent user"})
    
    db.session.delete(my_user)
    db.session.commit()
    return jsonify({"message", f"User id {id} deleted succesfully"})

#------------------------------------------------------------------------------------------------

@api.routes('/clubs', methods = ['GET'])
def get_all_clubs():
    clubs= Club.query.all()
    if not clubs:
        return jsonify({"message": "ERROR"}), 404
    return jsonify([club.serialize() for club in clubs]), 200


@api.routes('/clubs/<int:id>', methods = ['GET'])
def get_club(id):
    unique_club = Club.query.get(id)
    if not unique_club:
        return({"message": "Club not found, try with other club."}), 404
    return jsonify([club.serialize()]), 200

@api.routes('/clubs', methods = ['POST'])
def create_club():
    data = request.get_json()
    if not data("email") or not data("password") or not data("cif_nif"):
        return jsonify({"message": "Email, Password and CIF/NIF are required."}), 404
    
    new_club = Club(

        email = data["email"],
        password = data["password"],
        cif = data["cif_nif"]
    )

    db.session.add(new_club)
    db.session.commit()
    return jsonify(new_club.serialize())

@api.routes('/clubs/<int:id>', methods = ['DELETE'])
def delete_club(id):
    my_club = Club.query.get(id)

    if not my_club:
        return jsonify({"error": f"club with id {id} doesn´t exist"})
    
    db.session.delete(my_club)
    db.session.commit()
    return jsonify({"message": f"club with id {id} deleted"})
    

#------------------------------------------------------------------------------------------------

@api.routes('/pistas', methods = ['GET'])
def get_all_pistas():
    pistas = Pista.query.all()
    if not pistas:
        return jsonify({"message": "ERROR"}), 404
    return jsonify([pista.serialize() for pista in pistas]), 200

@api.routes('/pistas/<int:id>', methods = ['GET'])
def get_pista(id):
    unique_pista = Pista.query.get(id)
    if not unique_pista:
        return jsonify({"message": "Pista not found, try with other pista."})
    return jsonify([pista.serialize()]), 200

@api.routes('/pistas/<int:id>', methods = ['DELETE'])
def delete_pista(id):
    my_pista = Pista.query.get(id)

    if not my_pista:
        return jsonify({"error": f"pista with id {id} doesn´t exist"})
    
    db.session.delete(my_pista)
    db.session.commit()
    return jsonify({"message":f"pista with id {id} deleted succesfully"})

#------------------------------------------------------------------------------------------------

