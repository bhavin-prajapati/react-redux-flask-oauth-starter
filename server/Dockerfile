# pull the official docker image
FROM python:3.10-slim

# set work directory
WORKDIR /usr/src/app

# set env variables
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# install dependencies
RUN pip install -r requirements.txt

COPY . .

EXPOSE 3000