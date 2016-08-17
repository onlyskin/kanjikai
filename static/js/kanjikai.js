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
		{id: 'リツ', type: 'on'}
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
		{source: '立', target: 'リツ'}
	]
};

var nodes = data.nodes;
var links = data.links;

var svg = d3.select('#content').append('svg');

var width = 1000;
var height = window.innerHeight * 0.8;

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
        .scaleExtent([1, 10])
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

var link = g.append('g')
	  .attr('class', 'links')
	.selectAll('line')
	.data(links)
	.enter().append('line');

var node = g.append('g')
	  .attr('class', 'nodes')
	.selectAll('circle')
	.data(nodes);

var circleRadius = {'kanji': 4, 'on': 8}

var circles = node.enter().append('circle')
	  .attr('r', function(d) { return circleRadius[d.type] });

var text = node.enter().append('text')
	.text(function(d) { return d.id; })
	.attr('class', function(d) { return d.type; });

simulation
	.nodes(nodes)
	.on('tick', ticked);

simulation.force('link')
	.links(links);

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