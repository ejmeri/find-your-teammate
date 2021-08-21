from flask import request
from flask.blueprints import Blueprint

from src.shared.api_return import ApiReturn

from src.business.users.entity.user_auth import UserAuth

from src.business.users.control.user_repository import UserRepository

userAuthenticationController = Blueprint(
    'user_authentication_controller', __name__, url_prefix='/users/authentication')


# noinspection PyPep8Naming
class UserAuthenticationController:

    @userAuthenticationController.post('')
    def authenticate():
        payload = request.json

        if not 'login' in payload.keys():
            return ApiReturn.error('Login obrigatório'), 400

        if not 'password' in payload.keys():
            return ApiReturn.error('Senha obrigatória'), 400

        userAuth = UserAuth(**payload)

        userDb = UserRepository.findByLogin(userAuth.login)
        if not userDb:
            return ApiReturn.error('Login não encontrado'), 400

        if userAuth.comparePassword(userDb['password']):
            authToken = UserAuth.encode_auth_token(
                {'login': userDb['login'], 'id': str(userDb['_id'])})
            return ApiReturn.success(
                response=authToken), 200

        return ApiReturn.error('Senha incorreta'), 400
