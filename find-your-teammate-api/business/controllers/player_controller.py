from business.users.entity.user_auth import UserAuth
from business.players.control.player_info_repository import PlayerRepository
from business.players.entity.player_info import Player
from flask import request
from flask.blueprints import Blueprint

from business.shared.api_return import ApiReturn

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

        # if not 'userId' in payload.keys():
        #     return ApiReturn.error('UserId é obrigatório'), 400

        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''

        try:
            userAuth = UserAuth.decode_auth_token(auth_token)
        except RuntimeError as error:
            return ApiReturn.error('Acesso negado', error), 401            

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
