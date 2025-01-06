import base64
import json
from werkzeug.wrappers import Request, Response, ResponseStream
import app.redis_client as redis_client

class Middleware():
    '''
    Simple WSGI middleware
    '''

    def __init__(self, app):
        self.app = app
        self.redis = redis_client.Redis()
        self.user = ''

    def decode_user(self, user_cookie):
        user_str = base64.b64decode(user_cookie)
        return user_str

    def __call__(self, environ, start_response):
        user_str = None
        request = Request(environ)
        user = request.cookies.get('user')
        if(user != None):
            print('User Cookie: ' + user)
            user_str = self.decode_user(user)
            user_json = json.loads(user_str)
            print('User Json: ' + str(user_json))
            user_key = "email:" + user_json["email"]
            if self.redis.exists(user_key):
                environ['user'] = self.redis.getJson(user_key, ".")
                environ['user_key'] = user_key
                print('User exists!!')
                return self.app(environ, start_response)

        return self.app(environ, start_response)
