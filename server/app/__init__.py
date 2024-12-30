import os
import json
import base64
import redis
from flask import Flask, make_response, send_from_directory, redirect, url_for
from flask import render_template, request, url_for, redirect
from flask_dance.contrib.facebook import make_facebook_blueprint, facebook
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.github import make_github_blueprint, github
from flask_cors import CORS, cross_origin
from decouple import config

# Construct the Flask APP
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}) # allow CORS for all domains on all routes.

# Inject the Configuration (loaded from .env)
app.config.from_object('app.config.Config')
app.json.ensure_ascii = False

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0, protocol=3)

# Register the Facebook OAuth BP built by Flask-Dance 
facebook_bp = make_facebook_blueprint()
app.register_blueprint(facebook_bp, url_prefix="/login")

# Register the Google OAuth BP built by Flask-Dance 
google_bp = make_google_blueprint(scope=["https://www.googleapis.com/auth/userinfo.email", 
           "https://www.googleapis.com/auth/userinfo.profile", 
           "openid"])
app.register_blueprint(google_bp, url_prefix="/login")

# Register the Github OAuth BP built by Flask-Dance 
github_bp = make_github_blueprint()
app.register_blueprint(github_bp, url_prefix="/login")

@app.route("/privacy-policy")
def privacy_policy():
    return "<p>Privacy Policy</p>"

@app.route("/terms-of-service")
def terms_of_service():
    return "<p>Terms Of Service</p>"

@app.route('/data-deletion', methods=['POST'])
def data_deletion():
    # Extract user ID from request payload
    data = json.loads(request.data)
    user_id = data.get('user_id')
    # Perform data deletion logic here
    # ...
    # Return a confirmation response
    return json.dumps({'success': True}), 200

@app.route("/")
def Hello():
    if facebook.authorized:
        response = make_response(redirect('/api/v1/login-facebook'))
    elif google.authorized:
        response = make_response(redirect('/api/v1/login-google'))
    elif github.authorized:
        response = make_response(redirect('/api/v1/login-github'))
    else:
        response = make_response(redirect(app.config['VITE_CLIENT_SERVER']))
    return response

@app.errorhandler(404)
def page_not_found(e):
    response = make_response(redirect(app.config['VITE_CLIENT_SERVER']))
    return response

@app.route("/counter")
def counter():
    count = r.get('count')
    if count == None:
        r.set('count', 0)
    else: 
        r.set('count', int(count) + 1)
    return "<p>Counter: " + str(count) + " </p>"

@app.route('/api/v1/login-facebook')
@cross_origin()
def login_facebook():
    """Log in a registered Facebook User."""
    user=None
    if not facebook.authorized:
        return redirect(url_for('facebook.login'))
    else:
        resp = facebook.get('/me?fields=id,email,picture,first_name,last_name')
        assert resp.ok
        print(resp.json())
        name=resp.json()["first_name"] + " " + resp.json()["last_name"]
        email=resp.json()["email"]
        avatar_url=resp.json()["picture"]["data"]["url"]
        user={"name":str(name),"email": str(email),"avatar_url": str(avatar_url)}
    response = make_response(redirect(request.referrer))
    user_json = json.dumps(user, ensure_ascii=False)
    user_json_b64 = base64.b64encode(bytes(user_json, 'utf-8'))
    user_json_b64_str = str(user_json_b64)[1:]
    response.set_cookie("user", value=user_json_b64_str, max_age=None, expires=None, path='/', secure=None, httponly=False)
    return response

@app.route('/api/v1/login-google')
@cross_origin()
def login_google():
    """Log in a registered Google User."""
    user=None
    if not google.authorized:
        print('not google.authorized')
        return redirect(url_for('google.login'))
    elif google.authorized:
        print('google.authorized')
        resp = google.get("/oauth2/v1/userinfo")
        name=resp.json()["name"]
        email=resp.json()["email"]
        avatar_url=resp.json()["picture"]
        user={"name":str(name),"email": str(email),"avatar_url": str(avatar_url)}
    response = make_response(redirect(request.referrer))
    user_json = json.dumps(user, ensure_ascii=False)
    user_json_b64 = base64.b64encode(bytes(user_json, 'utf-8'))
    user_json_b64_str = str(user_json_b64)[1:]
    response.set_cookie("user", value=user_json_b64_str, max_age=None, expires=None, path='/', secure=None, httponly=False)
    return response

@app.route('/api/v1/login-github')
@cross_origin()
def login_github():
    """Log in a registered Github User."""
    username=None
    user=None
    if not github.authorized:
        return redirect(url_for('github.login'))
    else:
        resp = github.get('/user')
        assert resp.ok
        username=resp.json()["login"]
        name=resp.json()["name"]
        email=resp.json()["email"]
        avatar_url=resp.json()["avatar_url"]
        github_login_url=url_for('github.login')
        user={"username":str(username),"name":str(name),"email": str(email),"avatar_url": str(avatar_url),"github_login_url":str(github_login_url)}
    response = make_response(redirect(request.referrer))
    user_json = json.dumps(user, ensure_ascii=False)
    user_json_b64 = base64.b64encode(bytes(user_json, 'utf-8'))
    user_json_b64_str = str(user_json_b64)[1:]
    response.set_cookie("user", value=user_json_b64_str, max_age=None, expires=None, path='/', secure=None, httponly=False)
    return response

@app.route("/api/v1/logout")
def logout():
    response = make_response(redirect(request.referrer))
    response.set_cookie("session", '', expires=0)
    response.set_cookie("user", '', expires=0)
    return response

