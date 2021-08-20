from bson import objectid

class User():
    
    def __init__(self, email, login, password):
        self._id = objectid.ObjectId()
        self.email = email
        self.login = login
        self.password = password

    def toJson(self):
        return {
            '_id': self._id,
            'login': self.login,
            'senha': self.password,
            'email': self.email
        }