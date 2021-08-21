from os import name
from flask.blueprints import Blueprint
import requests

simple_page = Blueprint('simple_page', __name__, template_folder='templates')

class TestFailed(Exception):
    def __init__(self, m):
        self.message = m
    def __str__(self):
        return self.message

@simple_page.route('/csgo')
def test():
    try:
        request = requests.get('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/ejmeri', headers = {'TRN-Api-Key': '184f4bb3-d306-4906-a667-d9cb1c99c02d'})
    except TestFailed as x:
        print(x)
    
    response = request.json()

    # if response.message != '':
    #     print('erro aqui ')
    #     return { 'status': False, 'message': response.message }
    
    return response

@simple_page.get('/healthy/ping')
def ping():
    return 'pong', 200
