# react-redux-flask-oauth-starter
A Starter Kit for React, Redux and Flask with Social Media login integrated

## `Sign In`
![Screenshot](client/public/signin.png)

## `Dashboard`
![Screenshot](client/public/dashboard.png)

### Docker Compose
```sh
docker-compose build
docker-compose up
```

## Standalone

### Redis
```sh
brew install redis
redis-server
```

### client

## Client-side Libraries

* React
* Redux
* Material UI

```sh
npm install
npm run build
```

### server

## Server-side Libraries

* flask
* flask-dance
* redis-py

```sh
pip3 install -r requirements.txt
export FLASK_APP=run.py;export FLASK_ENV=development; flask run --cert=adhoc
```
