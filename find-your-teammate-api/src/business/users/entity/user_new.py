


class UserNew:

    def __init__(self, login, password, cpassword):
        self.login: str = login
        self.password: str = password
        self.cpassword: str = cpassword


    def validate(self):
        return self.password == self.cpassword