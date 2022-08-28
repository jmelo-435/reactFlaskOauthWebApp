import os
from .database import get_db
import bcrypt


db = get_db()

def compare_keys(key):
#    api_key_hash = db.apiAuth.aggregate([
#			{"$match":{"_id":"apiKey"}},
#           {"$project": {"_id":0,  "hash":1}}
#	])
#    api_key_hash=[u for u in api_key_hash][0]
  api_key_hash = '$2a$12$C6FmFga.nd8OoIE9M95OFeT7tdrTsvXY2eTdoOvTMgAvXf8/.U8uS'
  return bcrypt.checkpw(key.encode(),api_key_hash.encode())