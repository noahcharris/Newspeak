angular.module('newSpeakApp')
.factory('graphConvert', function() {

  var service = {
    addToGraphData: function(newData, previousData) {
      
      var info = [];
      for (var i = 1; i < newData.length; i++) {
        info.push({x: i, y: newData[i]});
      }
      var newSeries = {values: info, key: newData[0]};
      previousData.push(newSeries);
      return previousData;
    },//end of function

    addToBarData: function (data) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        var tempTotal = 0;
        for (var a = 0; a < data[i].values.length; a++) {
          tempTotal += data[i].values[a].y;
        }
        result.push({word: data[i].key, total: tempTotal});
      }
      return result;
    }

  };//end of service object
  
  return service;
});

/*
Graph Data should be formatted like this:
function badDataSet() {
  var series1 = [], series2 = [];
  for(var i =0; i < 30; i++) {
    series1.push({x:i, y: i*0.3 + 12});
  }
  for(i = 0; i < 30; i += 5) {
    series2.push({x:i, y: i*0.7 + 8});
  }
  return [
      {values: series1, key:"Series 1"},
      {values: series2, key:"Series 2"}
  ];
}

Bar Data should be formatted like this:
  $scope.barData = [
    {name: "Greg", score: 98},
    {name: "Ari", score: 96},
    {name: 'Q', score: 75},
    {name: "Loser", score: 48},
    {name: "bob", score: 58}
  ];
*/