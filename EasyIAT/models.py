from EasyIAT import db
import json

class Experiment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    postTrialPause = db.Column(db.Integer)

    blocks = db.relationship("Block", backref="experiment")
    briefing = db.relationship("Briefing", uselist=False, backref="experiment")
    debriefing = db.relationship("Debriefing", uselist=False, backref="experiment")
    instructions = db.relationship("Instructions", uselist=False, backref="experiment")
    exconfig = db.relationship("Exconfig", backref="experiment", uselist=False)

    @classmethod
    def fromJson(self, jsondata):
        return Experiment(**jsondata)

    def __iter__(self):
        for k, v in self.__dict__.iteritems():
            if not (k[0] == '_'):
                yield (k, v)


class Exconfig(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'))
    type = db.Column(db.Integer, nullable=False)  # normal/single target etc
    url = db.Column(db.Text)

class Briefing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'))
    title = db.Column(db.Text)
    content = db.Column(db.Text)

class Instructions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'))
    title = db.Column(db.Text)
    content = db.Column(db.Text)

class Debriefing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'))
    title = db.Column(db.Text)
    content = db.Column(db.Text)

class Block(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'))
    #exconfig = db.relationship("ExConfig", uselist=False, backref="experiment")

    alternating = db.Column(db.Boolean)
    numberOfTrials = db.Column(db.Integer)
    flipTargetCategories = db.Column(db.Boolean)
    trialInstructions = db.Column(db.Text)
    blockEndInstructions = db.Column(db.Text)

    categories = db.relationship("Category", backref="block")
    targets1 = db.relationship("Target1", backref="block")
    targets2 = db.relationship("Target2", backref="block")

# add imagestorage here in the future?
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    block_id = db.Column(db.Integer, db.ForeignKey('block.id'))
    type = db.Column(db.Integer)
    name = db.Column(db.Text)

class Target1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    block_id = db.Column(db.Integer, db.ForeignKey('block.id'))
    type = db.Column(db.Integer)
    name = db.Column(db.Text)

class Target2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    block_id = db.Column(db.Integer, db.ForeignKey('block.id'))
    type = db.Column(db.Integer)
    name = db.Column(db.Text)
