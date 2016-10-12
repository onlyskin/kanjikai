//to go back inside drawPath at some point
var height = 550;
var width = document.getElementById('content').clientWidth;
var circleRadius = 45;
var angleBuffer = 20;
//to go back inside drawPath at some point
var pathData = [];

function drawPathTest() {
	var svg = d3.select('svg');

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

	svg.append('g')
		.attr('transform', 'translate('+width/2+','+height/2+')')
		.attr('id', 'testArcs');

}

//returns correct xyIntersect object from any angle between
//0 and 360. The intersect is the point at which the line
//starting at 0,0 crosses the radius of the circle
function xyIntersectFromAngle(angle) {
	var xIntersect = circleRadius * Math.sin(degreesToRadians(angle));
	var yIntersect = circleRadius * Math.cos(degreesToRadians(angle));
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
	else if (angle > 359) { return angle - 360; }
	else { return angle; }
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

	var pathData = [];

	for (i in nodePositions) {
		obj = nodePositions[i];
		var c = obj.x - width / 2;
		var d = height / 2 - obj.y;
		var angle = getAngleFromNode(c, d);
		var angleLeft = normaliseAngle(angle - angleBuffer);
		var angleRight = normaliseAngle(angle + angleBuffer);
		var xy = xyIntersectFromAngle(angle);
		var xyLeft = xyIntersectFromAngle(angleLeft);
		var xyRight = xyIntersectFromAngle(angleRight);
		var xIntersect = xy.xIntersect;
		var yIntersect = xy.yIntersect;
		var xIntersectLeft = xyLeft.xIntersect;
		var yIntersectLeft = xyLeft.yIntersect;
		var xIntersectRight = xyRight.xIntersect;
		var yIntersectRight = xyRight.yIntersect;
		pathData.push({l: xyLeft, r: xyRight})
		}

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
		
		var paths = d3.select('#testArcs')
			.selectAll('path')
			.data(pathData);
			
			paths.enter()
			.append('path')
			.attr('fill', 'none')
			.attr('stroke', 'black')
			.merge(paths)
			.attr('d', function(d) {
				var startX = d.l.xIntersect;
				var startY = d.l.yIntersect;
				var endX = d.r.xIntersect;
				var endY = d.r.yIntersect;
				var space = angleBuffer * 2;
				var arcPath = ('M ' + startX + ',' + -startY +
						' A ' + space + ',' + space +
						' 0 0 1 ' + endX + ',' + -endY);
				console.log(arcPath);
				return arcPath;
			});

			paths.exit().remove();
	}

		runTests();

}

//	var path = ('M472 235 A 40 40 0 1 0492 235');
//	var pathElement = d3.select('#path');
//	pathElement.attr('d', path);