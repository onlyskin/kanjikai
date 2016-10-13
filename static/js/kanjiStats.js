var romajiToggle = document.getElementById('romajiToggle');
var meaningsToggle = document.getElementById('meaningsToggle');

romajiToggle.onchange = function() {
	d3.selectAll('.node text.on, text.kun')
	  .text(function(d) {
	  	if (romajiToggle.checked) { return kanaToRomaji(d.id); }
	  	else { return d.id; }
	  });
};

var height = 550;
var width = document.getElementById('content').clientWidth;
var currentIndex = 600;

var svg = d3.select('#content')
	.append('svg')
	.attr('height', height)
	.attr('width', width);

var path = svg.append('g')
			  .append('path')
			  .attr('id', 'path');

//TESTING DRAWPATH
//drawPathTest();
//TESTING DRAWPATH

d3.json('static/data/large.json', function(response) {

	var data = preProcessData(response);

	var KRDICTS = makeDicts(data);
	var kToR = KRDICTS.kToR;
	var rToK = KRDICTS.rToK;
	var kToM = KRDICTS.kToM;

	var forceDicts = makeForceDicts(data);
	var idToNode = forceDicts.idToNode;
	var idToLinks = forceDicts.idToLinks;

	var allKanji = [];
	for (i in kToR) {
		allKanji.push(i);
	}

	var s = function(a, b) {
		return orderedHeisigDict[a] - orderedHeisigDict[b];
	};
	allKanji.sort(s);

	function currentKanji() {
		return allKanji[currentIndex];
	}

	var forceData = {nodes: [], links: []};

	function updateForceDataLevel1() {
		forceData.nodes = [];
		forceData.links = [];
		var currentK = currentKanji()
		mainNode = idToNode[currentK];
		mainNode.fx = width / 2;
		mainNode.fy = height / 2;
		forceData.nodes.push(idToNode[currentK]);
		forceData.links = forceData.links.concat(idToLinks[currentK]);
		for (i in forceData.links) {
			var target = forceData.links[i].target;
			forceData.nodes.push(idToNode[target]);
		}
		for (i in forceData.nodes) {
			forceData.nodes[i].x = width / 2;
			forceData.nodes[i].y = height / 2;
		}
	};

	updateForceDataLevel1();

	kanjiPerSide = 9;
	extraKanji = 5;
	var scrollingKanji = [];
	var scrollingKanjiY = height - 40;
	var scrollSpacing = 30;
	var scrollWidth = 180;

	var scrollingKanjiGroup = svg.append('g');

	var linkGroup = svg.append('g')
		  .attr('class', 'links');

	var nodeGroup = svg.append('g')
		  .attr('class', 'nodes');

	var simulation = d3.forceSimulation();
	simulation.nodes();
	simulation.force('charge', d3.forceManyBody().strength(40));
	simulation.force('collide', d3.forceCollide(60));
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

    	drawPath(forceData);
	}

	function updateForceLayout() {

		simulation
			.nodes(forceData.nodes);

		simulation.force('link', d3.forceLink(forceData.links)
				.id(function(d) { return d.id; }));

		simulation.alpha(1).restart();

		//UPDATE SELECTION
		var nodes = nodeGroup
			.selectAll('g .node')
			.data(forceData.nodes, function(d) { return d.id; });

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
			  .attr('cx', function(d,i) { return d.x })
			  .attr('cy', function(d,i) { return d.y })
			  .attr('r', 0)
			  .style('stroke', 'PowderBlue')
			  .style('stroke-width', 3);

		newTextElements = nodesEnterSelection.append('text')
			  .attr('x', function(d,i) { return d.x })
			  .attr('y', function(d,i) { return d.y })
			  .text(function(d) {
			  	if (romajiToggle.checked) { return kanaToRomaji(d.id); }
			  	else { return d.id; }
			  })
			  .attr('class', function(d) { return d.type; });

		newMeaningElements = nodesEnterSelection.append('g')
				.append('text')
			  .attr('x', width / 2)
			  .attr('y', height / 2)
			  .attr('transform', 'translate(0,28)')
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
			.data(forceData.links, function(d) { return d.source.id+'-'+d.target.id; });

		//EXIT SELECTION
		links.exit()
			.remove();

		//ENTER SELECTION
		var linksEnterSelection = links.enter()
			  .append('g')
		  	.attr('class', 'link');

		linksEnterSelection.append('line')
			.attr('class', 'linkOuter');

		linksEnterSelection.append('line')
			.attr('class', 'linkInner');
	};

	updateForceLayout();

	function updateScrollBar() {

		scrollingKanji = [];
		for (var i = currentIndex - kanjiPerSide - extraKanji; i <= currentIndex + kanjiPerSide + extraKanji; i++) {
			scrollingKanji.push(allKanji[i]);
		}

		var scrollingKanjiElements = scrollingKanjiGroup.selectAll('text')
			.data(scrollingKanji, function(d) { return d; });

		function toRadians (angle) {
			return angle * (Math.PI / 180);
		}
	
		function xIntersect(segmentNo) {
			var slices = kanjiPerSide * 2 + 1
			var angle = segmentNo * (180 / slices);
			var polarity = segmentNo < (slices / 2) ? -1 : 1;
			var xIntersect = Math.sqrt(1/(1+Math.pow(Math.tan(toRadians(angle)), 2)))*polarity;
			return xIntersect;
		}

		function xDiff(segmentNo) {
			var xStart = xIntersect(segmentNo);
			var xEnd = xIntersect(segmentNo + 1);
			return xEnd - xStart;
		}

		scrollingKanjiElements.enter()
		.append('text')
		.attr('id', 'scrollingKanji')
		.on('click', function(d, i) {
			if (i > extraKanji && i < kanjiPerSide * 2 + 1) {
				currentIndex = allKanji.indexOf(d);
				updateScrollBar();
				updateForceDataLevel1();
				updateForceLayout();
			}
		})
			.merge(scrollingKanjiElements)
		.transition()
		.attr('transform', function(d, i) {
			position = i - kanjiPerSide - extraKanji;
			var xTransform = ((xIntersect(i-5) + xIntersect(i-4)) / 2) * scrollWidth;
			x = width / 2 + xTransform;
			y = scrollingKanjiY;
			if (i < extraKanji || i > kanjiPerSide * 2 + 1 + extraKanji - 1) {
				return 'translate('+(width / 2 + scrollSpacing * position)+','+y+')';
			}
			scaleFactor = xDiff(i-5) / 0.1651586;
			return 'translate('+x+','+y+') scale('+scaleFactor+', 1)';
		})
		.attr('opacity', function(d, i) {
			position = Math.abs(i - kanjiPerSide - extraKanji);
			opacityScale = d3.scaleLinear()
				.domain([0, kanjiPerSide])
				.range([0.8, 1e-6]);
			return opacityScale(position);
		})
		.attr('font-weight', function(d, i) {
			if ( i == kanjiPerSide + extraKanji ) {
				return 400;
			}
		})
		.text(function(d) { return d; });

		scrollingKanjiElements.exit()
			.remove();

	};

	updateScrollBar();

	var leftArrow = svg.append('text')
		.classed('scrollArrow', true)
		.attr('id', 'leftArrow')
		.attr('x', width / 2 - scrollWidth - 20)
		.attr('y', scrollingKanjiY)
		.text('←');

	var leftArrow = svg.append('text')
		.classed('scrollArrow', true)
		.attr('id', 'rightArrow')
		.attr('x', width / 2 + scrollWidth + 20)
		.attr('y', scrollingKanjiY)
		.text('→');

	arrows = d3.selectAll('.scrollArrow')
		.on('click', function() {
			if (this.id == 'leftArrow') {
				currentIndex --;
			}
			else {
				currentIndex ++;
			}
			updateScrollBar();
			updateForceDataLevel1();
			updateForceLayout();
		});

})