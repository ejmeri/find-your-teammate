
from bson import ObjectId
from datetime import datetime

from src.business.players.entity.contact import Contact


class Player():

    def __init__(self, userId, name, rank, steamUserId, avatarProfileImage = None, about = None, country = None, gcLevel = None, gcLink = None, mainPosition = None, positions = [], inGameLeader = False):
        self._id = ObjectId()
        self.userId = userId
        self.name: str = name
        self.about: str = about
        self.country: str = country
        self.active: bool = True
        self.available: bool = True
        self.contact: Contact = None
        self.gcLevel =  gcLevel
        self.gcLink: str = gcLink
        self.steamUserId: str = steamUserId
        self.steamUserUrl: str = None
        self.mainPosition: str = mainPosition
        self.positions: list = positions
        self.rank: str = rank
        self.inGameLeader: bool = inGameLeader
        self.createDate: datetime = datetime.utcnow()
        self.avatarProfileImage = avatarProfileImage

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
            'country': self.country,
            'active': self.active,
            'available': self.available,
            'contact': self.contact,
            'steamUserId': self.steamUserId,
            'steamUserUrl': self.steamUserUrl,
            'mainPosition': self.mainPosition,
            'positions': self.positions,
            'inGameLeader': self.inGameLeader,
            'createDate': self.createDate,
        }
