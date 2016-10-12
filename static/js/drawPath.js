//to go back inside drawPath at some point
var height = 550;
var width = document.getElementById('content').clientWidth;
var circleRadius = 60;
var angleBuffer = 20;
//to go back inside drawPath at some point
var pathData = [];
var mainPath = '';

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

	svg.append('g')
		.attr('transform', 'translate('+width/2+','+height/2+')')
		.append('path')
		.attr('id', 'mainPath');

}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
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
	mainPath = '';

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
		pathData.push({l: angleLeft, r: angleRight})
		}

	for (i in pathData) {
		var datum = pathData[i];
		var arcPath = describeArc(0, 0, circleRadius, datum.l, datum.r);
		mainPath += arcPath;
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
		
	}

	runTests();
	d3.select('#mainPath').attr('d', mainPath);

}

//	var path = ('M472 235 A 40 40 0 1 0492 235');
//	var pathElement = d3.select('#path');
//	pathElement.attr('d', path);