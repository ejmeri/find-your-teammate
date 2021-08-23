from extensions import mongo
from bson import ObjectId


class PlayerRepository():
    def create(player):
        mongo.db.players.insert_one(player)

    def findByUserId(userId):
        return mongo.db.players.find_one({'userId': ObjectId(userId)})

    def updateInfo(playerId, avatarProfileImage, stats):
        return mongo.db.players.update_one({'_id': ObjectId(playerId)}, {'$set': {'avatarProfileImage': avatarProfileImage, 'stats': stats}})

    def find():
        return mongo.db.players.find({'active': True, 'available': True, })

    def findPlayers(search):
        return mongo.db.players.find({'rank': search})

    def update(player):
        return mongo.db.players.update_one(
            {'userId': ObjectId(player.userId)}, {'$set': {'name': player.name, 'rank': player.rank, 'gcLevel': player.gcLevel, 'gcLink': player.gcLink,  'inGameLeader': player.inGameLeader, 'about': player.about, 'avatarProfileImage': player.avatarProfileImage, 'stats': player.stats}})
