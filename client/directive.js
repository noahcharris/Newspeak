angular.module('newSpeakApp')
// .directive('barChart', function(){
// 	var chart = d3.custom.barChart();
// 	return {
// 		restrict: 'EA',
// 		replace: true,
// 		template: '<div class="chart"></div>',
// 		scope:{
// 			data: '=data'
// 		},
// 		link: function(scope, element, attrs) {
// 			var chartEl = d3.select(element[0]);

// 			scope.$watch('data', function (newVal, oldVal) {
// 				chartEl.datum(newVal).call(chart);
// 			});
// 		}
// 	}
// })
.directive('d3Bars',['d3BarChart', function(d3BarChart) {
	return {
		restrict: 'EA',
     // directive code
     scope: {
     	data: '='
     },
     link: function(scope, element, attrs) {
        // our d3 code will go here
        
        var svg = d3.select(element[0])
        	.append('svg')
        	.style('width', '100%');

        	 // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

        	// Watch for resize event
        	//BC: not sure if this does anything??
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data, scope, element, attrs, svg);
          });

          // watch for data changes and re-render
					scope.$watch('data', function(newVals, oldVals) {
					  return scope.render(newVals, scope, element, attrs, svg);
					}, true);

          scope.render = function(data, scope, element, attrs, svg) {
          	d3BarChart.render(data, scope, element, attrs, svg);
          };//end of scope.render

      	}//end of link
    	};//end of return
}]);//end of directive

