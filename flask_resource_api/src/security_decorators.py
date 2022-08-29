from functools import wraps
from flask import jsonify, request
from ..jwt_functions import decode_token
from ..verify_api_key import compare_keys

access_list =["http://192.168.15.7:3000"]
access_headers_list =["api-key","content-type"]
def valid_token_required (f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Não há token válido.', 'sucess': False ,"code":12401}), 401
        try:
            decoded_payload =decode_token(token)
        except:
            return jsonify({'message': 'Não há token válido.', 'sucess': False , "code":12401}), 401
        return f(decoded_payload, *args, *kwargs)
    return decorated

def valid_api_key_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if(request.method == 'OPTIONS'):
            return jsonify({"msg":"Auth API connected.", "sucess": True, "code":200}), 200, {"Access-Control-Allow-Origin": access_list, "Access-Control-Allow-Headers": access_headers_list, "Access-Control-Allow-Methods": "*", "Access-Control-Allow-Credentials": "true"}
        else:
            pass
        
        provided_api_key = request.headers['api-key']
        
        if compare_keys (provided_api_key):
            return f(*args,**kwargs)
        else:
            return jsonify({"msg":"Falha de autenticação", "success":False, "code":15401})
    return decorated