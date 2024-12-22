import os
import json
import base64
import redis
from flask import Flask, make_response, send_from_directory, redirect, url_for
from flask import render_template, request, url_for, redirect
from flask_dance.contrib.github import make_github_blueprint, github
from decouple import config

# Construct the Flask APP
app = Flask(__name__, template_folder='./static')

# Inject the Configuration (loaded from .env)
app.config.from_object('app.config.Config')
app.json.ensure_ascii = False

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0, protocol=3)

# Register the Github OAuth BP built by Flask-Dance 
github_bp = make_github_blueprint()
app.register_blueprint(github_bp, url_prefix="/login")

# Define the main route
@app.route("/")
def index():
    username=None
    user=None
    if github.authorized:
        resp = github.get("/user")
        assert resp.ok
        username=resp.json()["login"]
        name=resp.json()["name"]
        email=resp.json()["email"]
        avatar_url=resp.json()["avatar_url"]
        user={"username":str(username),"name":str(name),"email": str(email),"avatar_url": str(avatar_url)}
    response = make_response(render_template( 'index.html', github=github, github_id=username, user=user))
    user_json = json.dumps(user, ensure_ascii=False)
    user_json_b64 = base64.b64encode(bytes(user_json, 'utf-8'))
    user_json_b64_str = str(user_json_b64)[1:]
    response.set_cookie("user", value=user_json_b64_str, max_age=None, expires=None, path='/', secure=None, httponly=False)
    return response

@app.route('/<path:filename>')
def custom_static(filename):
    return send_from_directory('./static', filename)

@app.route("/hello")
def hello_world():
    count = r.get('count')
    if count == None:
        r.set('count', 0)
    else: 
        r.set('count', int(count) + 1)
    return "<p>Counter: " + str(count) + " </p>"
