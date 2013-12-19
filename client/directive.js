angular.module('newSpeakApp')
.directive('barChart', function(){
	var chart = d3.custom.barChart();
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="chart"></div>',
		scope:{
			height: '=height',
			data: '=data',
			hovered: '&hovered'
		},
		link: function(scope, element, attrs) {
			var chartEl = d3.select(element[0]);
			chart.on('customHover', function(d, i){
				scope.hovered({args:d});
			});

			scope.$watch('data', function (newVal, oldVal) {
				chartEl.datum(newVal).call(chart);
			});

			scope.$watch('height', function(d, i){
				chartEl.call(chart.height(scope.height));
			})
		}
	}
})
.directive('chartForm', function(){
	return {
		restrict: 'E',
		replace: true,
		controller: function AppCtrl ($scope) {
			$scope.update = function(d, i){ $scope.data = randomData(); };
			function randomData(){
				return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
			}
		},
		template: '<div class="form">' +
		'Height: {{options.height}}<br />' +
		'<input type="range" ng-model="options.height" min="100" max="800"/>' +
		'<br /><button ng-click="update()">Update Data</button>' +
		'<br />Hovered bar data: {{barValue}}</div>'
	}
})
.directive('circlechart', function(){
	var chart = d3.custom.circleChart();
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="circleChart"></div>',
		scope:{
			circledata: '=circledata'
		},
		link: function(scope, element, attrs) {
			var chartEl = d3.select(element[0]);

			scope.$watch('circledata', function (newVal, oldVal) {
				console.log("bobyouncle",chartEl.datum(newVal))
				chartEl.datum(newVal).call(chart);
			});
		}
	}
});