

from flask import request
from flask.blueprints import Blueprint

from src.shared.api_return import ApiReturn
from src.shared.extract_jwt_payload import ExtractJwtPayload

from src.business.players.stats.player_stats_service import PlayerStatsService


playerStatsController = Blueprint(
    'player_stats_controller', __name__, url_prefix='/players/<id>/stats/<steamId>')


class PlayerStatsController:
    @playerStatsController.get('/personal')
    def findPersonalStats(id, steamId: str):
        if id is None:
            return ApiReturn.error('Identificação do jogador inválida '), 400

        if steamId is None:
            return ApiReturn.error('Steam Id inválido'), 400

        auth_user = ExtractJwtPayload.extract(
            request.headers.get('Authorization'))
        if 'internalError' in auth_user.keys():
            return auth_user, 401

        statsPersonal = PlayerStatsService.findPersonalStats(steamId)
        if 'internalError' in statsPersonal.keys():
            return ApiReturn.success("Erro durante atualizaçaõ do perfil. Mantenha seu perfil na steam público", str(statsPersonal)), 400

        return ApiReturn.success(response=statsPersonal['data']['segments'][0]['stats']), 200

    @playerStatsController.get('/weapons')
    def findWeaponStats(id, steamId: str):
        if id is None:
            return ApiReturn.error('Identificação do jogador inválida '), 400

        if steamId is None:
            return ApiReturn.error('Steam Id inválido'), 400

        auth_user = ExtractJwtPayload.extract(
            request.headers.get('Authorization'))
        if 'internalError' in auth_user.keys():
            return auth_user, 401

        return PlayerStatsService.findWeaponsStats(steamId)

    @playerStatsController.get('/maps')
    def findMapsStats(id, steamId: str):
        if id is None:
            return ApiReturn.error('Identificação do jogador inválida '), 400

        if steamId is None:
            return ApiReturn.error('Steam Id inválido'), 400


        auth_user = ExtractJwtPayload.extract(
            request.headers.get('Authorization'))
        if 'internalError' in auth_user.keys():
            return auth_user, 401

        return PlayerStatsService.findMapsStats(steamId)
