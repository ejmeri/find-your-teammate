from extensions import mongo
from bson import ObjectId


class PostRepository():

    def create(post):
        mongo.db.posts.insert_one(post)

    def pushComment(id, comment):
        mongo.db.posts.update_one({'_id': ObjectId(id)}, {
                                  '$push': {'comments': comment}, '$inc': {'totalComments': 1}})

    def findBy():
       return mongo.db.posts.find()

    def findComments(id):
       return mongo.db.posts.find_one({'_id': ObjectId(id)})

    def findById(id):
        return mongo.db.posts.find_one({'_id': ObjectId(id)})
