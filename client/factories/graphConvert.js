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
    }//end of function

  };//end of service object
  
  return service;
});

/*
Data should be formatted like this:
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
*/