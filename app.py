from flask import Flask
from config import Config

from routes import bp
from flask_cors import CORS
from flask_mysqldb import MySQL
app = Flask(__name__)
app.config.from_object(Config)
mysql = MySQL(app)
CORS(app)  # Allow cross-origin requests

app.register_blueprint(bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
