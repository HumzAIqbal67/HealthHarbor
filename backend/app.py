# Python Imports
from flask import Flask
from flask_cors import CORS

# Imports
from routes.health_item import health_item
from routes.cohere_api import cohere_blueprint
from logging import FileHandler,WARNING

app = Flask(__name__)

# Services
app.register_blueprint(health_item, url_prefix="/health_item")
app.register_blueprint(cohere_blueprint, url_prefix="/cohere")
CORS(app)


@app.route("/")
def home() -> str:
    return 'Health Harbor APP BACKEND API :: UNAUTHORIZED ACCESS'


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5050, debug=True)
