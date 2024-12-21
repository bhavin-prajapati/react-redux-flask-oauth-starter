import os
import redis
from flask import Flask, send_from_directory, redirect, url_for
from flask import render_template, request, url_for, redirect
from flask_dance.contrib.github import make_github_blueprint, github
from decouple import config

# Construct the Flask APP
app = Flask(__name__, template_folder='./static')

# Inject the Configuration (loaded from .env)
app.config.from_object('app.config.Config')

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0, protocol=3)

# Register the Github OAuth BP built by Flask-Dance 
github_bp = make_github_blueprint()
app.register_blueprint(github_bp, url_prefix="/login")

# Define the main route
@app.route("/")
def index():
    github_id=None
    user=None
    if github.authorized:
        # all available data: https://docs.github.com/en/rest/reference/users 
        resp = github.get("/user")
        assert resp.ok
        print(resp.json())
        github_id=resp.json()["login"]
        user={
            "name":resp.json()["name"],
            "email":resp.json()["email"],
            "avatar_url":resp.json()["avatar_url"]
            }
        print(user)
    return render_template( 'index.html', github=github, github_id=github_id, user=user )

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
