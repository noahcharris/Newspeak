# Python NLTK functions

#initialization:
from __future__ import division
import nltk
from nltk.corpus import stopwords
from collections import Counter
import string

stopWordList = stopwords.words('english')

def textProcessor(text):
  # raw = '"""' +  text + '"""'
  raw = text.translate(None, string.punctuation) #removes all punctuation from the raw tex
  raw = raw.lower() # sets every char to lowercase
  tokens = nltk.word_tokenize(raw) #create a list of words in the text
  text = nltk.Text(tokens) #create a Text object from the tokens list
  return text
  
def mostCommonWords(concordanceList):
  finalCount = Counter()
  for line in concordanceList:
    words = [w for w in line.split() if w not in stopWordList]
    finalCount.update(words)
  return finalCount