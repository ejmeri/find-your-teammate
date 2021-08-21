import os
import jwt

from werkzeug.security import check_password_hash


class UserAuth():

    def __init__(self, login: str, password: str):
        self.login: str = login
        self.password: str = password

    def comparePassword(self, pwHash: str):
        return check_password_hash(pwHash, self.password)

    @staticmethod
    def encode_auth_token(user):
        try:
            payload = {
                'user_id': user['id'],
                'login': user['login']
            }
        
            return jwt.encode(
                payload,
                os.getenv('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, os.getenv('SECRET_KEY'), algorithms='HS256')
            return payload
        except jwt.InvalidTokenError:
            print('Invalid token. Please log in again.')
            raise RuntimeError('Invalid token. Please log in again.')
