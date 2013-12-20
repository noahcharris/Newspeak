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
.directive('d3Bars',[ function() {
	return {
		restrict: 'EA',
     // directive code
     scope: {
     	data: '='
     },
     link: function(scope, element, attrs) {
        // our d3 code will go here
        var margin = parseInt(attrs.margin) || 20,
          barHeight = parseInt(attrs.barHeight) || 20,
          barPadding = parseInt(attrs.barPadding) || 5;
        
        var svg = d3.select(element[0])
        	.append('svg')
        	.style('width', '100%');

        	 // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

        	//hard-code data
        	// scope.data = [
        	// 	{name: "Greg", score: 98},
        	// 	{name: "Ari", score: 96},
        	// 	{name: "Q", score: 75},
        	// 	{name: "Loser", score: 48}
        	// ];

        	// Watch for resize event
        	//BC: not sure if this does anything??
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          // watch for data changes and re-render
					scope.$watch('data', function(newVals, oldVals) {
					  return scope.render(newVals);
					}, true);

          scope.render = function(data) {
            // our custom d3 code
            // remove all previous items before render
            svg.selectAll('*').remove();

				    // If we don't pass any data, return out of the element
				    if (!data) return;

				    // setup variables
				    var width = d3.select(element[0]).node().offsetWidth - margin,
				        // calculate the height
				        height = scope.data.length * (barHeight + barPadding),
				        // Use the category20() scale function for multicolor support
				        color = d3.scale.category20(),
				        // our xScale
				        xScale = d3.scale.linear()
				        .domain([0, d3.max(data, function(d) {
				        	return d.score;
				        })])
				        .range([0, width]);

				    // set the height based on the calculations above
				    svg.attr('height', height);

				    //create the rectangles for the bar chart
				    svg.selectAll('rect')
					    .data(data).enter()
					    .append('rect')
					    .attr('height', barHeight)
					    .attr('width', 140)
					    .attr('x', Math.round(margin/2))
					    .attr('y', function(d,i) {
					    	return i * (barHeight + barPadding);
					    })
					    .attr('fill', function(d) { return color(d.score); })
					    .transition()
					    .duration(1000)
					    .attr('width', function(d) {
					    	return xScale(d.score);
					    });
					  svg.selectAll('text')
					   .data(data)
					   .enter()
					   .append('text')
					   .attr('fill', '#fff')
					   .attr('y', function(d,i) {
					   	return i * (barHeight + barPadding) + 15;
					   })
					   .attr('x', 15)
					   .text(function(d) {
					   	return d.name + " (scored: " + d.score + ")";
					   });
          };//end of .render

      	}//end of link
    	};//end of return
}]);//end of directive

