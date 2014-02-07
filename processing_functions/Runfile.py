import sys
import requests
import json
from dataGenerator import *
from dataFunctions import *

data = sys.stdin.read()
print data

def postData(data):
  headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
  r = requests.post('http://ec2-54-193-23-12.us-west-1.compute.amazonaws.com/data', data, headers=headers)
  print r

jsonData = json.loads(data)
uniData = dataBuilder(jsonData)
for entry in uniData:
  sendPres = {}
  sendPres[entry] = uniData[entry]
  sendableData = json.dumps(sendPres)
  postData(sendableData)



