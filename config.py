class BaseConfig(object):
    SECRET_KEY = 'ais;ofa8w74524tojiawoedifawer2w3er'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

class DebugConfig(BaseConfig):
    FLASK_DEBUG = True