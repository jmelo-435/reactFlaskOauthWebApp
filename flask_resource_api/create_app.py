from flask import Flask

from .src.stocks_endpoints import get_stock, get_stocks_list, update_stock,update_historical_close,test,get_stocks_list_days_ago,update_relevance,retrieve_stock_image,get_stock_data
from .src.user_endpoints import create_user,get_user_saldo
application = Flask(__name__)
application.debug = True


application.add_url_rule('/api_res', 'test', test, methods=['OPTIONS','GET'])
application.add_url_rule('/api_res/stocks', 'up', update_stock, methods=['POST'])
application.add_url_rule('/api_res/stocks', 'gt', get_stock, methods=['GET'])
application.add_url_rule('/api_res/stocks/list', 'gtList', get_stocks_list, methods=['OPTIONS','GET'])
application.add_url_rule('/api_res/stocks/update/relevance', 'updateRelevance', update_relevance, methods=['OPTIONS','POST'])
application.add_url_rule('/api_res/stocks/<days>', 'gtListOneYearAgo', get_stocks_list_days_ago, methods=['OPTIONS','GET'])
application.add_url_rule('/api_res/stocks/<id>', 'gtStockData', get_stock_data, methods=['OPTIONS','GET'])
application.add_url_rule('/api_res/stocks/image/<ativo>', 'gtAtivoImg', retrieve_stock_image, methods=['OPTIONS','GET'])
application.add_url_rule('/api_res/users', 'ctUser', create_user, methods=['GET'])
application.add_url_rule('/api_res/user/saldo', 'userSaldo', get_user_saldo, methods=['GET'])
application.add_url_rule('/api_res/stocks/historical_update', 'histUpdate',update_historical_close, methods=['GET'])


    
    #ENVIRONMENT_DEBUG = False
    #ENVIRONMENT_PORT = "8000"
    #application.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)
    
if __name__ == '__main__':
    application.run()