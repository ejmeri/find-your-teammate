import requests

from bson import ObjectId
from flask import request
from flask.blueprints import Blueprint

from business.shared.api_return import ApiReturn

from business.users.entity.user import User
from business.users.entity.user_auth import UserAuth

from business.users.control.user_repository import UserRepository

userController = Blueprint('user_controller', __name__, url_prefix='/users')


class UserController():

    @userController.route('/csgo')
    def test():
        response = requests.get('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/ejmeri',
                                headers={'TRN-Api-Key': '184f4bb3-d306-4906-a667-d9cb1c99c02d'})

        return response.toJson()

    @userController.post('')
    def create():
        payload = request.json

        if not 'login' in payload.keys():
            return ApiReturn.error('Login obrigatória'), 400

        if not 'password' in payload.keys():
            return ApiReturn.error('Senha obrigatória'), 400

        try:
            user = User(**payload)
        except Exception as error:
            return ApiReturn.error('Erro durante o processamento', str(error)), 500

        userExist = UserRepository.findByLogin(user.login)
        if userExist:
            return ApiReturn.error('Login já cadastrado'), 400

        user.hashPassword()
        UserRepository.create(user.toCreateJson())

        return ApiReturn.success('Usuário salvo com sucesso', str(user._id)), 201

    @userController.get('')
    def findAll():
        usersDb = UserRepository.findAll()
        users: User = []

        for user in usersDb:
            user['_id'] = str(user['_id'])
            users.append(user)

        return ApiReturn.success(response=users), 200

    @userController.get('/<id>')
    def findById(id):
        if ObjectId.is_valid(id) == False:
            return ApiReturn.error('Id inválido'), 400

        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''

        try:
            resp = UserAuth.decode_auth_token(auth_token)
            print(resp)
        except RuntimeError as error:
            return ApiReturn.error('Acesso negado', error), 401

        user = UserRepository.findById(id)
        if user:
            user['_id'] = str(user['_id'])
            return user

        return ApiReturn.error('Usuário não encontrado'), 400