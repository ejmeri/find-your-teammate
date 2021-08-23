from src.shared.extract_jwt_payload import ExtractJwtPayload
from flask.blueprints import Blueprint
from flask import request

from src.shared.api_return import ApiReturn
from src.business.players.control.player_repository import PlayerRepository
from src.business.players.stats.player_stats_service import PlayerStatsService

from src.business.users.entity.user_auth import UserAuth
from src.business.players.entity.player_info import Player


playerController = Blueprint(
    'player_controller', __name__, url_prefix='/players')


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

        auth_user = ExtractJwtPayload.extract(
            request.headers.get('Authorization'))
        if isinstance(auth_user, ApiReturn):
            return auth_user

        payload['userId'] = auth_user['user_id']
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
        auth_user = ExtractJwtPayload.extract(request.headers.get('Authorization'))
        if isinstance(auth_user, ApiReturn):
            return auth_user

        player = PlayerRepository.findByUserId(auth_user['user_id'])
        if player:
            player['_id'] = str(player['_id'])
            player['userId'] = str(player['userId'])

            return ApiReturn.success(None, player), 200

        return ApiReturn.success('Jogador não encontrado'), 200

    @playerController.put('')
    def updateProfile():
        auth_user = ExtractJwtPayload.extract(request.headers.get('Authorization'))
        if isinstance(auth_user, ApiReturn):
            return auth_user

        payload = request.json

        try:
            player = Player(**payload)
        except Exception as error:
            return ApiReturn.error('Erro durante o processamento', str(error)), 500            
        
        statsPersonal = PlayerStatsService.findPersonalStats(
            player.steamUserId)
        if 'internalError' in statsPersonal.keys():
            return ApiReturn.success("Erro durante atualizaçaõ do perfil. Mantenha seu perfil na steam público", str(statsPersonal)), 400

        avatarProfileImage = statsPersonal['data']['platformInfo']['avatarUrl']
        stats = {
            'kills': statsPersonal['data']['segments'][0]['stats']['kills']['displayValue'],
            'deaths': statsPersonal['data']['segments'][0]['stats']['deaths']['displayValue'],
            'kd': statsPersonal['data']['segments'][0]['stats']['kd']['displayValue']
        }

        player.avatarProfileImage = avatarProfileImage 
        player.stats = stats

        PlayerRepository.update(player)

        return ApiReturn.success('Perfil atualizado com sucesso', True), 200