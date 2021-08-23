import os

import requests
from src.shared.api_return import ApiReturn


class PlayerStatsService:
    @staticmethod
    def findPersonalStats(steamId: str):
        url_api: str = "https://public-api.tracker.gg/v2/csgo/standard/profile/steam/" + steamId
        stats = requests.get(
            url_api, headers={'TRN-Api-Key': "184f4bb3-d306-4906-a667-d9cb1c99c02d"})

        if stats.status_code is 200:
            return stats.json()
        else:
            return ApiReturn.error('Não foi possível carregas as estatísticas', str(stats))

    @staticmethod
    def findWeaponsStats(steamId: str):
        url_api: str = "https://public-api.tracker.gg/v2/csgo/standard/profile/steam/" + \
            steamId + '/segments/weapon'
        stats = requests.get(
            url_api, headers={'TRN-Api-Key': "184f4bb3-d306-4906-a667-d9cb1c99c02d"})

        if stats.status_code is 200:
            response = stats.json()
            return ApiReturn.success(response=response['data']), 200
        else:
            return ApiReturn.error('Não foi possível carregas as estatísticas das armas', stats.json()), 200

    @staticmethod
    def findMapsStats(steamId: str):
        url_api: str = "https://public-api.tracker.gg/v2/csgo/standard/profile/steam/" + \
            steamId + str('/segments/map')
        stats = requests.get(
            url_api, headers={'TRN-Api-Key': "184f4bb3-d306-4906-a667-d9cb1c99c02d"})

        if stats.status_code is 200:
            response = stats.json()
            return ApiReturn.success(response=response['data']), 200
        else:
            return ApiReturn.error('Não foi possível carregas as estatísticas dos mapas', stats.json()), 200
