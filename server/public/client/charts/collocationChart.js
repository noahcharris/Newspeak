angular.module('newSpeakApp')
.factory('collocationChart', function() {

	var service = {};
	service.render = function(data, scope, element, attrs, svg) {

		//data gets changed on click events (not sure why). this guarantees data doesnt change
		var tempData = JSON.stringify(data);
		var getRoot = function() {
			return JSON.parse(tempData);
		}; //end of get root


		// Returns a list of all nodes under the root.
		var flatten = function (root) {
			var
				nodes = [],
				i 		= 0;

			var recurse = function (node) {
				if (node.children) { node.children.forEach(recurse); }
				if (!node.id) { node.id = ++i; }
				nodes.push(node);
			};

			recurse(root);
			return nodes;
		};



		var update = function (root) {
			
			var nodes = flatten(root),
			links = d3.layout.tree().links(nodes);

		  // Restart the force layout.
		  force
		  .nodes(nodes)
		  .links(links)
		  .start();

		  // Update links.
		  link = link.data(links, function(d) { return d.target.id; });

		  link.exit().remove();

		  link.enter().insert("line", ".node")
		  .attr("class", "link")
		  .attr("x1", 480)
      .attr("y1", 250)
      .attr("x2", 480)
      .attr("y2", 250)
      .transition().duration(1500)
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

		  // Update nodes.
		  node = node.data(nodes, function(d) { return d.id; });

		  node.exit().remove();

		  var nodeEnter = node.enter().append("g")
		  .attr("class", "node")
		  .on("click", click)
		  .call(force.drag);

		  nodeEnter.append("circle")
		  .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 30)
      .transition()
    		.duration(1500)
		  .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; });


		  nodeEnter.append("text")
		  .attr("dy", ".35em")
		  .attr('x', function(d) { return d.x; })
		  .attr('y', function(d) { return d.y; })
		  .text(function(d) { return d.name; });

		  node.select("circle")
		  .style("fill", color);

		}; // end of update function

		//not doing tick event
		// var tick = function () {
		// 	link.attr("x1", 480)
		// 			.attr("y1", 250)
		// 			.attr("x2", function(d, i) {d = getRoot(); return d.children[i].target.x; })
		// 			.attr("y2", function(d, i) {d = getRoot(); return d.children[i].target.y; });

		// 	node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"; });
		// };

		// Color leaf nodes orange, and packages white or blue.
		var color = function (d) {
			return d._children ? "#3182bd" // collapsed package
      : d.children ? "#c6dbef" // expanded package
      : "#fd8d3c"; // leaf node
		};

		// Toggle children on click.
		var click = function (d) {
			if (!d3.event.defaultPrevented) {
				if (d.children) {
					d.children = null;
				} else {
					d = getRoot();
				}
				update(d);
			}
		};

		//some var declarations
		var width = 960,
		    height = 500;

		 
		var force = d3.layout.force()
			.linkDistance(80)
    	.charge(-120)
    	.gravity(.05)
			.size([width, height]);
			//not doing tick event
			//.on("tick", tick);


		var
			link = svg.selectAll(".link"),
			node = svg.selectAll(".node");

		//start the process
		root = getRoot();
		update(root);

  };//end of .render

  return service;
});