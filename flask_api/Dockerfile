FROM python:3.7-slim

ENV CONTAINER_HOME=/var/www

ADD . $CONTAINER_HOME
WORKDIR $CONTAINER_HOME
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip install Authlib Flask
RUN pip install --upgrade google-auth
RUN pip3 install pymongo
RUN pip install -r $CONTAINER_HOME/requirements.txt