import jwt
from .jwt_secret import get_jwt_secret
from datetime import datetime, timedelta

def decode_token(token):
    payload=jwt.decode(token,get_jwt_secret(),algorithms=['HS512'], verify=True)
    return payload
def create_token(email):
    expiration = datetime.utcnow() + timedelta(days=30)
    secret = get_jwt_secret()
    payload = {
        "email" : email,
        "exp" : expiration,
    }
    token = jwt.encode(payload, secret , algorithm='HS512')
    return token

