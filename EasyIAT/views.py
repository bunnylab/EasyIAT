from flask import Blueprint, render_template, jsonify
from EasyIAT.schemas import block_schema, blocks_schema
from EasyIAT.models import Block

from EasyIAT import db

views = Blueprint('views',__name__,url_prefix='')

@views.route('/')
def index():
    return render_template('index.html')

@views.route('/test')
def test():
    block1 = Block.query.first()

    if block1:
        return jsonify(block_schema.dump(block1).data)
    else:
        return jsonify("didn't have one")

@views.route('/tests')
def tests():
    blocks = Block.query.all()

    if blocks:
        return jsonify(blocks_schema.dump(blocks).data)
    else:
        return jsonify("didn't have one")
