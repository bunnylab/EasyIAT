import requests

experiment = {'name':'hello'}
r = requests.post('http://localhost:5000/experiment', json=experiment)
