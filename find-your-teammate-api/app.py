from flask import Flask

from extensions import mongo

from test import simple_page
from business.controllers.user_controller import userView

from business.users.entity.user import User

app = Flask(__name__)
app.register_blueprint(simple_page)
app.register_blueprint(userView)


app.config.from_object('settings')

mongo.init_app(app)


if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)