from flask.blueprints import Blueprint

utilController = Blueprint('utilController', __name__)


@utilController.get('/healthy/ping')
def ping():
    return 'pong', 200
