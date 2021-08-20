import app
import jwt

from bson import objectid
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User():
    
    def __init__(self, email, login, password):
        self._id = objectid.ObjectId()
        self.email: str = email
        self.login: str = login
        self.password: str = password
        self.active: bool = True;
        self.createDate: datetime = datetime.utcnow()

    def hashPassword(self):
        self.password = generate_password_hash(self.password)

    @staticmethod
    def encode_auth_token(user_id):
        try:
            payload = {
                'user_id': user_id
            }
            return jwt.encode(
                payload,
                app.JWT_TOKEN,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    def toCreateJson(self):
        return {
            '_id': self._id,
            'login': self.login,
            'password': self.password,
            'email': self.email,
            'active': self.active,
            'createDate': self.createDate
        }