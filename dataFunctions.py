# Python NLTK functions

#initialization:
from __future__ import division
import nltk
from nltk.corpus import stopwords
from collections import Counter
import string
# from text.py import *

stopWordList = stopwords.words('english')

def textProcessor(text):
  # raw = '"""' +  text + '"""'
  raw = text.translate(None, string.punctuation) #removes all punctuation from the raw text
  raw = raw.lower() # sets every char to lowercase
  tokens = nltk.word_tokenize(raw) #create a list of words in the text
  text = nltk.Text(tokens) #create a Text object from the tokens list
  return text


def mostCommonWords(concordanceList):
  finalCount = Counter()
  for line in concordanceList:
    words = [w for w in line.split() if w not in stopWordList]
    finalCount.update(words)
  # print finalCount
  return finalCount

def concordanceCounter(word, text):
  concordanceList = text.concordance(word)
  commonWordCount = mostCommonWords(concordanceList)
  return commonWordCount

def mostCommonConcordancer(text):
  commonWordObject = {}
  for w in mostCommonWords(text).most_common(10):
    commonWordObject[w[0]] = concordanceCounter(w[0], text)
  return commonWordObject

# Code Cleanup: copy over the necessary parts of the nltk text.py function (concordance, generate_concordance) so that it can run from a fresh install
def generate_concordance(self, word, width=75, lines=50):
        """
        Print a concordance for ``word`` with the specified context window.

        :param word: The target word
        :type word: str
        :param width: The width of each line, in characters (default=80)
        :type width: int
        :param lines: The number of lines to display (default=25)
        :type lines: int
        """
        half_width = (width - len(word) - 2) // 2
        context = width // 4 # approx number of words of context
        concordList = []
        offsets = self.offsets(word)
        if offsets:
            concordList = []
            lines = min(lines, len(offsets))
            # print("Displaying %s of %s matches:" % (lines, len(offsets)))
            for i in offsets:
                if lines <= 0:
                    break
                left = (' ' * half_width +
                        ' '.join(self._tokens[i-context:i]))
                right = ' '.join(self._tokens[i+1:i+context])
                left = left[-half_width:]
                right = right[:half_width]
            # add lines to list as strings   
                concordLine = str(left) + ' ' + str(self._tokens[i]) + " " +  str(right)
                concordList.append(concordLine)
                lines -= 1
            # print items from list to verify that this method works. 
        else:
            print("No matches")
        return concordList

