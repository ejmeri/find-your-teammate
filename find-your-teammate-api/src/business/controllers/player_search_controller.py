from src.business.players.entity.player_info import Player
from src.business.players.control.player_repository import PlayerRepository
from flask import request
from flask.blueprints import Blueprint

from src.shared.api_return import ApiReturn
from src.shared.extract_jwt_payload import ExtractJwtPayload

playerSearchController = Blueprint(
    'player_searchs_controller', __name__, url_prefix='/players/search')


class PlayerSearchController:
    @playerSearchController.get('')
    def search():
        auth_user = ExtractJwtPayload.extract(
            request.headers.get('Authorization'))
        if 'internalError' in auth_user.keys():
            return auth_user, 401

        rankFilter = request.args.get('rank')

        playersDb = PlayerRepository.findPlayers(rankFilter)
        players: Player =  []

        for player in playersDb:
            player['_id'] = str(player['_id'])
            player['userId'] = str(player['userId'])
            players.append(player)

        return ApiReturn.success(response=players), 200