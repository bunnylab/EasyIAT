from flask import Blueprint, render_template

views = Blueprint('views',__name__,url_prefix='')

@views.route('/')
def index():
    return render_template('index.html')