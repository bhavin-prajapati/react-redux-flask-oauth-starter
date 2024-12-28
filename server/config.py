# -*- encoding: utf-8 -*-
"""
Copyright (c) 2025 - react-redux-flask-oauth-starter
"""

import os
from decouple import config

# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

class Config():
    # Set up the App SECRET_KEY
    SECRET_KEY = config('SECRET_KEY', default='tHe#$uP3R$3cR3tK3y')
    GITHUB_OAUTH_CLIENT_ID     = config('GITHUB_OAUTH_CLIENT_ID')
    GITHUB_OAUTH_CLIENT_SECRET = config('GITHUB_OAUTH_CLIENT_SECRET')