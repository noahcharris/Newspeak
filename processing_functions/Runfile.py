import sys
import requests
# import nltk
# import re
from dataGenerator import *
from dataFunctions import *
# from __future__ import division
# from nltk.corpus import stopwords
# from collections import Counter
# import string
# import io
import json


data = sys.stdin.read()


# jsonData = json.loads(data)
# uniData = dataBuilder(jsonData)
# speechData = uniData
# speechData = json.dumps(dataBuilder(jsonData))
# outputData = jsonData.encode('utf-8')

def postData(data):
  # print data
  headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
  # url = 'ec2-54-193-23-12.us-west-1.compute.amazonaws.com/data'
  r = requests.post('http://ec2-54-193-23-12.us-west-1.compute.amazonaws.com/data', data, headers=headers)
  print r

# postData(speechData)

jsonData = json.loads(data)
uniData = dataBuilder(jsonData)
for entry in uniData:
  sendPres = {}
  sendPres[entry] = uniData[entry]
  sendableData = json.dumps(sendPres)
  postData(sendableData)



