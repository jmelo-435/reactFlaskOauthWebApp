import os

def get_jwt_secret():
    if os.environ['FLASK_ENV']=='development':
        return 'development_secret'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['JWT_SECRET']

def get_oauth_client_id():
    if os.environ['FLASK_ENV']=='development':
        return '802585832012-jgt4h595tr7464i4d5gf5p2q3ghks60j.apps.googleusercontent.com'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['OAUTH_CLIENT_ID']

def get_oauth_client_secret():
    if os.environ['FLASK_ENV']=='development':
        return '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'
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
        return 'http://localhost/api_res/users'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['CREATE_RESOURCE_USER_ADDRESS']

def get_mailject_api_key():
    if os.environ['FLASK_ENV']=='development':
        return '804213a7439973dabbdf06951772282c'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['MAILJECT_API_KEY']
    
def get_mailject_api_password():
    if os.environ['FLASK_ENV']=='development':
        return 'c2b832a40a187398faedc5195a111744'
    if os.environ['FLASK_ENV']=='production':
        return os.environ['MAILJECT_API_PASSWORD']