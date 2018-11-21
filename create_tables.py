#! /usr/bin/env python
from EasyIAT import db, app

print 'Creating all database tables...'
with app.app_context():
    db.create_all()
print 'Finished'
