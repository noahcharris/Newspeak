d3.custom = {};

d3.custom.barChart = function module() {

  function exports(_selection) {
  	console.log(_selection);
    _selection.each(function(hello) {
    	console.log(hello);
			
			var generatoed = function(num){
			  var results = [];
			  for (var i = 0; i < num; i++) {
			    results[i] = [];
			    results[i][0] = Math.random() * width;
			    results[i][1] = Math.random() * height;
			  }
			  return results;
			};

    	var width = window.innerWidth * 0.75;
			var height = window.innerHeight * 0.75;
			var num = 50;

			var svg = d3.select(".chart").append("svg")
			.attr("width", width)
			.attr("height", height);

			var circles = svg.selectAll("circle").data(generatoed(num));
			circles.enter().append("circle")
		  .attr("cx", function(d) { return d[0]; })
		  .attr("cy", function(d) { return d[1]; })
		  .attr("r", 10)
		  .attr("class", "circles");


    });
  };
  return exports;
};