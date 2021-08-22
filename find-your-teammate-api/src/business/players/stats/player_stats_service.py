import os

import requests
from src.shared.api_return import ApiReturn


class PlayerStatsService:
    @staticmethod
    def findPersonalStats(steamId: str):
        url_api: str = str(os.environ['TRACKER_URL_API'])
        url: str = url_api + str('/standard/profile/steam/' + steamId)
        stats = requests.get(
            url, headers={'TRN-Api-Key': os.getenv('TRACKER_TOKEN')})

        print(str(stats))
        
        if stats.status_code is 200:
            return stats.json()
        else:
            return ApiReturn.error('Não foi possível carregas as estatísticas', str(stats))

    @staticmethod
    def findWeaponsStatus(steamId: str):
        url_api: str = os.environ['TRACKER_URL_API']
        url: str = url_api + str('/standard/profile/steam/') + \
            steamId + str('/segments/weapon')
        stats = requests.get(
            url, headers={'TRN-Api-Key': os.getenv('TRACKER_TOKEN')})

        if stats.status_code is 200:
            return ApiReturn.success(response=stats.json()), 200
        else:
            return ApiReturn.error('Não foi possível carregas as estatísticas das armas', stats.json()), 200

    @staticmethod
    def findMapsStats(steamId: str):
        url_api: str = os.getenv('TRACKER_URL_API')
        url = url_api + str('/standard/profile/steam/') + \
            steamId + str('/segments/map')
        stats = requests.get(
            url, headers={'TRN-Api-Key': os.getenv('TRACKER_TOKEN')})

        if stats.status_code is 200:
            return ApiReturn.success(response=stats.json()), 200
        else:
            return ApiReturn.error('Não foi possível carregas as estatísticas dos mapas', stats.json()), 200
