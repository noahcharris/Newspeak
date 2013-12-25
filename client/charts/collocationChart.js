angular.module('newSpeakApp')
.factory('collocationChart', function() {

	var service = {};
	service.render = function(data, scope, element, attrs, svg) {
		

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
		  .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.source.x; })
      .attr("y2", function(d) { return d.source.y; })
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
					// scope.onClick({item: d});

					//because the placement of x coordinate changes, save the id and get correct placement
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

		var nodeMapping = function(data) {
			//set initial properties on tree (data comes in form of an array - need to manipulate for d3)
			var treeRoot = {};
			treeRoot.word = data[0]; // data[0] is the word that was sent for the get request
			//check for how many of it's branches also have branches. This will affect the size of each circle
			var	branched 			= 1, 
					branchedNodes = [];
			for (var i = 1; i < data.length; i++) {
				if (typeof data[i] === 'object') {
					branched++;
					branchedNodes.push(i);
				}
			}

			//set placement of root of tree; placement based off number of branches its children have
			treeRoot = placeRoot(treeRoot, branchedNodes);

			//set radius of root based off the window size (width and height)...
			//as well as based off the # of branches it's children have
			treeRoot.radius = 100 * (width / originalWidth) * (height / 600) * (1 / branched);
			
			treeRoot.children = []; //this will be an array of objects
			childrens = data.slice(1);	
			//set properties on each child
			for (var i = 0; i < childrens.length; i++) {
				debugger;
				//recurse if this branch has branches (i.e. is an array); else just make new object
				if (typeof childrens[i] === 'object') {
					treeRoot.children[i] = nodeMapping(childrens[i], branched);
				} else {
					//make object
					treeRoot.children[i] = {};
					//set word
					treeRoot.children[i].word = childrens[i];
				}
				//set radius - based off position in array...
				//(scales for width of window and number of other branches)
				treeRoot.children[i].radius = (childrens.length - i) * 18 * (width / originalWidth) * (1 / branched) + 10;
				//set position
				placement(i, treeRoot, branched);
			}
			return treeRoot;
		};

		var placeRoot = function (treeRoot, branchedNodes) {
			//original placement
			treeRoot.x = width/2 ;
			treeRoot.y = (height/2 - 100);

			var directionLeft, directionRight, directionUp, directionDown;
			for (var i = 0; i < branchedNodes.length; i++) {
				//only move in a particular direction once
				if (!directionLeft && placeRootMap[branchedNodes[i]].x === 'left') {
					directionLeft = true;
					treeRoot.x = treeRoot.x - width/4;
				} else if (!directionRight && placeRootMap[branchedNodes[i]].x === 'right') {
					directionRight = true;
					treeRoot.x = treeRoot.x + width/4;
				} else if (!directionUp && placeRootMap[branchedNodes[i]].y === 'up') {
					directionUp = true;
					treeRoot.y = treeRoot.y - height/4;
				} else if (!directionDown && placeRootMap[branchedNodes[i]].x === 'down') {
					directionDown = true;
					treeRoot.y = treeRoot.y + height/4;
				}
			}
			return treeRoot;
		};

		var placeRootMap = {
			1: {x: 'right', y: 'down'},
			2: {x: 'left', y: 'down'},
			3: {x: 'left', y: 'up'},
			4: {x: null, y: 'up'},
			5: {x: 'right', y: 'up'}
		}
		

		var placement = function (i, treeRoot, branched) {
			//from order in array, go clockwise starting from top left corner
			//scales for window size and number of other branches
			if (i === 0 || i === 4) { treeRoot.children[i].x = treeRoot.x - 280 * (treeRoot.x / (originalWidth * 0.5)) * (1 / branched); }
			if (i === 1 || i === 2) { treeRoot.children[i].x = treeRoot.x + 320 * (treeRoot.x / (originalWidth * 0.5)) * (1 / branched); }
			if (i === 3) { treeRoot.children[i].x = treeRoot.x - 30 * (treeRoot.x / (originalWidth * 0.5)) * (1 / branched); }

			if (i <= 1) { treeRoot.children[i].y = treeRoot.y - 50 * (treeRoot.y / 200) * (1 / branched); }
			if (i === 2 || i === 4) { treeRoot.children[i].y = treeRoot.y + 150 * (treeRoot.y / 200) * (1 / branched); }
			if (i === 3) { treeRoot.children[i].y = treeRoot.y + 225 * (treeRoot.y / 200) * (1 / branched); }

			//set target positions
			treeRoot.children[i].target = {
				x: treeRoot.children[i].x,
				y: treeRoot.children[i].y
			};
			treeRoot.children[i].source = {
				x: treeRoot.x,
				y: treeRoot.y
			}
		};
		//data gets changed on click events (not sure why). this guarantees data doesnt change
		var getRoot = function() {
			return JSON.parse(stringifiedTree);
		};

		//some var declarations
		var originalWidth = 1300;
		var width = window.innerWidth * .9;
		if (width > originalWidth) { width = originalWidth; }
		var height = 600;

		var stringifiedTree = JSON.stringify(nodeMapping(data));

		var force = d3.layout.force()
			.linkDistance(80)
    	.charge(-120)
    	.gravity(.05)
			.size([width, height]);
			//not doing tick event
			//.on("tick", tick);

		svg.selectAll('*').remove();
		svg.attr('width', width).attr("height", 600);

		var
			link = svg.selectAll(".link"),
			node = svg.selectAll(".node");

		//start the process
		root = getRoot();
		update(root);

  };//end of .render

  return service;
});