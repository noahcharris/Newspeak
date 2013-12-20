angular.module('newSpeakApp')
.controller('MainController', function AppCtrl ($scope, grabSOTUinfo) {
	$scope.test = "yoyo";
	$scope.sotu = null;
	$scope.data = [1,2,3,4];
	$scope.getSotus = function() {
		grabSOTUinfo.grabInfo()
  	.then(function(data) {
  		// parses the data from string to JSON
  		return JSON.parse(data);
  	})
  	.then(function(xml) {
  		// puts the data in the scope's sotu variable to be used for D3
  		$scope.sotu = data;
  	});
	};
});