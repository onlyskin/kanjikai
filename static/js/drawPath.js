//to go back inside drawPath at some point
var height = 550;
var width = document.getElementById('content').clientWidth;
var circleRadius = 50;
var angleBuffer = 20;
//to go back inside drawPath at some point
var pathString = '';

function drawPathTest() {
	var svg = d3.select('svg');

	svg.append('g')
		.append('circle')
		.attr('id', 'leftIntersectTest')
		.attr('r', 3)
		.attr('fill', 'blue');

	svg.append('g')
		.append('circle')
		.attr('id', 'rightIntersectTest')
		.attr('r', 3)
		.attr('fill', 'blue');

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
	pathString = '';

	function getNodeCoordinates() {
		var nodeCoordinates = [];
		for (i in forceData.nodes) {
			node = forceData.nodes[i];
			if (node.fx === undefined) {
				var x = node.x;
				var y = node.y;
				var position = {x: x, y: y};
				nodeCoordinates.push(position);
			}
		}
		return nodeCoordinates;
	}

	//returns array of objs with l/r values for start
	//and end points of each arc
	function getArcAngles(nodeCoordinates) {
		var arcAngles = [];

		for (i in nodeCoordinates) {
			obj = nodeCoordinates[i];
			var c = obj.x - width / 2;
			var d = height / 2 - obj.y;
			var angle = getAngleFromNode(c, d);
			var angleLeft = normaliseAngle(angle - angleBuffer);
			var angleRight = normaliseAngle(angle + angleBuffer);
			var xy = xyIntersectFromAngle(angle);
			var xyLeft = xyIntersectFromAngle(angleLeft);
			var xyRight = xyIntersectFromAngle(angleRight);
			arcAngles.push({l: angleLeft, r: angleRight})
		}

		arcAngles.sort(function(a, b) {
			return a.l - b.l;
		});

		var tempArray = []
		for (i in arcAngles) {
			tempArray.push(arcAngles[i].l);
			tempArray.push(arcAngles[i].r);
		}
		tempArray.push(tempArray.shift());
		arcAngles = [];
		for (i= 0; i < tempArray.length; i += 2) {
			var obj = {l: tempArray[i], r: tempArray[i+1]}
			arcAngles.push(obj);
		}

		return arcAngles;
	}

	var nodeCoordinates = getNodeCoordinates();
	var arcAngles = getArcAngles(nodeCoordinates);
	var arcStrings = arcAngles.map(function(obj) {
		if (nodeCoordinates.length == 1) {
			return describeArc(0, 0, circleRadius, obj.l, obj.r, true)
		}
		else {
			return describeArc(0, 0, circleRadius, obj.l, obj.r)			
		};
	});	


	function buildPathString() {
		for (i = 0; i < arcStrings.length; i++) {
			pathString += arcStrings[i];
			var angleStart = (i == 0) ? arcAngles[arcAngles.length - 1].r : arcAngles[i-1].r;
			var angleEnd = arcAngles[i].l;
			var angleMid = (angleStart + angleEnd) / 2;
			if ( angleEnd < 90 && angleStart > 270 ) {
				var tempDiff = ((360 - angleStart) + angleEnd) / 2
				if ( 360 - angleStart > angleEnd) {
					angleMid = angleStart + tempDiff;
				} else {
					angleMid = angleEnd - tempDiff;
				}
			}
			var lineStart = polarToCartesian(0, 0, circleRadius, angleStart);
			var lineEnd = polarToCartesian(0, 0, circleRadius, angleEnd);
			var lineMid = polarToCartesian(0, 0, circleRadius+20, angleMid);
			pathString += ' L ' + lineMid.x + ' ' + lineMid.y + ' ';
			pathString += ' L ' + lineStart.x + ' ' + lineStart.y + ' ';
		}
	}

	buildPathString();

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

//	runTests();
	svg.append('g')
		.attr('transform', 'translate('+width/2+','+height/2+')')
		.append('path')
		.attr('id', 'mainPath');

	d3.select('#mainPath').attr('d', pathString);

}

//	var path = ('M472 235 A 40 40 0 1 0492 235');
//	var pathElement = d3.select('#path');
//	pathElement.attr('d', path);