from src.business.players.stats.player_stats_service import PlayerStatsService
from src.business.players.control.player_repository import PlayerRepository
from src.business.users.entity.user import User
from src.business.users.control.user_repository import UserRepository


from src.shared.api_return import ApiReturn
from src.business.users.entity.user_new import UserNew
from src.business.players.entity.player_info import Player


class UserService:
    def createUser(payload):
        try:
            userNew = UserNew(**payload)
            if not userNew.validate:
                return ApiReturn.error('Erro durante o processamento'), 400

        except Exception as error:
            return ApiReturn.error('Erro durante o processamento', str(error)), 500

        userExist = UserRepository.findByLogin(userNew.login)
        if userExist:
            return ApiReturn.error('Login já cadastrado'), 400

        user = User(userNew.login, userNew.password)
        user.hashPassword()

        try:
            UserRepository.create(user.toCreateJson())
        except Exception as error:
            return ApiReturn.error('Erro durante a criação do usuário, por favor, tente novamente', str(error)), 500

        player = Player(userId=user._id, name=userNew.name,
                        rank=userNew.rank, steamUserId=userNew.steamId)
        player.buildSteamUrl()

        PlayerRepository.create(player.toCreateJson())

        statsPersonal = PlayerStatsService.findPersonalStats(
            player.steamUserId)
        if 'internalError' in statsPersonal.keys():
            return ApiReturn.success("Usuário salvo com sucesso, porém sem estatísticas salvas. Mantenha seu perfil público", str(statsPersonal)), 400

        avatarProfileImage = statsPersonal['data']['platformInfo']['avatarUrl']
        stats = {
            'kills': statsPersonal['data']['segments'][0]['stats']['kills']['displayValue'],
            'deaths': statsPersonal['data']['segments'][0]['stats']['deaths']['displayValue'],
            'kd': statsPersonal['data']['segments'][0]['stats']['kd']['displayValue']
        }

        PlayerRepository.updateInfo(player._id, avatarProfileImage, stats)

        return ApiReturn.success('Usuário salvo com sucesso', str(user._id)), 201
