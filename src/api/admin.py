
import os
from flask_admin import Admin
from .models import db, User, Club, Pista, Reserva
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class Reservas(ModelView):
        form_columns = ['id', 'id_pista', 'id_usuario',
                        'fecha_reserva', 'hora_inicio', 'hora_fin', 'precio_total']

    class ClubsView(ModelView):
        form_columns = ['id', 'nombre', 'cif', 'direccion', 'email', 'telefono',
                        'hora_apertura', 'hora_cierre']
        
    class PistaView(ModelView):
        form_columns = ['id', 'id_club', 'numero_pista', 'superficie', 'precio_hora', 'estado_pista']

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ClubsView(Club, db.session))
    admin.add_view(PistaView(Pista, db.session)) 
    admin.add_view(Reservas(Reserva, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
