from flask.blueprints import Blueprint
from flask import request

from src.shared.api_return import ApiReturn
from src.business.players.control.player_info_repository import PlayerRepository

from src.business.users.entity.user_auth import UserAuth
from src.business.players.entity.player_info import Player


playerController = Blueprint('player_controller', __name__, url_prefix='/players')


class PlayerController():
    
    @playerController.post('')
    def create():
        payload = request.json

        if not 'mainPosition' in payload.keys():
            return ApiReturn.error('A posição principal é obrigatória'), 400

        if not 'steamUser' in payload.keys():
            return ApiReturn.error('Id Steam é obrigatório'), 400

        if not 'name' in payload.keys():
            return ApiReturn.error('Nome é obrigatório'), 400

        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''

        try:
            userAuth = UserAuth.decode_auth_token(auth_token)
        except RuntimeError as error:
            return ApiReturn.error('Acesso negado', str(error)), 401            

        if not userAuth['user_id']:
            return ApiReturn.error('Erro na sessão logada, por favor, faça login novamente'), 400

        payload['userId'] = userAuth['user_id']
        try:
            player = Player(**payload)
        except Exception as error:
            return ApiReturn.error('Erro durante o processamento', str(error)), 500

        hasPlayer = PlayerRepository.findByUserId(player.userId)
        if hasPlayer:
            return ApiReturn.error('Jogador já cadastrado'), 400

        player.buildSteamUrl()

        PlayerRepository.create(player.toCreateJson())

        return ApiReturn.success('Informações salvas com sucesso', str(player._id)), 201


    @playerController.get('/info')
    def info():
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''

        try:
            userAuth = UserAuth.decode_auth_token(auth_token)
        except RuntimeError as error:
            return ApiReturn.error('Acesso negado', str(error)), 401            

        if not userAuth['user_id']:
            return ApiReturn.error('Erro na sessão logada, por favor, faça login novamente'), 400

        player = PlayerRepository.findByUserId(userAuth['user_id'])
        if player:
            player['_id']=str(player['_id'])
            player['userId']=str(player['userId'])
            
            return ApiReturn.success(None, player), 200

        return ApiReturn.success('Jogador não encontrado'), 200