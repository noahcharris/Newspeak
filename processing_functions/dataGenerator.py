# cd textparser
# node parse.js

from dataFunctions import *


def dataBuilder(stateOfUnionSpeeches):
  presidents = {}
  for SOTU in stateOfUnionSpeeches: # for a given speech object in the speeches array
    president = SOTU['president']
    president = president.replace(" ", "") # 'Barack Obama'
    president = president.replace(".", "") # 'HarrySTruman'
    # print(president)
    if president not in presidents: # check to see if 'Barack Obama' is a key of the presidents dictionary
      presidents[president] = {} # if not, add it
    date = SOTU['date']
    presidents[president][date] = {} # the date of the current SOTU will be the dictionary object for a given speech's output data
    presidents[president][date]['trackList'] = []
   #///////////// PROCESSING INTO DATA \\\\\\\\\\\\\\
    text = textProcessor(SOTU['speech']) # processing to make it workable
    # edit text to remove 'mdash'
    # text = text.encode('ascii', 'ignore')
    commonWordsList = mostCommonWords(text)
    wordCountTuples = sorted(mostCommonWords(text).items(), key=lambda count: count[1], reverse=True) # get a list of tuples ('word', count), sorted by count order, for iteration

    #//// Create word data object for counts and add it to the speech data object \\\
    for i in range(50):
      wordData = {'count': wordCountTuples[i][1]} # wordCountTuples[i] is a tuple that looks like ("word": 20)
      presidents[president][date][wordCountTuples[i][0]] = wordData #'obama': {'2009': {'free': 2}}
      # print presidents[president]['trackList']
      # print wordCountTuples[i][0]
      checkWord = wordCountTuples[i][0]
      presidents[president][date]['trackList'].append(checkWord)
      # print presidents[president][date]['trackList'] # add top 50 words to trackList
    # print presidents[president]['trackList']

    for year in presidents[president]:
      for w in presidents[president][year]['trackList']: # should loop through trackList, get count data, add to 
        wordData = {'count': commonWordsList[w]}
        # print commonWordsList[w]
        # print wordData
        # print presidents[president]['trackList']
        # print w
        # print wordData
        if w[0] not in presidents[president][date] and type(w[1]) == int:
          presidents[president][date][w] = wordData                             

    #/// Create collocation data for a given word \\\
    for word in presidents[president][date]: # presidents[president][date] looks like {"barack": {"February 12, 2009": {"word": {"count": 20}}}}
      collocates = {}
      concordList = text.concordance(word) # a list of lines
      collocateList = mostCommonWords(concordList).most_common(6) # generate an array of tuples, ('collocate', count)
      collocateList = [w for w in collocateList if w[0] != word]

      for collocate in collocateList: # build the list of collocates for a given
        # collocate[0].decode('utf-8')
        # collocate[0].replace('mdash', ' ')
        collocates[collocate[0]] = collocate[1]
        # print collocates
      print type(presidents[president][date][word])
      print (presidents[president][date][word])

      if presidents[president][date][word]:
        presidents[president][date][word]['collocates'] = collocates


      # // eventual method for removing single-occurrence collocates from the collocates list object \\\
      # for collocate in collocateList:
      #   if collocate[1] > 1:
      #     collocates[collocate[0]] = collocate[1]
  # print presidents
  return presidents





# Input data format:
#   [{speech: "blah blah blah blah",
#     president: 'Barack Obama',
#     date: 2013'},
#     {speech: "blah blah blah blah"},
#     president: 'Bill Clinton',
#     date: 'February 12, 1998'];

# hyptothetical json object output:

# presidents: {
#   'Washington': {
#      '1777': {
#       'word1': {
#         'count': 40,
#         'collocates': {
#           'word 2': 30,
#           'word 3': 20,
#           'word 4': 10
#         }
#       }
#       word2: {
#         count: 30,
#         collocates: {
#           word2: 15,
#           word3: 5
#         }
#       }
#     }
#     February 12, 1778: {
#       word1: {
#       etc...
#       }
#     }
#   }
#   Jefferson: {
#     date1: {
#       word1: {
#         count: 35,
#         collocates: {
#           word2: 20,
#           word3: 8,
#           word4: 5
#         }
#       }
#     }
#   }
# }
