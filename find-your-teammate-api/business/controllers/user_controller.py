import requests

from bson import ObjectId
from flask import request
from flask.blueprints import Blueprint

from business.shared.api_return import ApiReturn

from business.users.control.user_repository import UserRepository
from business.users.entity.user import User

userView = Blueprint('user_controller', __name__)

class UserController():

    @userView.route('/csgo')
    def test():
        response = requests.get('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/ejmeri',
                                headers={'TRN-Api-Key': '184f4bb3-d306-4906-a667-d9cb1c99c02d'})

        return response.toJson()

    @userView.post('/users')
    def create():
        payload = request.json

        if not 'email' in payload.keys():
            return ApiReturn.error('Email obrigatório'), 400

        if not 'login' in payload.keys():
            return ApiReturn.error('Login obrigatória'), 400            

        if not 'password' in payload.keys():
            return ApiReturn.error('Senha obrigatória'), 400
        
        user = User(**payload)

        userExist = UserRepository.findByLogin(user.login)
        if userExist:
            return ApiReturn.error('Login já cadastrado'), 400

        UserRepository.create(user.toJson())
        
        return ApiReturn.successWithResponse('Usuário salvo com sucesso', str(user._id)), 201

    @userView.get('/users')
    def findAll():
        usersDb = UserRepository.findAll()
        users: User = []
        
        for user in usersDb:
            user['_id'] = str(user['_id'])
            users.append(user)

        return ApiReturn.successWithResponse(response=users), 200  

    @userView.get('/users/<id>')
    def findById(id):
        if ObjectId.is_valid(id) == False:
            return ApiReturn.error('Id inválido'), 400

        user = UserRepository.findById(id)

        if user:
            user['_id'] = str(user['_id'])
            return user
            
        return ApiReturn.error('Usuário não encontrado'), 400   
        
        