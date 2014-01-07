angular.module('newSpeakApp')
.controller('MainController', function ($scope, $location, grabSOTUinfo, transferData, navBar) {
  navBar.highlight();
  $scope.presidents = transferData.presidents;
  $scope.tempPresident = transferData.tempPresident;
  $scope.president = transferData.president;
  $scope.suggested = transferData.suggested;
  if ($scope.suggested === null && $location.$$url === '/choices') {
    $location.url('/');
  }
  $scope.setPres = function(pres) {
    $scope.president = pres;
    grabSOTUinfo.getTopWords($scope.president)
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(parsed) {
      transferData.save(parsed, $scope.president, $scope.tempPresident);
    }).then(function() {
      $location.url('choices');
    });
  };
  $scope.sendData = function(word) {
    transferData.saveWord(word);
    $location.url('charts');
  };
})
.controller('collocationAndFrequencyController', function ($scope, $location, grabSOTUinfo, treeConvert, graphConvert, transferData, navBar) {
  navBar.highlight();
  $scope.startOver = function(pres) {
    $scope.president = pres;
    grabSOTUinfo.getTopWords($scope.president)
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(parsed) {
      transferData.save(parsed, $scope.president, $scope.tempPresident);
    }).then(function() {
      debugger;
      $location.url('choices');
    });
  };
  $scope.barData = [
    {word: "Greg", total: 98},
    {word: "Ari", total: 96},
    {word: 'Q', total: 75},
    {word: "Loser", total: 48},
    {word: "bob", total: 58}
  ];
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
  $scope.tempPresident = transferData.tempPresident;
  $scope.president = transferData.president;
  $scope.word = transferData.word;
  $scope.getSotus = ($scope.word);
  var series1 = [{x:1, y: 400}, {x:2, y: 30}, {x:3, y: 905}, {x:4, y: 150}];
  var series2 = [{x:1, y: 800}, {x:2, y: 300}, {x:3, y: 95}, {x:4, y: 550}];
  var series3 = [{x:1, y: 100}, {x:2, y: 320}, {x:3, y: 50}, {x:4, y: 550}];
  $scope.freqData = [{values: series1, key: "democracy"},{values: series2, key: 'freedom'},{values: series3, key: 'onemore'}];
  $scope.presidents = transferData.presidents;
  
  $scope.getSotus = function(word, mainTree) {
    grabSOTUinfo.collocation($scope.president, word)
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(parsed) {
      return treeConvert.arrayToObject(parsed);
    })
    .then(function(miniTree) {
      $scope.colData = treeConvert.insertOnTree(miniTree, mainTree, word);
    });//end of grabSOTUinfo.collocation

    grabSOTUinfo.frequency($scope.president, word)
    .then(function(data) {
      return JSON.parse(data);
    })
    .then(function(parsed) {
      $scope.freqData = graphConvert.addToGraphData(parsed, $scope.freqData);
      $scope.barData = graphConvert.addToBarData($scope.freqData);
    });//end of grabSOTUinfo.frequency

  }; //end of $scope.getSotus
}); //end of collocationController