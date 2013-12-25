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
.controller('collocationController', function ($scope, grabSOTUinfo, treeConvert) {
  //original array
  //temporary - change to null
  $scope.colData = {
      word: "democracy",
      size: 6,
      children: [
        {word: 'freedom', size: 5},
        {word: 'health care', size: 4, children: [
          {word: 'insurance', size: 5},
          {word: 'website', size: 4},
          {word: 'republican', size: 3},
          {word: 'hospital', size: 2},
          {word: 'healthcare.gov', size: 1}
        ]},
        {word: 'economy', size: 3},
        {word: 'michelle', size: 2},
        {word: 'putin', size: 1}
      ]
    };
  $scope.president = 'Barack Obama';
  $scope.word = '';
  
  $scope.getSotus = function(word) {
    debugger;
    grabSOTUinfo.collocation($scope.president, word)
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(parsed) {
      return treeConvert.arrayToObject(parsed);
    })
    .then(function(miniTree) {
      $scope.colData = treeConvert.insertOnTree(miniTree, $scope.colData, word);
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