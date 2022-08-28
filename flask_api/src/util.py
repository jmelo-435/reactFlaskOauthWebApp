
from ast import Str


def is_valid_password(password:Str):
    if len(password)>7 and any(char.isdigit() for char in password) and any(char.isupper() for char in password) and any(char.islower() for char in password):
        return True
    else:
        return False