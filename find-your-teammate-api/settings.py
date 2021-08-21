import os


os.environ['MONGO_URI'] = "mongodb+srv://ejmeri_dev:JE29o3zaay7HFbRl@find-your-csgo-teammate.xmjw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
os.environ['SECRET_KEY'] = "\xf9'\xe4p(\xa9\x12\x1a!\x94\x8d\x1c\x99l\xc7\xb7e\xc7c\x86\x02MJ\xa0"

TRACKER_API = os.environ.get('TRACKER_API')
TRACKER_TOKEN = os.environ.get('TRACKER_TOKEN')