angular.module('newSpeakApp')
.controller('MainController', function ($scope) {
  $scope.test = 'this worked!';
  $scope.greeting = "Resize the page to see the re-rendering";
  $scope.data = [
    {name: "Greg", score: 98},
    {name: "Ari", score: 96},
    {name: 'Q', score: 75},
    {name: "Loser", score: 48}
  ];
})
.controller('collocationController', function ($scope, grabSOTUinfo) {
  //temporary - change to null
  $scope.colData = {
      "name": "flare",
      "children": [
      {
        "name": "analytics",
        "children": [
        {
          "name": "cluster",
          "children": [
          {"name": "AgglomerativeCluster", "size": 3938},
          {"name": "CommunityStructure", "size": 3812},
          {"name": "HierarchicalCluster", "size": 6714},
          {"name": "MergeEdge", "size": 743}
          ]
        },
        {
          "name": "graph",
          "children": [
          {"name": "BetweennessCentrality", "size": 3534},
          {"name": "LinkDistance", "size": 5731},
          {"name": "MaxFlowMinCut", "size": 7840},
          {"name": "ShortestPaths", "size": 5914},
          {"name": "SpanningTree", "size": 3416}
          ]
        },
        {
          "name": "optimization",
          "children": [
          {"name": "AspectRatioBanker", "size": 7074}
          ]
        }
        ]
      }
      ]
    };
  $scope.president = 'Barack Obama';
  $scope.word = '';
  $scope.nodeWords = [];
  $scope.checkWord = function(item) {
    if (nodeWords.indexOf(item.word) === -1) {
      $scope.getSotus(item.word);
    }
  };

  $scope.inputOnCorrectNode = function(colData, moreNodes) {
    for (var i = 0; i < colData.length; i++ ) {
      if (typeof colData[i] === 'object') {
        inputOnCorrectNode(colData[i], moreNodes);
      } else if (colData[i] === moreNodes[0]) {
          //replace the word in $scope.colData with a new array of words
          colData[i] = moreNodes;
      }
    }
  };
  
  $scope.getSotus = function(word) {
    grabSOTUinfo.collocation($scope.president, word)
    .then(function(data) {
      // parses the data from string to JSON
      return JSON.parse(data);
    })
    .then(function(parsed) {
      // puts the data in the scope's sotu variable to be used for D3
      $scope.nodeWords.push(parsed[0]);
      if (!$scope.colData) {
        $scope.colData = parsed;
      } else {
        inputOnCorrectNode($scope.colData, parsed);
      }
    });
  };
}) //end of collocationController
.controller('frequencyController', function ($scope, grabSOTUinfo) {
  $scope.freqData;
  $scope.president = 'Barack Obama';
  $scope.word = 'democracy';
  
  $scope.getSotus = function() {
    grabSOTUinfo.frequency($scope.president, $scope.word)
    .then(function(data) {
      // parses the data from string to JSON
      return JSON.parse(data);
    })
    .then(function(parsed) {
      // puts the data in the scope's sotu variable to be used for D3
      $scope.freqData = parsed;
    });
  };
});