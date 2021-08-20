from flask import Flask
from test import simple_page

app = Flask(__name__)
app.register_blueprint(simple_page)


app.config.from_object('settings')

@app.get('/')
def hello_world():
    return 'Hello world! ' + app.config["TRACKER_TOKEN"] # GET VARIABLE FROM ENV

@app.get('/ping')
def ping():
    return 'pongg'


if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000)