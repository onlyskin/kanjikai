var height = 550;
var width = document.getElementById('content').clientWidth;
var currentIndex = 10;

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
	console.log(kToR);

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

		scrollingKanjiElements.enter()
		.append('text')
		.attr('id', 'scrollingKanji')
		.attr('y', scrollingKanjiY)
		.on('click', function(d) {
			currentIndex = allKanji.indexOf(d);
			update();
		})
			.merge(scrollingKanjiElements)
		.transition()
		.attr('x', function(d, i) {
			position = i - kanjiPerSide - extraKanji;
			return width / 2 + scrollSpacing * position;
		})
		.attr('opacity', function(d, i) {
			position = Math.abs(i - kanjiPerSide - extraKanji);
			opacityScale = d3.scaleLinear()
				.domain([0, kanjiPerSide])
				.range([0.4, 1e-6]);
			return opacityScale(position);
		})
		.attr('font-weight', function(d, i) {
			if ( i == kanjiPerSide + extraKanji ) {
				return 600;
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
		.attr('x', width / 2 - (kanjiPerSide + 1) * scrollSpacing)
		.attr('y', scrollingKanjiY)
		.text('←');

	var leftArrow = svg.append('text')
		.classed('scrollArrow', true)
		.attr('id', 'rightArrow')
		.attr('x', width / 2 + (kanjiPerSide + 1) * scrollSpacing)
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