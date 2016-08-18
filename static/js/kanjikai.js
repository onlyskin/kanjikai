var data = {
	nodes: [
		{id: '見', type: 'kanji'},
		{id: '千', type: 'kanji'},
		{id: '先', type: 'kanji'},
		{id: '赤', type: 'kanji'},
		{id: '石', type: 'kanji'},
		{id: '天', type: 'kanji'},
		{id: '点', type: 'kanji'},
		{id: '高', type: 'kanji'},
		{id: '円', type: 'kanji'},
		{id: '立', type: 'kanji'},
		{id: 'ケン', type: 'on'},
		{id: 'ゲン', type: 'on'},
		{id: 'セン', type: 'on'},
		{id: 'セキ', type: 'on'},
		{id: 'コク', type: 'on'},
		{id: 'テン', type: 'on'},
		{id: 'コウ', type: 'on'},
		{id: 'エン', type: 'on'},
		{id: 'リツ', type: 'on'},
		{id: 'みる', type: 'kun'},
		{id: 'ち', type: 'kun'},
		{id: 'さき', type: 'kun'},
		{id: 'あか', type: 'kun'},
		{id: 'いし', type: 'kun'},
		{id: 'あめ', type: 'kun'},
		{id: 'あま', type: 'kun'},
		{id: 'たかい', type: 'kun'},
		{id: 'まる', type: 'kun'},
		{id: 'たつ', type: 'kun'}
	],
	links: [
		{source: '見', target: 'ケン'},
		{source: '見', target: 'ゲン'},
		{source: '千', target: 'セン'},
		{source: '先', target: 'セン'},
		{source: '赤', target: 'セキ'},
		{source: '石', target: 'セキ'},
		{source: '石', target: 'コク'},
		{source: '天', target: 'テン'},
		{source: '点', target: 'テン'},
		{source: '高', target: 'コウ'},
		{source: '円', target: 'エン'},
		{source: '立', target: 'リツ'},
		{source: '見', target: 'みる'},
		{source: '千', target: 'ち'},
		{source: '先', target: 'さき'},
		{source: '赤', target: 'あか'},
		{source: '石', target: 'いし'},
		{source: '天', target: 'あめ'},
		{source: '天', target: 'あま'},
		{source: '高', target: 'たかい'},
		{source: '円', target: 'まる'},
		{source: '立', target: 'たつ'}
	]
};

removedData = {
	nodes: [],
	links: []
}

var nodes = data.nodes;
var links = data.links;

var svg = d3.select('#content').append('svg');

var width = 1000;
var height = window.innerHeight * 0.8;

var circleRadius = {'kanji': 4, 'on': 8, 'kun': 4};

svg.attr('height', height)
   .attr('width', '100%');

//resize svg when window size changes
window.onresize = function() {
	svg.attr('height', window.innerHeight * 0.8)
};

var g = svg.append('g');

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .call(d3.zoom()
        .scaleExtent([1 / 10, 10])
        .on("zoom", zoomed));

function zoomed() {
  g.attr("transform", d3.event.transform);
}

var simulation = d3.forceSimulation()
	.force('link', d3.forceLink()
		.id(function(d) { return d.id; })
		.distance(30)
		)
	.force('charge', d3.forceManyBody().strength(30))
	.force('collide', d3.forceCollide(35))
    .force('center', d3.forceCenter(width / 2, height / 2));

simulation
	.nodes(nodes)
	.stop();

simulation.force('link')
	.links(links);

function update() {
	var link = g.append('g')
		  .attr('class', 'links')
		.selectAll('line')
		.data(links)
		.enter().append('line');

	var node = g.append('g')
		  .attr('class', 'nodes')
		.selectAll('circle')
		.data(nodes);

	var circles = node.enter().append('circle')
		  .attr('r', function(d) { return circleRadius[d.type] });

	var text = node.enter().append('text')
		.text(function(d) { return d.id; })
		.attr('class', function(d) { return d.type; });

	function ticked() {
	    link
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

toggle = document.getElementById('readingToggle');
toggle.onchange = function() {
	//move any nodes in removedData back to data
	if (removedData.nodes.length > 0)
		{
		for (var i = removedData.nodes.length - 1; i >=0; i--)
			{data.nodes.push(removedData.nodes.splice(i, 1)); }
		}
	//move any links in removedData back to data
	if (removedData.links.length > 0)
		{
		for (var i = removedData.links.length - 1; i >=0; i--)
			{data.links.push(removedData.links.splice(i, 1)); }
		}
	console.log(data);
	console.log(removedData);
	//move all matching nodes from data to removedData
	for (var i = data.nodes.length - 1; i >= 0; i--)
		{ if (data.nodes[i].type == toggle.value)
			{ removedData.nodes.push(data.nodes.splice(i, 1)); }
		 }
	//move all matching links from data to removedData
	for (var i = data.links.length - 1; i >= 0; i--)
		{
			if (data.links[i].target.type == toggle.value)
				{ removedData.links.push(data.links.splice(i, 1)); }
		}
	console.log(data);
	console.log(removedData);
};