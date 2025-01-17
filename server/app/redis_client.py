# -*- encoding: utf-8 -*-
"""
Copyright (c) 2025 - react-redux-flask-oauth-starter
"""
import redis
from redis.commands.json.path import Path

class Redis:
    def __init__(self, host='redis', port=6379, db=0, protocol=3):
        self.redis = redis.Redis(host, port=6379)

    def exists(self, key):
        return self.redis.exists(key)
    
    def get(self, key):
        return self.redis.get(key)
    
    def set(self, key, value):
        return self.redis.set(key, value)
    
    def getJson(self, key, path):
        return self.redis.json().get(key, Path(path))

    def setJson(self, key, path, value):
        return self.redis.json().set(key, Path(path), value)
