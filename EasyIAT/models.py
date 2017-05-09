from EasyIAT import db

class IatConfiguration(db.Model):
    id = db.Column(db.Integer, primary_key=True)