
class ApiReturn():

    def __init__(self, status=False, message=None, response=None):
        self.status = status
        self.message = message
        self.response = response

    def error(message):
        return ApiReturn(message).toJson()

    def successWithResponse(message=None, response=None):
        return ApiReturn(True, message, response).toJson()

    def success(message):
        return ApiReturn(True, message).toJson()

    def toJson(self):
        return {
            'status': self.status,
            'message': self.message,
            'response': self.response
        }
