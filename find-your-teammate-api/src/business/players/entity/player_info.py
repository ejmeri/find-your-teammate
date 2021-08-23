
from bson import ObjectId
from datetime import datetime


class Player():

    def __init__(self, userId, name, rank, steamUserId, _id =None, active=None, available=None, steamUserUrl=None, avatarProfileImage = None, about = None, gcLevel = None, gcLink = None, inGameLeader = False, stats = None, createDate = None):
        self._id = ObjectId()
        self.userId = userId
        self.name: str = name
        self.about: str = about
        self.active: bool = True
        self.available: bool = True
        self.gcLevel =  gcLevel
        self.gcLink: str = gcLink
        self.steamUserId: str = steamUserId
        self.steamUserUrl: str = steamUserUrl
        self.rank: str = rank
        self.inGameLeader: bool = inGameLeader
        self.createDate: datetime = datetime.utcnow()
        self.avatarProfileImage = avatarProfileImage
        self.stats = stats

    def buildSteamUrl(self):
        self.steamUserUrl = 'https://steamcommunity.com/profiles/' + self.steamUserId

    def toCreateJson(self):
        return {
            '_id': self._id,
            'userId': ObjectId(self.userId),
            'name': self.name,
            'rank': self.rank,
            'about': self.about,
            'createDate': self.createDate,
            'active': self.active,
            'available': self.available,
            'steamUserId': self.steamUserId,
            'steamUserUrl': self.steamUserUrl,
            'inGameLeader': self.inGameLeader,
            'createDate': self.createDate,
        }
