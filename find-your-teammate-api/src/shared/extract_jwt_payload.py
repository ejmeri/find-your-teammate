

from src.shared.api_return import ApiReturn
from src.business.users.entity.user_auth import UserAuth

class ExtractJwtPayload: 
    @staticmethod
    def extract(auth_header):
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''

        try:
            userAuth = UserAuth.decode_auth_token(auth_token)
        except RuntimeError as error:
            return ApiReturn.error('Acesso negado', str(error))           

        if not userAuth['user_id']:
            return ApiReturn.error('Erro na sessão logada, por favor, faça login novamente')

        return userAuth