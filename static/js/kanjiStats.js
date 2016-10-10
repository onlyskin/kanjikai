var height = 550;
var width = document.getElementById('content').clientWidth;
var currentIndex = 100;

var svg = d3.select('#content')
	.append('svg')
	.attr('height', height)
	.attr('width', width);

d3.json('static/data/large.json', function(response) {

	var data = preProcessData(response);

	var KRDICTS = makeDicts(data);
	var kToR = KRDICTS.kToR;
	var rToK = KRDICTS.rToK;
	var kToM = KRDICTS.kToM;

	var allKanji = [];
	for (i in kToR) {
		allKanji.push(i);
	}

	var s = function(a, b) {
		return orderedHeisigDict[a] - orderedHeisigDict[b];
	};
	allKanji.sort(s);

	var mainKanji = allKanji[currentIndex];
	var mainKanjiGroup = svg.append('g');

	var mainKanjiText = mainKanjiGroup.append('text')
		.attr('x', width / 2)
		.attr('y', height / 2)
		.attr('id', 'mainKanji');

	var mainKanjiMeaning = mainKanjiGroup.append('text')
		.attr('x', width / 2)
		.attr('y', height / 2 + 60)
		.attr('id', 'mainKanjiMeaning');

	kanjiPerSide = 9;
	extraKanji = 5;
	var scrollingKanji = [];
	var scrollingKanjiY = height - 40;
	var scrollSpacing = 30;
	var scrollWidth = 180;

	var scrollingKanjiGroup = svg.append('g');

	function update() {

		mainKanji = allKanji[currentIndex];
		mainKanjiText.text(mainKanji);
		mainKanjiMeaning.text(kToM[mainKanji]);



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
			console.log(d, i);
			if (i > extraKanji && i < kanjiPerSide * 2 + 1) {
				currentIndex = allKanji.indexOf(d);
				update();
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

	update();

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
			update();
		});

})