# Python NLTK functions

#initialization:
from __future__ import division
import nltk
from nltk.corpus import stopwords
from collections import Counter
import string
# from text.py import *

stopSet = stopwords.words('english')
stopSet = set(stopwords.words('english')) # words to ignore when looking for common collocates
stopSet.update(['w', 'nvoy', 'milescenter', 'width500', 'width400', 'legislat', 'sed', 'ts', 'thats', 'l', 'th', 'e', 'iapplausei', 'weve', 'lets', 'rec', 'upon', 'statesthat', 'representativesb', 'ongress', 'institut'])
stopSet.update(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])



def textProcessor(text):
  text = text.encode('ascii', 'ignore')
  raw = text.translate(None, string.punctuation) #removes all punctuation from the raw text
  raw = raw.lower() # sets every char to lowercase
  tokens = nltk.word_tokenize(raw) #create a list of words in the text
  text = nltk.Text(tokens) #create a Text object from the tokens list
  return text


def mostCommonWords(concordanceList):
  finalCount = Counter()
  for line in concordanceList:
    words = [w for w in line.split() if w not in stopSet and len(w) > 2]
    finalCount.update(words)
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

# /////Code Cleanup: copy over the necessary parts of the nltk text.py function (concordance, generate_concordance) so that it can run from a fresh install \\\\
# def generate_concordance(self, word, width=75, lines=50):
#         """
#         Print a concordance for ``word`` with the specified context window.

#         :param word: The target word
#         :type word: str
#         :param width: The width of each line, in characters (default=80)
#         :type width: int
#         :param lines: The number of lines to display (default=25)
#         :type lines: int
#         """
#         half_width = (width - len(word) - 2) // 2
#         context = width // 4 # approx number of words of context
#         concordList = []
#         offsets = self.offsets(word)
#         if offsets:
#             concordList = []
#             lines = min(lines, len(offsets))
#             # print("Displaying %s of %s matches:" % (lines, len(offsets)))
#             for i in offsets:
#                 if lines <= 0:
#                     break
#                 left = (' ' * half_width +
#                         ' '.join(self._tokens[i-context:i]))
#                 right = ' '.join(self._tokens[i+1:i+context])
#                 left = left[-half_width:]
#                 right = right[:half_width]
#             # add lines to list as strings   
#                 concordLine = str(left) + ' ' + str(self._tokens[i]) + ' ' +  str(right)
#                 concordList.append(concordLine)
#                 lines -= 1
#             # print items from list to verify that this method works. 
#         else:
#             print("No matches")
#         return concordList


# @python_2_unicode_compatible
# class ConcordanceIndex(object):
#     """
#     An index that can be used to look up the offset locations at which
#     a given word occurs in a document.
#     """
#     def __init__(self, tokens, key=lambda x:x):
#         """
#         Construct a new concordance index.

#         :param tokens: The document (list of tokens) that this
#             concordance index was created from.  This list can be used
#             to access the context of a given word occurrence.
#         :param key: A function that maps each token to a normalized
#             version that will be used as a key in the index.  E.g., if
#             you use ``key=lambda s:s.lower()``, then the index will be
#             case-insensitive.
#         """
#         self._tokens = tokens
#         """The document (list of tokens) that this concordance index
#            was created from."""

#         self._key = key
#         """Function mapping each token to an index key (or None)."""

#         self._offsets = defaultdict(list)
#         """Dictionary mapping words (or keys) to lists of offset
#            indices."""

#         # Initialize the index (self._offsets)
#         for index, word in enumerate(tokens):
#             word = self._key(word)
#             self._offsets[word].append(index)

#     def tokens(self):
#         """
#         :rtype: list(str)
#         :return: The document that this concordance index was
#             created from.
#         """
#         return self._tokens

#     def offsets(self, word):
#         """
#         :rtype: list(int)
#         :return: A list of the offset positions at which the given
#             word occurs.  If a key function was specified for the
#             index, then given word's key will be looked up.
#         """
#         word = self._key(word)
#         return self._offsets[word]

#     def __repr__(self):
#         return '<ConcordanceIndex for %d tokens (%d types)>' % (
#             len(self._tokens), len(self._offsets))

#     def generate_concordance(self, word, width=75, lines=50):
#         """
#         Print a concordance for ``word`` with the specified context window.

#         :param word: The target word
#         :type word: str
#         :param width: The width of each line, in characters (default=80)
#         :type width: int
#         :param lines: The number of lines to display (default=25)
#         :type lines: int
#         """
#         half_width = (width - len(word) - 2) // 2
#         context = width // 4 # approx number of words of context
#         concordList = []
#         offsets = self.offsets(word)
#         if offsets:
#             concordList = []
#             lines = min(lines, len(offsets))
#             # print("Displaying %s of %s matches:" % (lines, len(offsets)))
#             for i in offsets:
#                 if lines <= 0:
#                     break
#                 left = (' ' * half_width +
#                         ' '.join(self._tokens[i-context:i]))
#                 right = ' '.join(self._tokens[i+1:i+context])
#                 left = left[-half_width:]
#                 right = right[:half_width]
#             # add lines to list as strings   
#                 concordLine = str(left) + ' ' + str(self._tokens[i]) + ' ' +  str(right)
#                 concordList.append(concordLine)
#                 lines -= 1
#             # print items from list to verify that this method works. 
#         else:
#             print("No matches")
#         return concordList

