from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

application = Flask(__name__)

application.config.from_object('config.DebugConfig')

db = SQLAlchemy(application)
from EasyIAT import models
db.create_all()
ma = Marshmallow(application)

from EasyIAT.views import views
application.register_blueprint(views)

# ok we have the basic blueprint of this working and running what we have to do now is to design an
# effective creation and management framework and then get our js code fixed up and working
# with our database and etc, since our config files are json just making serializers/deserializers
# is probably the best way to go
#
# I'm thinking something like each experiment has a main 'experiment object' which must have
# several block children objects with the configuration we're using already oh even beter
# each 'experiment' has settings such as type, urlcode, briefing and debriefing objects
# each experiment then has an iat_config object as a child, which itself has multiple blocks as
# children, based on the block you use

# iat-name/a23kjsdfs/         - intro screen for subject stores state of their experiment, returns if crashes occur
# iat-name/a23kjsdfs/block1/  - returns block1 config
# iat-name/a23kjsdfs/block1/ (post) - saves trial data to the database
#
# flask-admin panel for modifying trials and such manually
# form based experiment builder to create common iat types by answering
# questions and inputting stimuli/uploading pictures
#
# results viewer - have some live graphs and auto-parsing of results to display
# the output + a button to export csvs and such from db, link to flask_admin?