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
  //temporary
 $scope.colData = {
        "name": "cluster",
        "x": 480,
        "y": 250,
        "children": [
          { "name": "AgglomerativeCluster",
            "size": 3938,
            "x": 200,
            "y": 200,
            "target": {
              "x": 200,
              "y": 200
            }
          },
          { "name": "CommunityStructure",
            "size": 3812,
            "x": 800,
            "y": 200,
            "target": {
              "x": 800,
              "y": 200
            }
          },
          { "name": "HierarchicalCluster",
            "size": 6714,
            "x": 800,
            "y": 400,
            "target": {
              "x": 800,
              "y": 400
            }
          },
          { "name": "MergeEdge",
            "size": 71743,
            "x": 200,
            "y": 400,
            "target": {
              "x": 200,
              "y": 400
            }
          }
        ]
      };
  $scope.president = 'Barack Obama';
  $scope.word = 'democracy';
  
  $scope.getSotus = function() {
    grabSOTUinfo.collocation($scope.president, $scope.word)
    .then(function(data) {
      // parses the data from string to JSON
      return JSON.parse(data);
    })
    .then(function(parsed) {
      // puts the data in the scope's sotu variable to be used for D3
      $scope.colData = parsed;
    });
  };
})
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