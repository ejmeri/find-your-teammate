import os

from flask import Flask

from extensions import mongo
from test import simple_page

from src.business.controllers.user_controller import userController
from src.business.controllers.user_authentication_controller import userAuthenticationController
from src.business.controllers.player_controller import playerController
from src.business.controllers.post_controller import postController
from src.business.controllers.player_stats_controller import playerStatsController


app = Flask(__name__)

app.config.from_object('settings')
app.config['JWT_TOKEN'] = os.getenv('SECRET_KEY')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo.init_app(app)

app.register_blueprint(simple_page)
app.register_blueprint(userController)
app.register_blueprint(userAuthenticationController)
app.register_blueprint(playerController)
app.register_blueprint(postController)
app.register_blueprint(playerStatsController)

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)