from ast import literal_eval
import json
from typing import Dict
from flask import jsonify
from ..database import get_db
import datetime
import bcrypt
from ..jwt_functions import create_token

db = get_db()

def return_stock_price(id):
    stock_price= db.balance.aggregate([
			{"$match":{"_id":id}},
            {"$project": {"_id":0,  "realtime":1,"relevance":1}}
		])
    stock_price= [u for u in stock_price][0]
    return stock_price['realtime']['value']

def update_stock_price(stock_data):
    ativos:Dict = stock_data['ativos']

    for key,value in ativos.items():
        
        current_time=str(datetime.datetime.now())
        db.balance.update_one({"_id":key},{"$set":{
            "realtime":{
                "time":current_time,
                "value": value}
            }},upsert=True
        )
        

def return_stocks_list():
    stocks = db.balance.find({}, {"realtime.value":1,"name":1,"relevance":1})
    stocks_list = [stock for stock in stocks]
    return stocks_list

def update_stocks_relevance():
    one_week_ago = datetime.date.today() - datetime.timedelta(days=8)
        
    stocks_prices_one_week_ago = db.historical.aggregate([
        {'$match':{}},{'$project':{"volume":f"$historical.{one_week_ago}.volume"}}
        ])
    stocks_list = [stock for stock in stocks_prices_one_week_ago]
    for stock in stocks_list:
        try:
            stock['volume']= int(stock['volume'].replace(",",""))
        except:
            stock['volume'] = 0
    stocks_list.sort(key=lambda x: x['volume'], reverse=True)
    for index,stock in enumerate(stocks_list):
        db.balance.update_one({"_id":stock['_id']},{"$set":{
                "relevance":index}},upsert=True)
    return stocks_list
    
        

def return_stock_prices_days_ago(days):
    one_year_ago = datetime.date.today() - datetime.timedelta(int(days))
    if(one_year_ago.weekday()==6 or one_year_ago.weekday()==0):
        one_year_ago = one_year_ago - datetime.timedelta(days=2)
        
    stocks_prices_one_year_ago = db.historical.aggregate([
        {'$match':{}},{'$project':{"priceDaysAgo":f"$historical.{one_year_ago}.adjClose"}}
        ])
    stocks_list = [stock for stock in stocks_prices_one_year_ago]
    
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
        stocks = db.balance.find({"realtime":{"$exists":True}}, {"realtime":1})
        stocks_list = [stock for stock in stocks]
        today = datetime.date.today()
        for stock in stocks_list:
            value = stock['realtime']['value']
            s_id = stock['_id']
            db.historical.update_one({"_id":s_id},{"$set":{
                f"historical.{today}":{
                    "close": value
                }}},upsert=True)
        return jsonify({"sucess": True})
    except:
        return jsonify({"sucess": False})
        