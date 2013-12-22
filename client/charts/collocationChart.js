angular.module('newSpeakApp')
.factory('collocationChart', function() {

	var service = {};
	service.render = function(data, scope, element, attrs, svg) {
		svg.selectAll('*').remove();

		//data gets changed on click events (not sure why). this guarantees data doesnt change
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
			
			var
				nodes = flatten(root),
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
		  .attr("x1", width/2)
      .attr("y1", height/2 - 100)
      .attr("x2", width/2)
      .attr("y2", height/2 - 100)
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
		  .attr("r", function(d) { return d.radius; });


		  nodeEnter.append("text")
		  .attr("dy", ".35em")
		  .attr('x', function(d) { return d.x; })
		  .attr('y', function(d) { return d.y; })
		  .text(function(d) { return d.word; });

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
					//not correct placing but flow through for click event
					scope.onClick({item: d});
					var IDholder = d.id;
					d = getRoot();
					d.id = IDholder;
					d.children = null;
				} else {
					d = getRoot();
				}
				update(d);
			}
		};

		//some var declarations
		var width = d3.select(element[0]).node().offsetWidth;
		if (width > 960) { width = 960; }
		var height = 600;

		//set initial properties on tree (data comes in form of an array)
		var treeRoot = {};
		treeRoot.word = data[0];
		treeRoot.x = width/2;
		treeRoot.y = height/2 - 100;
		treeRoot.radius = 100 * (width / 960) * (height / 600);
		treeRoot.children = []; //this will be an array of objects
		childrens = data.slice(1);	
		for (var i = 0; i < childrens.length; i++) {
			//make object
			treeRoot.children[i] = {};
			//set word
			treeRoot.children[i].word = childrens[i];
			//set radius
			treeRoot.children[i].radius = (childrens.length - i) * 25 * (width / 960);
			//set position
			//from order in array, go clockwise starting from top left corner)
			if (i === 0 || i === 4) { treeRoot.children[i].x = treeRoot.x - 280 * (treeRoot.x / 480); }
			if (i === 1 || i === 2) { treeRoot.children[i].x = treeRoot.x + 320 * (treeRoot.x / 480); }
			if (i === 3) { treeRoot.children[i].x = treeRoot.x - 30 * (treeRoot.x / 480); }

			if (i <= 1) { treeRoot.children[i].y = treeRoot.y - 50 * (treeRoot.y / 200); }
			if (i === 2 || i === 4) { treeRoot.children[i].y = treeRoot.y + 150 * (treeRoot.y / 200); }
			if (i === 3) { treeRoot.children[i].y = treeRoot.y + 225 * (treeRoot.y / 200); }

			//set target positions
			treeRoot.children[i].target = {
				x: treeRoot.children[i].x,
				y: treeRoot.children[i].y
			};
		}

		var tempData = JSON.stringify(treeRoot);

		 
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