import pymongo


def get_db():
    
    client = pymongo.MongoClient("mongodb://mongoD:27017")
    db_name =  "fakeTrade"
    db = client[db_name]
    return db