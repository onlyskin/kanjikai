//to go back inside drawPath at some point
var height = 550;
var width = document.getElementById('content').clientWidth;
var circleRadius = 45;
var angleBuffer = 1;
//to go back inside drawPath at some point

function drawPathTest() {
	var svg = d3.select('svg');

	svg.append('g')
		.append('circle')
		.attr('id', 'radiusTest')
		.attr('cx', width / 2)
		.attr('cy', height / 2)
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.attr('fill', 'none')
		.attr('r', circleRadius);

	svg.append('g')
		.append('circle')
		.attr('id', 'IntersectTest')
		.attr('r', 5)
		.attr('fill', 'red');

	svg.append('g')
		.append('circle')
		.attr('id', 'leftIntersectTest')
		.attr('r', 5)
		.attr('fill', 'blue');

	svg.append('g')
		.append('circle')
		.attr('id', 'rightIntersectTest')
		.attr('r', 5)
		.attr('fill', 'blue');
}

function xyIntersect(lineGradient, polarity) {
	var xIntersect = Math.sqrt(
		(Math.pow(circleRadius, 2))/(1 + Math.pow(lineGradient, 2))
		);
	if (polarity < 0) {xIntersect *= -1}
	var yIntersect = lineGradient * xIntersect;
	return {xIntersect: xIntersect, yIntersect: yIntersect};
}

function getAngleFromNode(c, d) {
	var angle = 0;
	if (c >= 0 && d >= 0) { angle = (Math.atan(c/d))*(180/Math.PI); }
	else if (c >= 0 && d < 0) { angle = (Math.atan(-d/c))*(180/Math.PI) + 90; }
	else if (c < 0 && d < 0) { angle = (Math.atan(-c/-d))*(180/Math.PI) + 180; }
	else if (c < 0 && d >= 0) { angle = (Math.atan(d/-c))*(180/Math.PI) + 270; }
	return angle;
}

function normaliseAngle(angle) {
	if (angle < 0) { return angle + 360; }
	else if (angle > 360) { return angle - 360; }
	else { return angle; }
}

function polarityFromAngle(angle) {
	if (angle <= 180) { return -1; }
	else { return 1; }
}

function drawPath(forceData) {

	var centralNodePosition = {x: width / 2, y: height / 2};
	var nodePositions = [];
	for (i in forceData.nodes) {
		node = forceData.nodes[i];
		if (node.fx === undefined) {
			var x = node.x;
			var y = node.y;
			var position = {x: x, y: y};
			nodePositions.push(position);
		}
	}

	for (i in nodePositions) {
		if (i == 0) {
		obj = nodePositions[i];
		var c = obj.x - width / 2;
		var d = height / 2 - obj.y;
		var angle = getAngleFromNode(c, d);
		var angleLeft = normaliseAngle(angle - 20);
		var angleRight = normaliseAngle(angle + 20);
		var gradientLeft = Math.tan(degreesToRadians(angleLeft));
		var gradientRight = Math.tan(degreesToRadians(angleRight));
		var xyLeft = xyIntersect(gradientLeft, polarityFromAngle(angleLeft));
		var xyRight = xyIntersect(gradientRight, polarityFromAngle(angleRight));
		var xIntersectLeft = xyLeft.xIntersect;
		var yIntersectLeft = xyLeft.yIntersect;
		var xIntersectRight = xyRight.xIntersect;
		var yIntersectRight = xyRight.yIntersect;
		var lineGradient = ((0 - d)
							/
							(0 - c));
		polarity = c
		xy = xyIntersect(lineGradient, polarity);
		xIntersect = xy.xIntersect;
		yIntersect = xy.yIntersect;
		console.log(
			'width/2', Math.round(width / 2),
			'height/2', Math.round(height / 2),
			'c', Math.round(c),
			'd', Math.round(d),
			'angleLeft', angleLeft,
			'angle', angle,
			'angleRight', angleRight,
			'gradientLeft', gradientLeft,
			'gradient', lineGradient,
			'gradientRight', gradientRight,
			'xIntersectLeft', xIntersectLeft,
			'yIntersectLeft', yIntersectLeft,
			'xIntersect', xIntersect,
			'yIntersect', yIntersect,
			'xIntersectRight', xIntersectRight,
			'yIntersectRight', yIntersectRight
			);

		function runTests() {
			d3.select('#IntersectTest')
				.attr('cx', width/2 + xIntersect)
				.attr('cy', height/2 + -yIntersect);
			d3.select('#leftIntersectTest')
				.attr('cx', width/2 + xIntersectLeft)
				.attr('cy', height/2 + -yIntersectLeft);
			d3.select('#rightIntersectTest')
				.attr('cx', width/2 + xIntersectRight)
				.attr('cy', height/2 + -yIntersectRight);
		}
		runTests();
		}
//		obj.radiusIntersectX = 50;
//		obj.radiusIntersectY = 100;
	}

//	var path = ('M472 235 A 40 40 0 1 0492 235');
//	var pathElement = d3.select('#path');
//	pathElement.attr('d', path);
}