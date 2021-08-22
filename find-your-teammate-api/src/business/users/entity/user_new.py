


class UserNew:

    def __init__(self, name, steamId, rank, login, password, cpassword):
        self.name: str = name
        self.steamId: str = steamId
        self.rank: str = rank
        self.login: str = login
        self.password: str = password
        self.cpassword: str = cpassword


    def validate(self):
        return self.password != self.cpassword