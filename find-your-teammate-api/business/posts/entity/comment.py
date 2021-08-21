from typing import ContextManager
from bson import ObjectId
from datetime import datetime


class Comment():
    def __init__(self, content, userId, userLogin):
        self._id = ObjectId()
        self.content: str = content
        self.userId = userId
        self.userLogin: str = userLogin
        self.createDate: datetime = datetime.utcnow()

    def toCreateJson(self):
        return {
            '_id': self._id,
            'content': self.content,
            'userId': ObjectId(self.userId),
            'userLogin': self.userLogin,
            'createDate': self.createDate,
        }
