import os

def get_jwt_secret():
    if os.environ['FLASK_ENV']=='development':
        return 'development_secret'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['JWT_SECRET']

def get_oauth_client_id():
    if os.environ['FLASK_ENV']=='development':
        return 'google_key.apps.googleusercontent.com'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['OAUTH_CLIENT_ID']

def get_oauth_client_secret():
    if os.environ['FLASK_ENV']=='development':
        return 'google_secret'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['OAUTH_CLIENT_SECRET']
    
def get_api_key():
    if os.environ['FLASK_ENV']=='development':
        return "_zUYQ83k!x34%nh("
    if os.environ['FLASK_ENV']=='production':
        return os.environ['API_KEY']

def get_app_secret_key():
    if os.environ['FLASK_ENV']=='development':
        return 'APP_SECRET_KEY'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['APP_SECRET_KEY']
    
def get_create_resource_user_address():
    if os.environ['FLASK_ENV']=='development':
        return 'http://flask-resource:5001/api_res/users'
    if os.environ['FLASK_ENV']=='production':
    #    return os.environ ['CREATE_RESOURCE_USER_ADDRESS']
        return  'http://flask-resource:5001/api_res/users'
    

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
