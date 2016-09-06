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

			if (includeKanji !== '') {
				var includeReadings = [];
				for (i in includeKanji) {
					var kanji = includeKanji[i];
					includeReadings.push.apply(includeReadings, kToR[kanji]);
				}
				data.nodes = data.nodes.filter(function(obj) {
					return (that.includeKanji.indexOf(obj.id) !== -1
							||
							includeReadings.indexOf(obj.id) !== -1);
				});
				data.links = data.links.filter(function(obj) {
					return (that.includeKanji.indexOf(obj.source) !== -1
							&&
							includeReadings.indexOf(obj.target) !== -1);
				});
			}

			return data;
		}
	}

	var includeKanji = '日一国会人年大十二本中長出三同時政事自行社見月分議後前民生連五発間対上部東者党地合市業内相方四定今回新場金員九入選立開手米力学問高代明実円関決子動京全目表戦経通外最言氏現理調体化田当八六約主題下首意法不来作性的要用制治度務強気小七成期公持野協取都和統以機平総加山思家話世受区領多県続進正安設保改数記院女初北午指権心界支第産結百派点教報済書府活原先共得解名交資予川向際査勝面委告軍文反元重近千考判認画海参売利組知案道信策集在件団別物側任引使求所次水半品昨論計死官増係感特情投示変打男基私各始島直両朝革価式確村提運終挙果西勢減台広容必応演電歳住争談能無再位置企真流格有疑口過局少放税検藤町常校料沢裁状工建語球営空職証土与急止送援供可役構木割聞身費付施切由説転食比難防補車優夫研収断井何南石足違消境神番規術護展態導鮮備宅害配副算視条幹独警宮究育席輸訪楽起万着乗店述残想線率病農州武声質念待試族象銀域助労例衛然早張映限親額監環験追審商葉義伝働形景落欧担好退準賞訴辺造英被株頭技低毎医復仕去姿味負閣韓渡失移差衆個門写評課末守若脳極種美岡影命含福蔵量望松非撃佐核観察整段横融型白深字答夜製票況音申様財港識注呼渉達';

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
//	var data = onFilter.process(data);

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