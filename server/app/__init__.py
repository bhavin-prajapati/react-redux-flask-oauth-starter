import os
import json
import base64
import uuid
import pickle
import app.redis_client as redis_client
import app.utils
from app.middleware import Middleware
from flask import Flask, make_response, send_from_directory, redirect, url_for
from flask import render_template, request, url_for, redirect
from flask_cors import CORS, cross_origin
from flask_dance.contrib.facebook import make_facebook_blueprint, facebook
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.github import make_github_blueprint, github
from decouple import config

# Construct the Flask APP
app = Flask(__name__)
cors = CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}}) # allow CORS for all domains on all routes.

# Inject the Configuration (loaded from .env)
app.config.from_object('app.config.Config')
app.json.ensure_ascii = False

# Create Redis client
redis = redis_client.Redis()

# Calling our middleware
app.wsgi_app = Middleware(app.wsgi_app)

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
def home():
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

@app.route('/api/v1/login-facebook')
def login_facebook():
    """Log in a registered Facebook User."""
    email=None
    user=None
    if not facebook.authorized:
        return redirect(url_for('facebook.login'))
    else:
        resp = facebook.get('/me?fields=id,email,picture,first_name,last_name')
        assert resp.ok
        name=resp.json()["first_name"] + " " + resp.json()["last_name"]
        email=resp.json()["email"]
        image=resp.json()["picture"]["data"]["url"]
        user={"name":str(name),"email": str(email),"image": str(image)}
    response = make_response(redirect(request.referrer))
    user_json_str = json.dumps(user, ensure_ascii=False)
    if redis.exists("email:"+email):
        redis.setJson("email:"+email, ".facebook", user)
    else:
        redis.setJson("email:"+email, ".", { "facebook": {}})
        redis.setJson("email:"+email, ".facebook", user)
    user_json_b64 = base64.b64encode(bytes(user_json_str, 'utf-8'))
    user_json_b64_str = str(user_json_b64)[1:]
    response.set_cookie("user", value=user_json_b64_str, max_age=None, expires=None, path='/', secure=None, httponly=False)
    return response

@app.route('/api/v1/login-google')
def login_google():
    """Log in a registered Google User."""
    email=None
    user=None
    if not google.authorized:
        return redirect(url_for('google.login'))
    elif google.authorized:
        resp = google.get("/oauth2/v1/userinfo")
        name=resp.json()["name"]
        email=resp.json()["email"]
        image=resp.json()["picture"]
        user={"name":str(name),"email": str(email),"image": str(image)}
    response = make_response(redirect(request.referrer))
    user_json_str = json.dumps(user, ensure_ascii=False)
    if redis.exists("email:"+email):
        redis.setJson("email:"+email, ".google", user)
    else:
        redis.setJson("email:"+email, ".", { "google": {}})
        redis.setJson("email:"+email, ".google", user)
    user_json_b64 = base64.b64encode(bytes(user_json_str, 'utf-8'))
    user_json_b64_str = str(user_json_b64)[1:]
    response.set_cookie("user", value=user_json_b64_str, max_age=None, expires=None, path='/', secure=None, httponly=False)
    return response

@app.route('/api/v1/login-github')
def login_github():
    """Log in a registered Github User."""
    email=None
    user=None
    if not github.authorized:
        return redirect(url_for('github.login'))
    else:
        resp = github.get('/user')
        assert resp.ok
        name=resp.json()["name"]
        email=resp.json()["email"]
        image=resp.json()["avatar_url"]
        user={"name":str(name),"email": str(email),"image": str(image)}
    response = make_response(redirect(request.referrer))
    user_json_str = json.dumps(user, ensure_ascii=False)
    if redis.exists("email:"+email):
        redis.setJson("email:"+email, ".github", user)
    else:
        redis.setJson("email:"+email, ".", { "github": {}})
        redis.setJson("email:"+email, ".github", user)
    user_json_b64 = base64.b64encode(bytes(user_json_str, 'utf-8'))
    user_json_b64_str = str(user_json_b64)[1:]
    response.set_cookie("user", value=user_json_b64_str, max_age=None, expires=None, path='/', secure=None, httponly=False)
    return response

@app.route("/api/v1/logout")
def logout():
    response = make_response(redirect(request.referrer))
    response.set_cookie("session", '', expires=0)
    response.set_cookie("user", '', expires=0)
    return response

@app.route('/api/v1/create', methods=['POST'])
def create_game():
    """Create a new game."""
    user = request.environ['user']
    user_key = request.environ['user_key']
    game_config = request.get_json()
    if redis.exists(user_key):
        game_config["id"] = str(uuid.uuid4())
        games = []
        games = user.get("games", [])
        games.append(game_config)
        redis.setJson(user_key, ".games", games)
        board = [["r","k","b","k","q","b","k","r"],
                 ["p","p","p","p","p","p","p","p"],
                 [" "," "," "," "," "," "," "," "],
                 [" "," "," "," "," "," "," "," "],
                 [" "," "," "," "," "," "," "," "],
                 [" "," "," "," "," "," "," "," "],
                 ["P","P","P","P","P","P","P","P"],
                 ["R","K","B","K","Q","B","K","R"],
                ]
        game = [[board]]
        g_bytes = pickle.dumps(game)
        redis.set("game:" + game_config["id"], g_bytes)
        return json.dumps({'message': 'Game was created successfully.'}), 200, {'ContentType':'application/json'} 
    return json.dumps({'message': 'An error occured'}), 500, {'ContentType':'application/json'} 

@app.route('/api/v1/games', methods=['GET'])
def get_games():
    """Gets a users' games."""
    user = request.environ['user']
    user_key = request.environ['user_key']
    if redis.exists(user_key):
        if "games" in user:
            return user["games"], 200, {'ContentType':'application/json'}
        else:
            return [], 200, {'ContentType':'application/json'}
    return json.dumps({'message': 'An error occured'}), 500, {'ContentType':'application/json'} 

@app.route('/api/v1/game', methods=['GET'])
def get_game():
    """Get game by id."""
    game_id = request.args.get('game_id')
    if redis.exists("game:" + game_id):
        g_bytes = redis.get("game:" + game_id)
        g = pickle.loads(g_bytes)
        return json.dumps(g), 200, {'ContentType':'application/json'}
    return json.dumps({'message': 'An error occured'}), 500, {'ContentType':'application/json'} 
