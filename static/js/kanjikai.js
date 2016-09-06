d3.json('static/data/large.json', function(response) {

//	originalData = JSON.parse(JSON.stringify(response));

	var data = response;

	//sets up kanji to reading and reading to kanji dictionaries from the data
	var kToR = {};
	var rToK = {};
	for (i in data.nodes) {
		var node = data.nodes[i];
		if (node.type === 'kanji') {
			kToR[node.id] = [];
		}
		if (node.type !== 'kanji') {
			rToK[node.id] = [];
		}
	}
	for (i in data.links) {
		var link = data.links[i];
		kToR[link.source].push(link.target);
		rToK[link.target].push(link.source);
	}

	//Creates a custom filter function for changing the nodes/links object
	//excludeReading specifies either 'on' or 'kun' to be excluded
	//excludeKanji specifies a string of any number of kanji to be removed
	//includeKanji specifies a string of any number of kanji which are
	//  included to the exclusion of all others
	function Filter(settings) {
		this.excludeReading = settings.excludeReading;
		this.excludeKanji = settings.excludeKanji;
		this.includeKanji = settings.includeKanji;
		this.process = function(data) {
			var that = this;

			//Remove either 'on' or 'kun' (nodes)
			data.nodes = data.nodes.filter(function(obj) {
				return obj.type !== that.excludeReading && obj.type !== "unknown";
			});
			//Remove any kanji in the exclude list (nodes)
			data.nodes = data.nodes.filter(function(obj) {
				return that.excludeKanji.indexOf(obj.id) === -1;
			});

			//Removes any kanji not in the include list (nodes)
			if (that.includeKanji !== '') {
				var includeReadings = [];
				for (i in that.includeKanji) {
					var kanji = that.includeKanji[i];
					includeReadings.push.apply(includeReadings, kToR[kanji]);
				}
				data.nodes = data.nodes.filter(function(obj) {
					return (that.includeKanji.indexOf(obj.id) !== -1
							||
							includeReadings.indexOf(obj.id) !== -1);
				});
			}

			//builds list of kanji and reading nodes for filtering links at end
			kanjiNodes = data.nodes.filter(function(obj) {
				return obj.type === 'kanji';
			})
			.map(function(obj) { return obj.id; });

			readingNodes = data.nodes.filter(function(obj) {
				return obj.type === 'kun' || obj.type === 'on';
			})
			.map(function(obj) { return obj.id; });

			//removes any links whose source and target nodes are no
			//longer present (must be run at end of function)
			data.links = data.links.filter(function(obj) {
				return (kanjiNodes.indexOf(obj.source) !== -1
						&&
						readingNodes.indexOf(obj.target) !== -1);
			});

			return data;
		}
	}

	var includeKanji = '歳与違欧被渡含況突湾捜超療捕介迎販幅彼般舞込換占頼途抜伸爆普婚齢浮押倒了患絡募払昇遅香更抱恐戻巨震越企触依籍汚互沢逃援傾施緒跡駐紹井雇';

	var preFilter = new Filter({excludeReading: '',
								excludeKanji: '',
								includeKanji: includeKanji});
	var kunFilter = new Filter({excludeReading: 'on',
								excludeKanji: '',
								includeKanji: ''});
	var onFilter = new Filter({excludeReading: 'kun',
								excludeKanji: '',
								includeKanji: ''});

	var data = preFilter.process(data);
	var data = onFilter.process(data);

	var svg = d3.select('#content').append('svg');

	var width = 1000;
	var height = window.innerHeight * 0.8;

	var circleRadius = {
					'kanji': 8,
					'on': 4,
					'kun': 4
					};

	svg.attr('height', height)
	   .attr('width', '100%');

	svg.append("rect")
	    .attr("width", '100%')
	    .attr("height", height)
	//    .attr('stroke', 1)
	//    .attr('stroke', 'black')
	    .style("fill", "none")
	    .style("pointer-events", "all")
	    .call(d3.zoom()
	        .scaleExtent([1 / 20, 10])
	        .on("zoom", zoomed));

	function zoomed() {
	  g.attr("transform", d3.event.transform);
	}

	//resize svg when window size changes
	window.onresize = function() {
		svg.attr('height', window.innerHeight * 0.8);
	};

	var g = svg.append('g')
		.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

	var simulation = d3.forceSimulation()
		.force('link', d3.forceLink()
			.id(function(d) { return d.id; })
			.distance(30)
			)
		.force('charge', d3.forceManyBody().strength(-30))
		.force('collide', d3.forceCollide(35))
	//    .force('center', d3.forceCenter(width / 2, height / 2))
	    .stop();

	var linkGroup = g.append('g')
		  .attr('class', 'links');

	var nodeGroup = g.append('g')
		  .attr('class', 'nodes');

	function update() {

		simulation
			.nodes(data.nodes);

		simulation.force('link')
			.links(data.links);

		simulation.restart();

		var allLinks = linkGroup.selectAll('line')
			.data(data.links, function(d) { return d.source+'-'+d.target; });

		allLinks.exit().remove();

		newLinks = allLinks.enter().append('line')
			.attr('class', 'link');

		var pointGroup = nodeGroup.selectAll('.node')
			.data(data.nodes, function(d) { return d ? d.id : this.id; });

		pointGroup.exit().remove();

		var newNodeGroups = pointGroup.enter().append('g')
			  .attr('class', 'node');

		newNodeGroups.append('text')
			  .text(function(d) { return d.id; })
			  .attr('class', function(d) { return d.type; });

		newNodeGroups.append('circle')
			  .attr('r', function(d) { return circleRadius[d.type] });

		newNodeGroups.on('click', function(d, i) {
			  	var currentNode = this;
			  	var currentDatum = d;
			  	var fade = 0.1;

			  	nodeGroup.selectAll('circle')
			  		.filter( function(d,i) {
			  			var thisNode = (this == currentNode)
			  			var linkFound = false;
		  				for (var j = 0; j < data.links.length; j++)
		  					{ if ((data.links[j].target.id == currentDatum.id
		  						  &&
		  						  data.links[j].source.id == d.id)
		  						  ||
		  						  (data.links[j].source.id == currentDatum.id
		  						  &&
		  						  data.links[j].target.id == d.id)
		  						  )
		  						  { linkFound = true; }
		  					}
			  			return !thisNode && !linkFound;
			  		})
		  			.transition()
		  			.style('opacity', fade);

			  	nodeGroup.selectAll('text')
			  		.filter( function(d,i) {
			  			var thisNode = (this.parentNode == currentNode.parentNode)
			  			var linkFound = false;
		  				for (var j = 0; j < data.links.length; j++)
		  					{ if ((data.links[j].target.id == currentDatum.id
		  						  &&
		  						  data.links[j].source.id == d.id)
		  						  ||
		  						  (data.links[j].source.id == currentDatum.id
		  						  &&
		  						  data.links[j].target.id == d.id)
		  						  )
		  						  { linkFound = true; }
		  					}
		  				return !thisNode && !linkFound;
			  		})
		  			.transition()
		  			.style('opacity', fade);

			  	linkGroup.selectAll('line')
			  		.filter( function(d,i) {
			  			return (d.target.id != currentDatum.id);
			  		})
		  			.transition()
		  			.style('opacity', fade);

			  })

		newNodeGroups.on('blur', function() {
			  	nodeGroup.selectAll('circle').transition().style('opacity', 1);
			  	nodeGroup.selectAll('text').transition().style('opacity', 1);
			  	linkGroup.selectAll('line').transition().style('opacity', 1);
			  });

		var circles = nodeGroup.selectAll('circle');
		var text = nodeGroup.selectAll('text');
		var lines = linkGroup.selectAll('line');

		function ticked() {
		    lines
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    circles
		        .attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });

		    text
		        .attr("x", function(d) { return d.x; })
		        .attr("y", function(d) { return d.y; });
		}

		simulation
			.on('tick', ticked)
			.restart();
	};

	update();

});