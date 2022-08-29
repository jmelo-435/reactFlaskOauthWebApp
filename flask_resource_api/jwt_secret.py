import os

def get_jwt_secret():
    if os.environ['FLASK_ENV']=='development':
        return 'development_secret'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['JWT_SECRET']
