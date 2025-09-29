
import os
from flask_admin import Admin
from .models import db, User, Club, Pista, Reserva, Contacto
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class UserView(ModelView):
        form_columns = ['id', 'nombre', 'apellidos', 'email', 'password_hash', 'telefono']
        
    class ClubView(ModelView):
        form_columns = ['id', 'nombre', 'email', 'password_hash', 'direccion', 'telefono', 'hora_apertura', 'hora_cierre']
        
    class PistaView(ModelView):
        form_columns = ['id', 'id_club', 'numero_pista', 'superficie', 'precio_hora', 'estado_pista']

    class ReservaView(ModelView):
        form_columns = ['id', 'id_usuario', 'id_pista', 'fecha_reserva', 'hora_inicio', 'hora_fin']

    class ContactoView(ModelView):
        form_columns = ['id', 'id_usuario', 'id_club', 'texto']

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(UserView(User, db.session))
    admin.add_view(ClubView(Club, db.session))
    admin.add_view(PistaView(Pista, db.session)) 
    admin.add_view(ReservaView(Reserva, db.session))
    admin.add_view(ContactoView(Contacto, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
