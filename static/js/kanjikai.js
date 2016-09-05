d3.json('static/data/large.json', function(response) {

//	originalData = JSON.parse(JSON.stringify(response));

	var data = response;
	var allKanji = '';
	for (i in data.nodes) {
		if (data.nodes[i].type === 'kanji') {
			allKanji += data.nodes[i].id
		}
	}

	function linkExists(kanji, reading, data) {
		var linkExists = false;
			for (i in data.links) {
				if ((data.links[i].source === kanji
						&& data.links[i].target === reading)
				   ||
				   (data.links[i].target === kanji
				   		&& data.links[i].source === reading))
				{ linkExists = true; }
			}
		return linkExists;
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
			//Remove either 'on' or 'kun' readings
			data.nodes = data.nodes.filter(function(obj) {
				return obj.type !== that.excludeReading && obj.type!== "unknown";
			});
			data.links = data.links.filter(function(obj) {
				return obj.type !== that.excludeReading && obj.type!== "unknown";
			});

			//Remove any kanji in the exclude list
			data.nodes = data.nodes.filter(function(obj) {
				return that.excludeKanji.indexOf(obj.id) === -1;
			});
			data.links = data.links.filter(function(obj) {
				return that.excludeKanji.indexOf(obj.source) === -1
						&& that.excludeKanji.indexOf(obj.target) === -1;
			});

/*			//Remove any kanji not in the include list if not ''
			if (this.includeKanji !== '') {
				includeKanjiList = that.includeKanji.split('')
				data.nodes = data.nodes.filter(function(obj) {
					readingNodeHasLink = includeKanjiList.map(function(item) {
						return linkExists(item, obj.id, data);
					});
					return (obj.type === 'kanji'
						&& that.includeKanji.indexOf(obj.id) !== -1)
					||
					(obj.type !== 'kanji'
						&& readingNodeHasLink.reduce(function(p, c) { return p || c; }))
					;
				});
				data.links = data.links.filter(function(obj) {
					return (that.includeKanji.indexOf(obj.source) !== -1
							|| that.includeKanji.indexOf(obj.target) !== -1);
				});
			}*/
			return data;
		}
	}

	var kanjiLimit = '日一人年大十二本中出三見月生五上四金九入学円子八六下気小七山女百先名川千水男校土木車白天火右左休立手力目田正文口町空雨足早字音花赤青村夕石竹森林王犬玉草耳虫糸貝';
	var includeKanji = allKanji;
	for (i in kanjiLimit) {
		includeKanji = includeKanji.replace(kanjiLimit[i], 's');
	}

	var preFilter = new Filter({excludeReading: '',
								excludeKanji: includeKanji});
	var kunFilter = new Filter({excludeReading: 'on',
								excludeKanji: ''});
	var onFilter = new Filter({excludeReading: 'kun',
								excludeKanji: ''});

	var data = (preFilter.process(data));

	var svg = d3.select('#content').append('svg');

	var width = 1000;
	var height = window.innerHeight * 0.8;

	var circleRadius = {
					'kanji': 4,
					'on': 8,
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