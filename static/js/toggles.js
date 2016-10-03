function setUpToggles(simulation, data, filters, onFilter, kunFilter, update, unfilter, reapplyFilters, romajiToggle) {

	romajiToggle.onchange = function() {
		d3.selectAll('.node text.on, text.kun')
		  .text(function(d) {
		  	if (romajiToggle.checked) { return kanaToRomaji(d.id); }
		  	else { return d.id; }
		  });
	};

	meaningsToggle.onchange = function() {
		d3.selectAll('.node text.meaning')
		  .text(function(d) {
		  	if (meaningsToggle.checked) { return d.meaning; }
		  });
	};

	var Kun = document.getElementById('Kun');
	Kun.onchange = function() {
		if (!this.checked) {
			data = onFilter.process(data);
			filters.on = true;
		}
		else {
			filters.on = false;
			unfilter();
			reapplyFilters();
		}
		update();
	};

	var On = document.getElementById('On');
	On.onchange = function() {
		if (!this.checked) {
			data = kunFilter.process(data);
			filters.kun = true;
		}
		else {
			filters.kun = false;
			unfilter();
			reapplyFilters();
		}
		update();
	};

	var manyBodyStrenghtInput = document.getElementById('manyBodyStrenghtInput');
	manyBodyStrenghtInput.onchange = function() {
		simulation.force('charge').strength(this.value);
		simulation.alpha(1).restart();
	};

	var collideRadiusInput = document.getElementById('collideRadius');
	collideRadiusInput.onchange = function() {
		simulation.force('collide', d3.forceCollide(this.value));
		simulation.alpha(0.5).restart();
	};

	var linkDistanceInput = document.getElementById('linkDistance');
	linkDistanceInput.onchange = function() {
		simulation.force('link').distance(this.value);
		simulation.alpha(1).restart();
	};

	var alphaDecayOffInput = document.getElementById('alphaDecayOff');
	alphaDecayOffInput.onchange = function() {
		if (this.checked) {
			simulation.alphaDecay(0);
		}
		else { simulation.alphaDecay(0.02276277904418933); }
	};

	var velocityDecayOffInput = document.getElementById('velocityDecayOff');
	velocityDecayOffInput.onchange = function() {
		if (this.checked) {
			simulation.velocityDecay(0);
		}
		else { simulation.velocityDecay(0.4); }
	};

}