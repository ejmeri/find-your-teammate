from flask import Flask

from extensions import mongo

from test import simple_page
from business.controllers.user_controller import userController
from business.controllers.user_authentication_controller import userAuthenticationController
from business.controllers.player_controller import playerController
from business.controllers.post_controller import postController

app = Flask(__name__)

app.register_blueprint(simple_page)
app.register_blueprint(userController)
app.register_blueprint(userAuthenticationController)
app.register_blueprint(playerController)
app.register_blueprint(postController)

app.config.from_object('settings')

mongo.init_app(app)

JWT_TOKEN = app.config.get('SECRET_KEY')


if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)