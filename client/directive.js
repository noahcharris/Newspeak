angular.module('newSpeakApp')
.directive('barChart', function(){
	var chart = d3.custom.barChart();
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="chart"></div>',
		scope:{
			data: '=data'
		},
		link: function(scope, element, attrs) {
			var chartEl = d3.select(element[0]);

			scope.$watch('data', function (newVal, oldVal) {
				chartEl.datum(newVal).call(chart);
			});
		}
	}
});