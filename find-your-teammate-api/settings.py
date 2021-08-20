import os

MONGO_URI = os.environ.get('MONGO_URI')

TRACKER_API = os.environ.get('TRACKER_API')
TRACKER_TOKEN = os.environ.get('TRACKER_TOKEN')
SECRET_KEY = os.getenv('SECRET_KEY')