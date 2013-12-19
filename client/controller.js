angular.module('new')
.controller('MainController', function AppCtrl ($scope, grabSOTUinfo) {
	$scope.sotu = null;
	$scope.getData = function() {
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