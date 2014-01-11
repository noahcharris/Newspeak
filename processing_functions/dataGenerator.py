
from dataFunctions import *


def dataBuilder(stateOfUnionSpeeches):
  presidents = {} # the data object to be send to runfile.py
  speeches = {} # storage for the text-data from each speech
  #/// build the initial data object \\\
  for SOTU in stateOfUnionSpeeches: # for a given speech object in the speeches array
    president = SOTU['president']
    #/// format president names to work with sql
    president = president.replace(" ", "") # 'Barack Obama' 
    president = president.replace(".", "") # 'HarrySTruman'
    if president not in presidents: # check to see if 'Barack Obama' is a key of the presidents dictionary
      presidents[president] = {} # if not, add it
    tempDate = SOTU['date']
    presidents[president][tempDate] = []
 
   #///////////// PROCESSING TEXT INTO DATA \\\\\\\\\\\\\\
    text = textProcessor(SOTU['speech']) # processing to make it workable
    speeches[tempDate] = text
    wordCountTuples = sorted(mostCommonWords(text).items(), key=lambda count: count[1], reverse=True) # get a list of tuples ('word', count), sorted by count order, for iteration
    presidents[president][tempDate] = wordCountTuples

  for pres in presidents:
    dateArray = []
    for year in presidents[pres]:
      dateTuple = [year, presidents[pres][year]]
      dateArray.append(dateTuple)
    dateArray = sorted(dateArray, key=lambda sorter: sorter[0], reverse=False)

    presidents[pres]['termList'] = []

    for year in dateArray:
      wordTuples = year[1]
      #/// Create word data object for counts and add it to the speech data object \\\
      for i in range(100): # the range selects the top n most common words in the speech
        if wordTuples[i][0] not in presidents[pres]['termList']:
          presidents[pres]['termList'].append(wordTuples[i][0])


    for year in dateArray:
      wordTuples = year[1]
      dataObj = {}
      tupleArrayIndex = []
      for c in wordTuples:
        tupleArrayIndex.append(c[0])

      num = len(presidents[pres]['termList'])
      for c in range(num):
        try:
          tempWord = presidents[pres]['termList'][c]
          idx = tupleArrayIndex.index(tempWord)
          wordData = {'count': wordTuples[idx][1]}
          dataObj[tempWord] = wordData
        except ValueError: #
          x = 0

      # /// Create collocation data for a given word \\\
      for word in dataObj: # presidents[president][date] looks like {"barack": {"February 12, 2009": {"word": {"count": 20}}}}
        collocates = {}
        concordList = speeches[year[0]].concordance(word)
        collocateList = mostCommonWords(concordList).most_common(6) # generate an array of tuples, ('collocate', count)
        collocateList = [w for w in collocateList if w[0] != word]    
        for collocate in collocateList:
          collocates[collocate[0]] = collocate[1]
        dataObj[word]['collocates'] = collocates
    
      presidents[pres][year[0]] = dataObj

    del presidents[pres]['termList']
    
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
