# cd textparser
# node parse.js


from dataFunctions import *


def dataBuilder(stateOfUnionSpeeches):
  presidents = {}
  speeches = {}
  for SOTU in stateOfUnionSpeeches: # for a given speech object in the speeches array
    president = SOTU['president']
    president = president.replace(" ", "") # 'Barack Obama'
    president = president.replace(".", "") # 'HarrySTruman'
    if president not in presidents: # check to see if 'Barack Obama' is a key of the presidents dictionary
      presidents[president] = {} # if not, add it
    tempDate = SOTU['date']
    presidents[president][tempDate] = []
      # the date of the current SOTU will be the dictionary object for a given speech's output data
 
   #///////////// PROCESSING INTO DATA \\\\\\\\\\\\\\
    text = textProcessor(SOTU['speech']) # processing to make it workable
    # text = text.encode('ascii', 'ignore')
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
      #//// Create word data object for counts and add it to the speech data object \\\
      for i in range(50):
        if wordTuples[i][0] not in presidents[pres]['termList']:
          presidents[pres]['termList'].append(wordTuples[i][0])
      # results in an object like {'word1': {'count': 20},    


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
        except ValueError:
          x = 0
          # print pres + ' ' +  presidents[pres]['termList'][c] + ' not in speech'

      # /// Create collocation data for a given word \\\
      for word in dataObj: # presidents[president][date] looks like {"barack": {"February 12, 2009": {"word": {"count": 20}}}}
        collocates = {}
        concordList = speeches[year[0]].concordance(word)

        # if len(concordList) == 0:
          # print word
          # print dataObj[word] # a list of lines
          # print concordList
        collocateList = mostCommonWords(concordList).most_common(6) # generate an array of tuples, ('collocate', count)
        collocateList = [w for w in collocateList if w[0] != word]    
        for collocate in collocateList:
          collocates[collocate[0]] = collocate[1]
        dataObj[word]['collocates'] = collocates
    
      presidents[pres][year[0]] = dataObj

    del presidents[pres]['termList']
    

 # generate an array of tuples, ('collocate', count)


      # presidents[president][date][word]['collocates'] = collocates


      # // eventual method for removing single-occurrence collocates from the collocates list object \\\
      # for collocate in collocateList:
      #   if collocate[1] > 1:
      #     collocates[collocate[0]] = collocate[1]
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
