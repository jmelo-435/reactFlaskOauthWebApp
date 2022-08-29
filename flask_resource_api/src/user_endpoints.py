from flask import request,jsonify
from .security_decorators import valid_api_key_required, valid_token_required
from .repo import create_user_in_db, return_user_saldo
from ..database import get_db

db =get_db()

@valid_api_key_required
def create_user():
    user_data = request.json
    user_name = user_data['userName']
    email = user_data['email']
    return create_user_in_db(user_name,email)

@valid_api_key_required
@valid_token_required
def get_user_saldo(decoded_payload):
    user = decoded_payload['email']
    
    return return_user_saldo(user)