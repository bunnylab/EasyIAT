from flask import Blueprint, render_template, jsonify, abort, request
import json
#from EasyIAT.schemas import block_schema, blocks_schema
from EasyIAT.models import Experiment

from EasyIAT import db

views = Blueprint('views',__name__,url_prefix='')

# actual iat lives there right now
@views.route('/')
def index():
    return render_template('index.html')

@views.route('/builder')
def builder():
    return render_template('builder.html')


@views.route('/experiment', methods=['GET', 'POST'])
def experiments():

    if request.method == 'GET':
        experiments = db.session.query(Experiment.id).all()
        return jsonify(experiments), 200

    if request.method == 'POST':
        print(request.get_json())
        experiment_json = request.get_json()
        experiment = Experiment.fromJson(experiment_json)
        if experiment:
            db.session.add(experiment)
            db.session.commit()
            return jsonify(dict(experiment)), 201


@views.route('/experiment/<int:id>', methods=['GET', 'PUT'])
def experiment(id):

    if request.method == 'GET':
        experiment = db.session.query(Experiment).filter(Experiment.id == id).first()

        if experiment:
            return jsonify(dict(experiment)), 200
        else:
            abort(404)
