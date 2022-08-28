FROM python:3.9
ADD . /apiAuth
WORKDIR /apiAuth
EXPOSE 5001
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip install Authlib Flask
ENV FLASK_APP=app/create_app.py
ENV JWT_SECRET="secret"
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=5001"]