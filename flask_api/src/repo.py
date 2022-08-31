import random
import string
from flask import jsonify, make_response, render_template, url_for
from ..database import get_db
import bcrypt
import requests
from ..env_var import get_create_resource_user_address,get_mailject_api_key,get_mailject_api_password, get_api_key
from .util import is_valid_password
from ..jwt_functions import create_token, create_refresh_token, generate_url_token, decode_url_token
from mailjet_rest import Client



mailjet = Client(auth=(get_mailject_api_key(), get_mailject_api_password()), version='v3.1')
db = get_db()
access_list =["http://192.168.15.7:3000"]
def send_reset_password_email(email):
    
    token = generate_url_token(email)
    reset_url = "faketrade.online/api_auth/user/password/"+token
    html = render_template('reset_password_email.html', reset_url = reset_url, nome = email)
    data = {
  'Messages': [
    {
      "From": {
        "Email": "facilisteapp@gmail.com",
        "Name": "Fake Trade"
      },
      "To": [
        {
          "Email": email,
          "Name": "You"
        }
      ],
      "Subject": "Redefinição de senha",
      "TextPart": "Solicitação de redefinição de senha.",
      "HTMLPart": html
    }
  ]
}
    result = mailjet.send.create(data=data)

def repo_resend_confirmation_email(email):
    if user_confirmation_check(email):
        return jsonify({"msg":"Esse email já foi confirmado.", "sucess": False, "code":13409})
    else:
        send_confirmation_email(email)
        return jsonify({"msg":"Email de confirmação enviado.", "sucess": True, "code": 13200}) 
    

def send_confirmation_email(email):
    token = generate_url_token(email)
    confirm_url = "faketrade.online/api_auth/user/email/"+token
    html = render_template('confirmation_email.html', confirm_url=confirm_url, aplicativo = "Fake Trade")
    data = {
  'Messages': [
    {
      "From": {
        "Email": "facilisteapp@gmail.com",
        "Name": "Fake Trade"
      },
      "To": [
        {
          "Email": email,
          "Name": "You"
        }
      ],
      "Subject": "Confirmação de E-mail",
      "TextPart": "Confirme o e-mail de sua conta",
      "HTMLPart": html
    }
  ]
}
    result = mailjet.send.create(data=data)

def confirm_account(token):
    email = decode_url_token(token)
    myquery = { "email": email }
    newvalues = { "$set": { 
        "confirmed":True } }
    db.users.update_one(myquery,newvalues, upsert=True)

def create_resource_user(user_name, email):
    try:
        user_data = {"userName": user_name, "email": email}
        response = requests.get(url=get_create_resource_user_address(), json=user_data, headers={"api-key":get_api_key()})
        status = response.json()['sucess']
        return status
    except:
        return False
def create_auth_user(provided_user_data,origin):
    name = provided_user_data['userName']
    email = provided_user_data['email']
    if 'password' not in provided_user_data and origin == 'app' :
        return jsonify({"msg":"Forneça uma senha.", "sucess": False, "code": 10402})
    if  'password'  in provided_user_data:
        password = provided_user_data['password']
        if is_valid_password(password):
            password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        else :
            return jsonify({"msg":"A senha deve ser composta por números, letras maiúsculas e minúsculas, e conter pelo menos 8 dígitos.", "sucess": False, "code": 10404})
    else: 
        password = None
        password_hash = None
    myquery = { "email": email }
    newvalues = { "$set": { 
        'userName': name,
        'pwHash': password_hash,
        'email': email,
        'confirmed':False} }
    db.users.update_one(myquery,newvalues, upsert=True)
    if origin == 'app':
        send_confirmation_email(email)
    return jsonify({"msg":"Usuário criado", "sucess": True, "code": 10200})

def create_user_in_db(provided_user_data, origin):
    
    name = provided_user_data['userName']
    email = provided_user_data['email']
    if len(list(db.users.find({"email": email})))>0 and origin == 'google':
        return
    if len(list(db.users.find({"email": email})))>0 and origin == 'app':
        return jsonify({"msg":"Esse email já está sendo utilizado.", "sucess": False, "code":10409})
    if create_resource_user(user_name=name, email=email):
        return create_auth_user(provided_user_data,origin)
    else:
        return jsonify({"msg":"Falha na conexão.", "sucess": False, "code":10501})

def verify_user (provided_user_data, session_id):
    email = provided_user_data['email']
    password = provided_user_data['password']
    
    try:
        saved=db.users.aggregate([
			{"$match":{"email":email}},{"$project": {"_id":0,  "email":1, "pwHash":1}}])
        saved = [u for u in saved][0]
    except:
        return jsonify({"msg":"Usuário não encontrado ou senha incorreta!", "success":False, "data":None, "code":20404})
    if bcrypt.checkpw(password.encode(), saved['pwHash'].encode()):
        if user_confirmation_check(email)!= True:
            return jsonify({"msg":"Email não confirmado.", "sucess": False, "code": 20409})
        myquery = { "email": email }
        newvalues = { "$set": { "sessionId": session_id, "active": True } }
        db.sessions.update_one(myquery,newvalues, upsert=True)
        refresh_token = create_refresh_token(saved['email'], session_id=session_id)
        access_token = create_token(email)
        return jsonify({"msg":"Login realizado!", "success":True, "bearerData": refresh_token, "accessData": access_token, "code":10200})
    else:
        return jsonify({"msg":"Usuário não encontrado ou senha incorreta!", "success":False, "data":None, "code":20404})

def verify_user_web (provided_user_data, session_id):
    email = provided_user_data['email']
    password = provided_user_data['password']
    
    try:
        saved=db.users.aggregate([
			{"$match":{"email":email}},{"$project": {"_id":0,  "email":1, "pwHash":1}}])
        saved = [u for u in saved][0]
    except:
        return jsonify({"msg":"Usuário não encontrado ou senha incorreta!", "success":False, "data":None, "code":20404})
    if bcrypt.checkpw(password.encode(), saved['pwHash'].encode()):
        if user_confirmation_check(email)!= True:
            return jsonify({"msg":"Email não confirmado.", "sucess": False, "code": 20409})
        myquery = { "email": email }
        newvalues = { "$set": { "sessionId": session_id, "active": True } }
        db.sessions.update_one(myquery,newvalues, upsert=True)
        refresh_token = create_refresh_token(saved['email'], session_id=session_id)
        access_token = create_token(email)
        resp = make_response(jsonify({"msg":"Login realizado!", "success":True,"accessData": access_token, "code":10200}))
        resp.set_cookie("bearerData", refresh_token,httponly=True)
        
        return resp 
    else:
        return jsonify({"msg":"Usuário não encontrado ou senha incorreta!", "success":False, "data":None, "code":20404})
    
def revoke_session(user):
    db.sessions.delete_many({"email":user})

def user_confirmation_check(email):
    saved=db.users.aggregate([
		{"$match":{"email":email}},{"$project": {"_id":0, "confirmed":1}}])
    saved = [u for u in saved][0]
    confirmed = saved['confirmed']
    return confirmed

def handle_change_password(user, provided_user_data):
    new_password = provided_user_data['newPassword']
    old_password = provided_user_data['oldPassword']
    
    try:
        saved=db.users.aggregate([
			{"$match":{"email":user}},{"$project": {"_id":0,  "email":1, "pwHash":1}}])
        saved = [u for u in saved][0]
    except:
        return jsonify({"msg":"Usuário não encontrado ou senha incorreta!", "success":False, "data":None, "code":30404})
    if bcrypt.checkpw(old_password.encode(), saved['pwHash'].encode()):
        password_hash = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
        db.users.update_one ({"email": user}, {"$set":{
            "pwHash": password_hash
            }},upsert=True
        )
        revoke_session(user)
        return jsonify({"msg":"Senha alterada!", "success":True, "needLogin":True, "code":30200})
    else:
        return jsonify({"msg":"Usuário não encontrado ou senha incorreta!", "success":False, "data":None,"code":30404})

def handle_reset_password(token):
    email = decode_url_token(token, max_age=3600)
    if email != False:
        new_password = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(8))
        password_hash = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
        db.users.update_one ({"email": email}, {"$set":{
        "pwHash": password_hash
        }},upsert=True
        )
        revoke_session(email)
        return make_response(render_template('password_reseted.html', new_password= new_password))
    else :
        return make_response(render_template('password_reset_expired.html'))

def create_refresh_token_and_session_token(email, session_id):
    myquery = { "email": email }
    newvalues = { "$set": { "sessionId": session_id, "active": True  } }
    try:
        db.sessions.update_one(myquery,newvalues, upsert=True)
        refresh_token =create_refresh_token(email=email, session_id=session_id)
        access_token = create_token(email)
        return jsonify({"msg":"Sessão criada!", "success":True, "bearerData": refresh_token, "accessData": access_token, "code":20200} )
    except:
        return jsonify({"msg":"Falha na criação da sessão!", "success":False,"code":20501})
    
def create_refresh_token_and_session_token_web(email, session_id):
    myquery = { "email": email }
    newvalues = { "$set": { "sessionId": session_id, "active": True  } }
    try:
        db.sessions.update_one(myquery,newvalues, upsert=True)
        refresh_token =create_refresh_token(email=email, session_id=session_id)
        access_token = create_token(email)
        resp = make_response(jsonify({"msg":"Sessão criada!", "success":True,"accessData": access_token, "code":20200} ))
        resp.set_cookie("bearerData",refresh_token)
        return resp
    except:
        return jsonify({"msg":"Falha na criação da sessão!", "success":False,"code":20501})

def verify_session(session_id):
    
    try:
        session=db.sessions.aggregate([
			{"$match":{"sessionId":session_id}},{"$project": {"active":1}}])
        session = [u for u in session][0]
        active = session['active']
        return active
    except:
        return False

def handle_send_reset_password_email_request(email):
    if len(list(db.users.find({"email": email})))==0 :
        return jsonify({"msg":"Esse usuário não existe.", "sucess": False, "code":50404})
    else:
        try :
            send_reset_password_email(email)
            return jsonify({"msg":"E-mail enviado!", "sucess": True, "code":50200})
        except:
            return jsonify({"msg":"Falha na conexão.", "sucess": False, "code":50500})