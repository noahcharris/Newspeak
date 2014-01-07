angular.module('newSpeakApp')
.factory('frequencyChart', function() {

  var service = {};
  service.render = function(data, scope, element, attrs, svg) {

  	var width 	= window.innerWidth * .4, //same as collocation chart
  			height 	= 500;
    svg.style("width", width);
    svg.attr("width", width).attr("height", height);

  	defaultChartConfig("frequencyChart", data);

		function defaultChartConfig(containerid, data, guideline, useDates, auxOptions) {
		  if (auxOptions === undefined) auxOptions = {};
		  if (guideline === undefined) guideline = true;
		  nv.addGraph(function() {
		    var chart;
		    chart = nv.models.lineChart().useInteractiveGuideline(guideline);

		    chart
		        .x(function(d,i) { 
		          return d.x;
		        });

		    if (auxOptions.width) 
		      chart.width(auxOptions.width);

		    if (auxOptions.height)
		      chart.height(auxOptions.height);

		    if (auxOptions.forceY) 
		      chart.forceY([0]);

		    var formatter;
		    if (useDates !== undefined) {
		        formatter = function(d,i) {
		                var now = (new Date()).getTime() - 86400 * 1000 * 365;
		                now = new Date(now + d * 86400 * 1000);
		                return d3.time.format('%b %d %Y')(now );
		        }
		    }
		    else {
		        formatter = d3.format(",1f");
		    }
		    chart.margin({right: 40});
		    chart.yAxis.axisLabelDistance(40);//brandon manually added this in to fix label on Y axis

		    chart.xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
		        .tickFormat(
		            formatter
		          )
		        .axisLabel('Year in Office');

		    chart.yAxis
		        .axisLabel('Voltage (v)')
		        .tickFormat(d3.format(',2f'));


		    d3.select('#' + containerid + ' svg')
		        .datum(data)
		      .transition().duration(500)
		        .call(chart);

		    nv.utils.windowResize(chart.update);

		    return chart;
		  });
		}

  };//end of .render

  return service;
});