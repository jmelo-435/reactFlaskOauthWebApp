from flask import Flask, jsonify, make_response, request,send_from_directory
from ..database import get_db
import os
from ..verify_api_key import compare_keys
from .repo import return_stock_price, update_stock_price, return_stocks_list,_set_historical_close,return_stock_prices_days_ago,update_stocks_relevance, return_stock_data
from .security_decorators import valid_api_key_required

db = get_db()
access_list =["http://192.168.15.7:3000"]

@valid_api_key_required
def test():

    return jsonify({"msg":"Auth API connected.", "sucess": True, "code":200}), 200, {"Access-Control-Allow-Origin": access_list}

@valid_api_key_required
def update_stock ():
    stock_data = request.json
    update_stock_price(stock_data)

    return make_response({"msg":"Preço atualizado", "success": True})


@valid_api_key_required
def get_stock():
    request_data = request.json
    ativo =request_data['_id']
    
    try:
        price =return_stock_price(ativo)
        return make_response({"value":price, "ativo": ativo,"success": True})
    except IndexError:
        return make_response({"msg": "Ativo não encontrado.","success": False}), 500

@valid_api_key_required
def get_stock_data(id):
    
    
        data = return_stock_data(id=id)[0]
        price =data.get('realtime').get('value')
        name = data['name']
        relevance =data['relevance']
        setor = data['setor']
        subSetor = data['subSetor']
        segmento = data['segmento']
        return make_response({"value":price, "ativo": id,"name":name,"relevance":relevance,"setor":setor,"subSetor":subSetor,"segmento":segmento, "success": True})



@valid_api_key_required
def get_stocks_list():
    try:
        stock_list = return_stocks_list()
        return jsonify({"list": stock_list,"success": True})
    except :
        return make_response({"msg": "Algo deu errado.","success": False}), 500

@valid_api_key_required
def get_stocks_list_days_ago(days):
    try:
        stock_list = return_stock_prices_days_ago(days)
        return jsonify({"list": stock_list,"success": True})
    except :
        return make_response({"msg": "Algo deu errado.","success": False}), 500
    
@valid_api_key_required
def update_relevance():
    try:
        list =update_stocks_relevance()
        return jsonify({"success": True, "list":list})
    except :
        return make_response({"msg": "Algo deu errado.","success": False}), 500

@valid_api_key_required
def update_historical_close():
    return _set_historical_close()

def retrieve_stock_image(ativo):
    basedir = os.path.abspath(os.path.dirname(__file__))
    uploads_path = os.path.join(basedir, 'imgStocks')
    return send_from_directory(uploads_path, ativo+".gif")