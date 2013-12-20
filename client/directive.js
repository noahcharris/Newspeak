angular.module('newSpeakApp')
.directive('practice',['practiceChart', function(practiceChart) {
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
          	practiceChart.render(data, scope, element, attrs, svg);
          };//end of scope.render

      	}//end of link
    	};//end of return
}]);//end of directive

