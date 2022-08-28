import pymongo
from .env_var import get_db_string


def get_db():
    
    client = pymongo.MongoClient(get_db_string())
    db_name =  "fakeTrade"
    db = client[db_name]
    return db