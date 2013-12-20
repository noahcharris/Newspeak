angular.module('newSpeakApp')
.controller('MainController', function ($scope, grabSOTUinfo) {
	$scope.sotu = null;
  $scope.presidents = ['Obama', 'Bush'];
	$scope.greeting = "Resize the page to see the re-rendering";
  $scope.data = [
    {name: "Greg", score: 98},
    {name: "Ari", score: 96},
    {name: 'Q', score: 75},
    {name: "Loser", score: 48}
  ];
	$scope.getSotus = function() {
		grabSOTUinfo.collocation($scope.presidents)
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