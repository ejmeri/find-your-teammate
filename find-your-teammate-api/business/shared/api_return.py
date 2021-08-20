
class ApiReturn():

    def __init__(self, status=False, message=None, internalError=None, response=None):
        self.status = status
        self.message = message
        self.response = response
        self.internalError = internalError

    def error(message, internalError=None):
        return ApiReturn(message=message, internalError=internalError).toErrorJson()

    def success(message=None, response=None):
        return ApiReturn(status=True, message=message, response=response).toJson()

    def toJson(self):
        return {
            'status': self.status,
            'message': self.message,
            'response': self.response,
        }

    def toErrorJson(self):
        return {
            'status': self.status,
            'message': self.message,
            'internalError': self.internalError
        }        
