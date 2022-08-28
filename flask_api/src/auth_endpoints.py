from flask import  jsonify, make_response, render_template, request, Flask, url_for
from uuid import uuid4
from authlib.integrations.flask_client import OAuth
from google.oauth2 import id_token
from google.auth.transport import requests
from .security_decorators import valid_access_token_required, valid_api_key_required, valid_refresh_token_required,valid_refresh_token_required_web
from .repo import create_user_in_db, repo_resend_confirmation_email,verify_user, handle_change_password, create_refresh_token_and_session_token,revoke_session, create_refresh_token_and_session_token_web,confirm_account, handle_send_reset_password_email_request,handle_reset_password, verify_user_web
from ..env_var import get_oauth_client_secret, get_oauth_client_id
app = Flask(__name__)
oauth = OAuth(app)

access_list =["http://192.168.15.7:3000"]
web_headers = {"Access-Control-Allow-Origin": access_list, "Access-Control-Allow-Methods": "*", "Access-Control-Allow-Credentials": "true"}

@valid_api_key_required
def test():

    return jsonify({"msg":"Auth API connected.", "sucess": True, "code":200}), 200, {"Access-Control-Allow-Origin": access_list}

@valid_api_key_required
def create_user():
    provided_user_data = request.json
    
    
    try:
        return create_user_in_db(provided_user_data, origin= "app"), {"Access-Control-Allow-Origin": access_list}
    except:
        return jsonify({"msg":"Usuário não criado", "sucess": False, "code":10500}), 500, {"Access-Control-Allow-Origin": access_list}

@valid_api_key_required
def login():
    provided_user_data= request.json
    session_id = str(uuid4())
    try:
        return verify_user(provided_user_data, session_id), {"Access-Control-Allow-Origin": access_list}
    except:
        return jsonify({"msg":"Não foi possível efetuar o login.", "sucess": False, "code":20500}), 500, {"Access-Control-Allow-Origin": access_list}
    
@valid_api_key_required
def login_web():
    provided_user_data= request.json
    session_id = str(uuid4())
    try:
        return verify_user_web(provided_user_data, session_id),  {"Access-Control-Allow-Origin": access_list, "Access-Control-Allow-Methods": "*", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers":"*"}
    except:
        return jsonify({"msg":"Não foi possível efetuar o login.", "sucess": False, "code":20500}), 500, {"Access-Control-Allow-Origin": access_list}

@valid_api_key_required
@valid_access_token_required
def change_password(decoded_payload):
    provided_user_data= request.json
    user = decoded_payload ['email']
    try:
        return handle_change_password(user,provided_user_data)
    except:
        return jsonify({"msg":"Não foi possível efetuar a solicitação.", "sucess": False, "code":30500}), 500

@valid_api_key_required
@valid_refresh_token_required
def grant_refresh_and_session_token(decoded_payload):
    user = decoded_payload['email']
    session_id = str(uuid4())
    try:
        return create_refresh_token_and_session_token(user,session_id)
    except:
        return jsonify({"msg":"Não foi possível efetuar a solicitação.", "sucess": False,"code":40500}), 500

@valid_api_key_required
@valid_refresh_token_required_web
def grant_refresh_and_session_token_web(decoded_payload):
    user = decoded_payload['email']
    session_id = str(uuid4())
    try:
        return create_refresh_token_and_session_token_web(user,session_id),  {"Access-Control-Allow-Origin": access_list, "Access-Control-Allow-Methods": "*", "Access-Control-Allow-Credentials": "true"}
    except:
        return jsonify({"msg":"Não foi possível efetuar a solicitação.", "sucess": False,"code":40500}), 500, {"Access-Control-Allow-Origin": access_list}

#@valid_api_key_required
def login_google():
    
    
    oauth.register(
    name='google',
    client_id=get_oauth_client_id(),
    client_secret=get_oauth_client_secret(),
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    jwks_uri = "https://www.googleapis.com/oauth2/v3/certs",
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid email profile'},
    )
    google = oauth.create_client('google')
    redirect_uri = url_for('authGoogle', _external=True)
    return google.authorize_redirect(redirect_uri)


def authorize_google():
    try:
        google = oauth.create_client('google')
        token = google.authorize_access_token() 
        resp = google.get('userinfo')
        user_info = resp.json()
        provided_user_data = {
        "userName" : user_info['name'],
        "email": user_info['email']
        
    }
        create_user_in_db(provided_user_data, origin= "google")
        session_id = str(uuid4())
        return create_refresh_token_and_session_token(session_id=session_id, email=user_info['email'])
    except:
        return jsonify({"msg":"Não foi possível efetuar a solicitação.", "sucess": False, "code":70500}), 500

@valid_api_key_required
@valid_refresh_token_required    
def log_out(decoded_payload):
    user = decoded_payload['email']
    try:
        revoke_session(user)
        return jsonify({"msg":"Logout efetuado!", "sucess": True, "needLogin":True, "code":80200}), web_headers
    except:
        return jsonify({"msg":"Não foi possível efetuar a solicitação.", "sucess": False,"code":80500}), 500, web_headers
    
def confirm_email(token):
    try: 
        confirm_account(token)
        return make_response(render_template('email_confirmed.html'))
    except:
        return jsonify({"msg":"Falha na confirmação.", "sucess": False, "code":90500})
    
@valid_api_key_required
def request_reset_password():
    email = request.json ['email']
    return handle_send_reset_password_email_request(email)

@valid_api_key_required
def request_reset_password_web():
    email = request.json ['email']
    return handle_send_reset_password_email_request(email), web_headers
    
def reset_password (token):
    try :
        
        return handle_reset_password(token)
    except:
        return jsonify({"msg":"Falha na conexão.", "sucess": False,"code":60500}), 500
    
@valid_api_key_required
def login_google_token():
    token= request.json['googleToken']
    try:
        user_info = id_token.verify_oauth2_token(token, requests.Request(), get_oauth_client_id())
        provided_user_data = {
        "userName" : user_info['name'],
        "email": user_info['email']
        
    }
        create_user_in_db(provided_user_data, origin= "google")
        session_id = str(uuid4())
        return create_refresh_token_and_session_token(session_id=session_id, email=user_info['email']), web_headers

    except:
        return jsonify({"msg":"Falha na conexão.", "sucess": False, "code":11500}),500, web_headers

@valid_api_key_required
def resend_confirmation_email():
    email = request.json['email']
    try:
        return repo_resend_confirmation_email(email), web_headers
    except:
        return jsonify({"msg":"Falha na conexão.", "sucess": False, "code": 13500}),500, web_headers