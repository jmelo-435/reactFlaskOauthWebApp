import os

def get_jwt_secret():
    if os.environ['FLASK_ENV']=='production':
        return os.environ['JWT_SECRET']

def get_oauth_client_id():
    if os.environ['FLASK_ENV']=='production':
        return os.environ['OAUTH_CLIENT_ID']

def get_oauth_client_secret():

    if os.environ['FLASK_ENV']=='production':
        return os.environ['OAUTH_CLIENT_SECRET']

def get_api_key():
    if os.environ['FLASK_ENV']=='development':
        return "_zUYQ83k!x34%nh("
    if os.environ['FLASK_ENV']=='production':
        return os.environ['API_KEY']

def get_app_secret_key():
    
    if os.environ['FLASK_ENV']=='production':
        return os.environ['APP_SECRET_KEY']

def get_db_string():
    
    if os.environ['FLASK_ENV']=='production':
        return os.environ['FAKETRADE_MONGO_STRING']

def get_create_resource_user_address():
    if os.environ['FLASK_ENV']=='development':
        return 'http://api-api-1:5000/api/users'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['CREATE_RESOURCE_USER_ADDRESS']

def get_mailject_api_key():
    if os.environ['FLASK_ENV']=='development':
        return 'mailject_key'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['MAILJECT_API_KEY']
    
def get_mailject_api_password():
    if os.environ['FLASK_ENV']=='development':
        return 'mailject_pass'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['MAILJECT_API_PASSWORD']
