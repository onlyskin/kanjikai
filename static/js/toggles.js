function setUpToggles(simulation) {

	manyBodyStrenghtInput = document.getElementById('manyBodyStrenghtInput');
	manyBodyStrenghtInput.onchange = function() {
		simulation.force('charge').strength(this.value);
		simulation.alpha(1).restart();
	};

	collideRadiusInput = document.getElementById('collideRadius');
	collideRadiusInput.onchange = function() {
		simulation.force('collide', d3.forceCollide(this.value));
		simulation.alpha(0.5).restart();
	};

	linkDistanceInput = document.getElementById('linkDistance');
	linkDistanceInput.onchange = function() {
		simulation.force('link').distance(this.value);
		simulation.alpha(1).restart();
	};

}