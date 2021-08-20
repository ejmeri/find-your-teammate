from extensions import mongo
from bson import ObjectId

class UserRepository():

    def findById(id):
        return mongo.db.users.find_one({'_id': ObjectId(id)})

    def findByLogin(login):
        return mongo.db.users.find_one({'login': login})

    def findAll():
        return mongo.db.users.find()

    def create(user):
        mongo.db.users.insert_one(user)
