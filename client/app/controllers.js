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
    grabSOTUinfo.getTopWords(transferData.noSpacePresidents[$scope.presidents.indexOf($scope.president)])
    .then(function(data) {
      transferData.save(data, $scope.president, $scope.tempPresident);
      $scope.suggested = transferData.suggested;
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
    grabSOTUinfo.getTopWords(transferData.noSpacePresidents[$scope.presidents.indexOf($scope.president)])
    .then(function(data) {
      transferData.save(data, $scope.president, $scope.tempPresident);
    }).then(function() {
      $location.url('choices');
    });
  };
  $scope.barData;
  $scope.colData;
  $scope.freqData = [];
  $scope.tempPresident = transferData.tempPresident;
  $scope.president = transferData.president;
  $scope.word = transferData.word;
  $scope.presidents = transferData.presidents;
  
  $scope.getSotus = function(word, mainTree) {
    grabSOTUinfo.collocation(transferData.noSpacePresidents[$scope.presidents.indexOf($scope.president)], word)
    .then(function(data) {
      return treeConvert.arrayToObject(data);
    })
    .then(function(miniTree) {
      $scope.colData = treeConvert.insertOnTree(miniTree, mainTree, word);
    });//end of grabSOTUinfo.collocation

    grabSOTUinfo.frequency(transferData.noSpacePresidents[$scope.presidents.indexOf($scope.president)], word)
    .then(function(data) {
      if (data.length === 0) {
        $scope.freqData = $scope.freqData;
      } else {
        for (var d = 0; d < data.length; d++) {
          if (data[d] === null) {
            data = data.slice(0, d);
            break;
          }
        }
        $scope.freqData = graphConvert.addToGraphData(data, $scope.freqData);
      }
      $scope.barData = graphConvert.addToBarData($scope.freqData);
    });//end of grabSOTUinfo.frequency
  }; //end of $scope.getSotus
  $scope.getSotus($scope.word);
}); //end of collocationController