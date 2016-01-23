function multiplyPoint (m1, point) {
	var ret = [];
	for (var i = 0; i < m1.length; i++) {
		var coord = 0;
		for (var j = 0; j < m1[0].length; j++) {
			coord += m1[i][j] * point[j];
		}
		ret.push(coord);
	}
	return ret;
}

function sin (angle) {
	return Math.sin(angle);
}

function cos (angle) {
	return Math.cos(angle);
}


var Point = (function (x, y, z) {
	return {
		x: x, 
		y: y, 
		z: z,
		subtract: function (p) {
			return new Point(x - p.x, y - p.y, z - p.z);
		},
		add: function (p) {
			return new Point(x + p.x, y + p.y, z + p.z);
		}
	};

})();

var Sphere = (function (radius, point) {
	
	return {
		radius:radius, 
		point:point,

		// precondition: angles in radians
		applyTransform: function (refPoint, x, y, z) {
			var matrix = [[cos(y)*cos(z), cos(z)*sin(x)*sin(y) - cos(x)*sin(z), cos(x)*cos(z)*sin(y) + sin(x)*sin(z)],
						  [cos(y)*sin(z), cos(x)*cos(z) + sin(x)*sin(y)*sin(z),-cos(z)*sin(x) + cos(x)*sin(y)*sin(z)],
						  [-sin(y)      , cos(y)*sin(x)                       , cos(x)*cos(y)                       ]];
			point = point.add(multiplyPoint(matrix, point.subtract(refPoint)));
		}
	};

})();

var Cylinder = (function (radius, startPoint, endPoint) {
	return {
		radius: radius,
		startPoint: startPoint,
		endPoint: endPoint,

		// precondition: angles in radius
		applyTransform: function (refPoint, x, y, z) {
			var matrix = [[cos(y)*cos(z), cos(z)*sin(x)*sin(y) - cos(x)*sin(z), cos(x)*cos(z)*sin(y) + sin(x)*sin(z)],
						  [cos(y)*sin(z), cos(x)*cos(z) + sin(x)*sin(y)*sin(z),-cos(z)*sin(x) + cos(x)*sin(y)*sin(z)],
						  [-sin(y)      , cos(y)*sin(x)                       , cos(x)*cos(y)                       ]];
			startPoint = startPoint.add(multiplyPoint(matrix, startPoint.subtract(refPoint)));
			endPoint = endPoint.add(multiplyPoint(matrix, endPoint.subtract(refPoint)));
		}
	}
})();
