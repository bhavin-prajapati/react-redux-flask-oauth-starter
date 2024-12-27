# pull the official docker image
FROM python:3.10-slim

# set work directory
WORKDIR /app

# set env variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# install dependencies
RUN pip install -r requirements.txt

EXPOSE 3000