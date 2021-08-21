from bson import ObjectId
from datetime import datetime


class Post():

    def __init__(self, userId, userLogin, content):
        self._id = ObjectId()
        self.userId = userId
        self.userLogin = userLogin
        self.content = content
        self.comments: list = []
        self.totalComments: int = 0
        self.createDate: datetime = datetime.utcnow()

    def toCreateJson(self):
        return {
            '_id': self._id,
            'userId': ObjectId(self.userId),
            'userLogin': self.userLogin,
            'content': self.content,
            'comments': self.comments,
            'totalComments': self.totalComments,
            'createDate': self.createDate
        }
