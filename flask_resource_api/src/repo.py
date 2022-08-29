from ast import literal_eval
import json
from typing import Dict
from flask import jsonify
from ..database import get_db
from datetime import datetime
import bcrypt
from ..jwt_functions import create_token

db = get_db()

def return_stock_price(id):
    stock_price= db.realtime.aggregate([
			{"$match":{"_id":id}},
            {"$project": {"_id":0,  "realtime":1}}
		])
    stock_price= [u for u in stock_price][0]
    return stock_price['realtime']['value']

def update_stock_price(stock_data):
    ativos:Dict = stock_data['ativos']

    for key,value in ativos.items():
        
        current_time=str(datetime.now())
        db.realtime.update_one({"_id":key},{"$set":{
            "realtime":{
                "time":current_time,
                "value": value}
            }},upsert=True
        )
        

def return_stocks_list():
    stocks = db.realtime.find({}, {"realtime.time":0})
    stocks_list = [stock for stock in stocks]
    return stocks_list

def create_user_in_db(user_name, email):
    try:
        newvalues =  { 
            'userName': user_name,
            'email': email,
            'carteira':{
                'saldo': 10000
            } }
        db.users.insert_one(newvalues)
        return jsonify({"msg":"Usuário criado", "sucess": True})
    except:
        return jsonify({"msg":"Usuário não criado", "sucess": False})

def return_user_saldo(email):
    carteira= db.users.aggregate([
			{"$match":{"email":email}},
            {"$project": {"_id":0,  "carteira":1}}
		])
    carteira= [u for u in carteira][0]
    saldo =  carteira['carteira']['saldo']
    try:
        return jsonify({"saldo":saldo, "sucess": True, "code":50200})
    except:
        return jsonify({"msg":"Usuário não criado", "sucess": False, "code":50500})

def _set_historical_close():
    try:
        stocks = db.realtime.find({}, {"realtime.time":0})
        stocks_list = [stock for stock in stocks]
        today = datetime.today().strftime('%Y-%m-%d')
        for stock in stocks_list:
            value = stock['realtime']['value']
            s_id = stock['_id']
            db.stocks.update_one({"_id":s_id},{"$set":{
                "historical":{today:{
                    "close": value}
                }}},upsert=True)
        return jsonify({"sucess": True})
    except:
        return jsonify({"sucess": False})
        