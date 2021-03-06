function make_force_layout(layout_initial_kanji_list) {
	d3.json('static/data/large.json', function(response) {

		//removes undefined type nodes from the data
		var data = preProcessData(response);
		var originalData = JSON.parse(JSON.stringify(data));

		//sets up kanji to reading and reading to kanji dictionaries from the data
		var KRDICTS = makeDicts(data);
		var kToR = KRDICTS.kToR;
		var rToK = KRDICTS.rToK;

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
					if (typeof obj.source === 'string') {
						return (kanjiNodes.indexOf(obj.source) !== -1
								&&
								readingNodes.indexOf(obj.target) !== -1);
					}
					else {
						return (kanjiNodes.indexOf(obj.source.id) !== -1
								&&
								readingNodes.indexOf(obj.target.id) !== -1);
					}
				});
				return data;
			}
		}

		var kunFilter = new Filter({excludeReading: 'on',
									excludeKanji: '',
									includeKanji: ''});
		var onFilter = new Filter({excludeReading: 'kun',
									excludeKanji: '',
									includeKanji: ''});

		//Creates a new type of filter function which takes no settings argument
		//this filter's process method takes the data and a string of kanji to include
		//it returns the filtered data.
		function charFilter() {
			this.process = function(data, includeKanji) {

				var currentReadings = {};
				var currentKanji = {};

				//Removes any kanji not in the include list (nodes)
				if (includeKanji !== '') {
					for (i in includeKanji) {
						var kanji = includeKanji[i];
						currentKanji[kanji] = true;
						readings = kToR[kanji];
						for (i in readings) {
							currentReadings[readings[i]] = true;
						}
					}
					data.nodes = data.nodes.filter(function(obj) {
						return (currentKanji[obj.id] || currentReadings[obj.id]);
					});
				}

				//removes any links whose source and target nodes are no
				data.links = data.links.filter(function(obj) {
					if (typeof obj.source === 'string') {
						return (currentKanji[obj.source] &&	currentReadings[obj.target]);
					}
					else {
						return (currentKanji[obj.source.id] && currentReadings[obj.target.id]);
					}
				});
				return data;
			}
		}

		//simply instantiates a charfilter which we will use with the kanji
		//property on the filters object, I don't expect to create more of this
		//particular filter
		var kanjiFilter = new charFilter();

		filters.kanji = layout_initial_kanji_list;
		// check whether there is a kanjiInput element
		if (kanjiInput) {
			kanjiInput.value = filters.kanji;
		}
		data = kanjiFilter.process(data, filters.kanji);

		var svg = d3.select('#content').append('svg');

		var width = window.innerWidth * 0.8;
		var height = window.innerHeight * 0.8;

		svg.attr('height', height)
		   .attr('width', '100%');

		var zoom = d3.zoom()
		        .scaleExtent([1 / 20, 10])
		        .on("zoom", zoomed);

		var zoomOverlay = svg.append("rect");

		zoomOverlay.attr("width", '100%')
		    .attr("height", height)
		//    .attr('stroke', 1)
		//    .attr('stroke', 'black')
		    .style("fill", "none")
		    .style("pointer-events", "all")
		    .call(zoom);

		function zoomed() {
		  g.attr("transform", d3.event.transform);
		}

		//resize svg when window size changes
		window.onresize = function() {
			svg.attr('height', window.innerHeight * 0.8);
		};

		var g = svg.append('g')
			.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

		zoom.translateBy(zoomOverlay, width/2, height/2);

		var linkGroup = g.append('g')
			  .attr('class', 'links');

		var nodeGroup = g.append('g')
			  .attr('class', 'nodes');

		var simulation = d3.forceSimulation();

		simulation.nodes();
		simulation.force('center', d3.forceCenter(0, 0));
		simulation.force('charge', d3.forceManyBody().strength(-35)
			//uncommenting the line below
			//.distanceMax(-50)
			);
		simulation.force('collide', d3.forceCollide(45));
		simulation.on('tick', ticked);

		function ticked() {
		    linkGroup.selectAll('line')
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });

		    nodeGroup.selectAll('circle')
		        .attr("cx", function(d) { return d.x; })
		        .attr("cy", function(d) { return d.y; });

		    nodeGroup.selectAll('text')
		        .attr("x", function(d) { return d.x; })
		        .attr("y", function(d) { return d.y; });
		}

		function dragstarted(d) {
		  if (!d3.event.active) simulation.alphaTarget(0.1).restart();
		  d.fx = d.x;
		  d.fy = d.y;
		}

		function dragged(d) {
		  d.fx = d3.event.x;
		  d.fy = d3.event.y;
		}

		function dragended(d) {
		  if (!d3.event.active) simulation.alphaTarget(0);
		  d.fx = null;
		  d.fy = null;
		}

		function update() {

			simulation
				.nodes(data.nodes);

			simulation.force('link', d3.forceLink(data.links)
					.id(function(d) { return d.id; })
					.distance(0)
					.strength(function(link) {
						return 1;
					})
					);

			simulation.alpha(1).restart();

			//UPDATE SELECTION
			var nodes = nodeGroup
				.selectAll('g .node')
				.data(data.nodes, function(d) { return d.id; });

			//EXIT SELECTION
			nodes.exit()
				.remove();

			//ENTER SELECTION
			var nodesEnterSelection = nodes.enter()
				  .append('g')
				.attr('class', 'node');

			newCircleElements = nodesEnterSelection.append('g')
				  .attr('transform', 'translate(0,-3)')
				  	.append('circle')
				  .attr('r', function(d) { return circleRadius[d.type] });

			newTextElements = nodesEnterSelection.append('text')
				  .text(function(d) {
				  	if (romajiToggle.checked) { return kanaToRomaji(d.id); }
				  	else { return d.id; }
				  })
				  .attr('class', function(d) { return d.type; })
				  .call(d3.drag()
			          .on("start", dragstarted)
			          .on("drag", dragged)
			          .on("end", dragended));

			newMeaningElements = nodesEnterSelection.append('g')
				  .attr('transform', 'translate(0,22)')
					.append('text')
				  .text(function(d) { if (d.meaning && meaningsToggle.checked) { return d.meaning; } })
				  .attr('class', function(d) { return 'meaning'; });

			nodesEnterSelection.on('click', function(d, i) {
				var fade = 0.1;
			  	var currentNodeId = d.id;
			  	function getLinkedNodes(node) {
			  		return d.type === 'kanji' ? kToR[node.id] : rToK[node.id];
			  	};
			  	var linkedNodeIds = getLinkedNodes(d);
			  	var noFadeNodes = linkedNodeIds;
			  	noFadeNodes.push(currentNodeId);

			  	nodeGroup.selectAll('circle')
			  		.filter( function (d, i) {
			  			return noFadeNodes.indexOf(d.id) === -1;
			  		})
		  			.transition()
		  			.style('opacity', fade);

			  	nodeGroup.selectAll('text')
			  		.filter( function (d, i) {
			  			return noFadeNodes.indexOf(d.id) === -1;
			  		})
		  			.transition()
		  			.style('opacity', fade);

			  	linkGroup.selectAll('line')
			  		.filter( function (d, i) {
			  			return (noFadeNodes.indexOf(d.source.id) === -1
			  					||
			  					noFadeNodes.indexOf(d.target.id) === -1);
			  		})
		  			.transition()
		  			.style('opacity', fade);

			  })

			nodesEnterSelection.on('blur', function() {
			  	nodeGroup.selectAll('circle').transition().style('opacity', 1);
			  	nodeGroup.selectAll('text').transition().style('opacity', 1);
			  	linkGroup.selectAll('line').transition().style('opacity', 1);
			  });

			//UPDATE SELECTION
			var links = linkGroup
				.selectAll('g')
				.data(data.links, function(d) { return d.source.id+'-'+d.target.id; });

			//EXIT SELECTION
			links.exit()
				.remove();

			//ENTER SELECTION
			var linksEnterSelection = links.enter()
				  .append('g')
			  	.attr('class', 'link');

			// linksEnterSelection.append('line')
			// 	.attr('class', 'linkOuter');

			linksEnterSelection.append('line')
				.attr('class', 'linkInner');
		};

		update();

		//updates data so that any nodes/links that were filtered out are
		//put back, without altering the currently present data, usually
		//reapplyFilters will need to be called afterwards
		function unfilter() {
			simulation.stop()

			var currentNodes = data.nodes;
			data.nodes = originalData.nodes;
			var currentNodeIds = {};
			for (i in currentNodes) {
				currentNodeIds[currentNodes[i].id] = currentNodes[i];
			}

			for (i in data.nodes) {
				var id = data.nodes[i].id;
				if (currentNodeIds[id]) {
					data.nodes[i] = currentNodeIds[id];
				}
			}

			var currentLinks = data.links;
			data.links = originalData.links;
			var currentLinkIds = {};
			for (i in currentLinks) {
				var link = currentLinks[i];
				currentLinkIds[link.source.id + '-' + link.target.id] = link;
			}

			for (i in data.links) {
				var link = data.links[i];
				var id = link.source + '-' + link.target;
				if (currentLinkIds[id]) {
					link = currentLinkIds[id];
				}
			}

		}

		//refilters the data according to the current parameters on the
		//filters object - to be used after unfilter. The actually setting
		//of parameters on the filters object should be done outside
		//these two functions - e.g. by the onchange watcher for the UI
		function reapplyFilters() {

			if (filters.kanji !== '') { data = kanjiFilter.process(data, filters.kanji); }
			if (filters.on === true) { data = onFilter.process(data); }
			if (filters.kun === true) { data = kunFilter.process(data); }

			update();
		}

		setUpToggles(simulation, data, filters, onFilter, kunFilter, update, unfilter, reapplyFilters, kanjiFilter);

	});
}