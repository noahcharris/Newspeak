# cd textparser
# node parse.js

from dataFunctions import *

def dataBuilder(stateOfUnionSpeeches):
  presidents = {}
  for SOTU in stateOfUnionSpeeches: # for a given speech object in the speeches array
    president = SOTU['president'] # 'Barack Obama'
    if president not in presidents: #check to see if 'Barack Obama' is a key of the presidents dictionary
      presidents[president] = {} # if not, add it
    date = SOTU['date']
    presidents[president][date] = {} # the date of the current SOTU will be the dictionary object for a given speech's output data
   
   #/////////////PROCESSING INTO DATA \\\\\\\\\\\\\\
    text = textProcessor(SOTU['speech']) # processing to make it workable

    wordCountTuples = sorted(mostCommonWords(text).items(), key=lambda count: count[1], reverse=True) # get a list of tuples ('word', count), sorted by count order, for iteration

    #////Create word data object for counts and add it to the speech data object \\\
    for i in range(50):
      wordData = {'count': wordCountTuples[i][1]} # wordCountTuples[i] is a tuple that looks like ("word": 20)
      presidents[president][date][wordCountTuples[i][0]] = wordData
    # results in an object like {'word1': {'count': 20},
    #                            


    #/// Create collocation data for a given word \\\

    for word in presidents[president][date]: # presidents[president][date] looks like {"barack": {"February 12, 2009": {"word": {"count": 20}}}}
      collocates = {}
      concordList = text.concordance(word) # a list of lines
      collocateList = mostCommonWords(concordList).most_common(5) # generate an array of tuples, ('collocate', count)
      for collocate in collocateList:
        collocates[collocate[0]] = collocate[1]
      presidents[president][date][word]['collocates'] = collocates


  # iterate through the common word list earlier, to get concordance-lists, then iterate through the list of word objects, look up the counts in the original counter object, and add that as a property. 


  # send(presidents) to database;
  return presidents





# Input data format:
#   [{speech: "blah blah blah blah",
#     president: 'Barack Obama',
#     date: 'February 12, 2013'},
#     {speech: "blah blah blah blah"},
#     president: 'Bill Clinton',
#     date: 'February 12, 1998'];

# hyptothetical json object output:

# presidents: {
#   Washington: {
#     February 12, 1777: {
#       word1: {
#         count: 40,
#         collocates: {
#           word 2: 30,
#           word 3: 20,
#           word 4: 10
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
