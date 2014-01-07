angular.module('newSpeakApp')
.directive('bardir',['barChart', function(barChart) {
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
        	.style('width', '99%');

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
          	barChart.render(data, scope, element, attrs, svg);
          };//end of scope.render

      	}//end of link
    	};//end of return
}])
.directive('coldir',['collocationChart', function(collocationChart) {
	return {
		restrict: 'EA',
     // directive code
     scope: {
     	data: '=',
      onClick: '&' //parent execution binding
     },
     link: function(scope, element, attrs) {
        
        var svg = d3.select(element[0]).append("svg");
          
      	 // Browser onresize event
        window.onresize = function() {
          scope.$apply();
        };

        // watch for data changes and re-render
  			scope.$watch('data', function(newVals, oldVals) {
          if (!newVals) { return; }
  			  scope.render(newVals, scope, element, attrs, svg);
  			}, true);

        scope.render = function(data, scope, element, attrs, svg) {
        	collocationChart.render(data, scope, element, attrs, svg);
        };//end of scope.render

    	}//end of link
    };//end of return
}])
.directive('freqdir',['frequencyChart', function(frequencyChart) {
	return {
		restrict: 'EA',
     // directive code
     scope: {
     	data: '='
     },
     link: function(scope, element, attrs) {
        
        var svg = d3.select(element[0]).append('svg');

        // Watch for resize event
        scope.$watch(function() {
          return angular.element(window)[0].innerWidth;
        }, function() {
          scope.render(scope.data, scope, element, attrs, svg);
        });

        // watch for data changes and re-render
				scope.$watch('data', function(newVals, oldVals) {
				  scope.render(newVals, scope, element, attrs, svg);
				}, true);

        scope.render = function(data, scope, element, attrs, svg) {
        	frequencyChart.render(data, scope, element, attrs, svg);
        };//end of scope.render

    	}//end of link
  	};//end of return
}]);//end of directive

