from extensions import mongo
from bson import ObjectId


class PlayerRepository():
    def create(player):
        mongo.db.players.insert_one(player)

    def findByUserId(userId):
        return mongo.db.players.find_one({ 'userId': ObjectId(userId) })

    def find():
        return mongo.db.players.find({ 'active': True })
