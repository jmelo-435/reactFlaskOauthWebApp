import jwt
from itsdangerous import URLSafeTimedSerializer
from .env_var import get_jwt_secret
from datetime import datetime, timedelta

def decode_token(token):
    payload=jwt.decode(token,get_jwt_secret(),algorithms=['HS512'], verify=True)
    return payload
def create_token(email):
    expiration = datetime.utcnow() + timedelta(minutes=5)
    secret = get_jwt_secret()
    payload = {
        "email" : email,
        "exp" : expiration,
    }
    token = jwt.encode(payload, secret , algorithm='HS512')
    return token

def create_refresh_token(email,session_id):
    expiration = datetime.utcnow() + timedelta(days=30)
    secret = get_jwt_secret()
    payload = {
        "email" : email,
        "sessionId": session_id,
        "exp" : expiration
    }
    token = jwt.encode(payload, secret , algorithm='HS512')
    return token

def generate_url_token(email):
    serializer = URLSafeTimedSerializer(get_jwt_secret())
    return serializer.dumps(email, salt=get_jwt_secret())

def decode_url_token(token, max_age = None):
    serializer = URLSafeTimedSerializer(get_jwt_secret())
    try:
        email = serializer.loads(
            token,
            salt=get_jwt_secret(),
            max_age= max_age
        )
    except:
        return False
    return email