function multiplyPoint (m1, point) {
	var m2 = [point.x, point.y, point.z];
	var ret = [];

	for (var i = 0; i < m1.length; i++) {
		var coord = 0.0;
		for (var j = 0; j < m1[0].length; j++) {
			coord += m1[i][j] * m2[j];
		}
		ret.push(coord);
	}
	return new Point(ret[0], ret[1], ret[2]);
}

function sin (angle) {
	return Math.sin(angle);
}
 	
function cos (angle) {
	return Math.cos(angle);
}


var Point = function (x, y, z) {
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
};

var Sphere = function (radius, point) {
	return {
		radius:radius, 
		point:point,
		child: [],

		// precondition: angles in radians
		applyTransform: function (refPoint, x, y, z) {
			var matrix = [[cos(y)*cos(z), cos(z)*sin(x)*sin(y) - cos(x)*sin(z), cos(x)*cos(z)*sin(y) + sin(x)*sin(z)],
						  [cos(y)*sin(z), cos(x)*cos(z) + sin(x)*sin(y)*sin(z),-cos(z)*sin(x) + cos(x)*sin(y)*sin(z)],
						  [-sin(y)      , cos(y)*sin(x)                       , cos(x)*cos(y)                       ]];
			console.log(point.x + " " + point.y + " " + point.z);
			point = refPoint.add(multiplyPoint(matrix, point.subtract(refPoint)));
			console.log(point.x + " " + point.y + " " + point.z);
		}
	};

};

var Cylinder = function (radius, startPoint, endPoint) {
	return {
		radius: radius,
		startPoint: startPoint,
		endPoint: endPoint,
		child: [],

		// precondition: angles in radius
		applyTransform: function (refPoint, x, y, z) {
			var matrix = [[cos(y)*cos(z), cos(z)*sin(x)*sin(y) - cos(x)*sin(z), cos(x)*cos(z)*sin(y) + sin(x)*sin(z)],
						  [cos(y)*sin(z), cos(x)*cos(z) + sin(x)*sin(y)*sin(z),-cos(z)*sin(x) + cos(x)*sin(y)*sin(z)],
						  [-sin(y)      , cos(y)*sin(x)                       , cos(x)*cos(y)                       ]];
			startPoint = startPoint.add(multiplyPoint(matrix, startPoint.subtract(refPoint)));
			endPoint = endPoint.add(multiplyPoint(matrix, endPoint.subtract(refPoint)));
		}
	}
};
// head = 30 height
// body = 100 height, 40 width;
// upper-leg = 60 height, 20 width;
// lower-leg = 60 height, 20 width;
// upper-arm = 50 
var Person = function () {
	var head = new Sphere(15, new Point(0, 115, 0));
	var body = new Cylinder(20, new Point(0, 0, 0), new Point(0, 100, 0));
	var hip = new Sphere(0, new Point(0, 0, 0));
	
	var leftUpperLeg = new Cylinder(10, new Point(-10, 0, 0), new Point(-10, -60, 0));
	var rightUpperLeg = new Cylinder(10, new Point( 10, 0, 0), new Point( 10, -60, 0));
	
	var leftKnee = new Sphere(0, new Point(-10, -60, 0));
	var rightKnee = new Sphere(0, new Point(-10, 60, 0));

	var leftLowerLeg = new Cylinder(10, new Point(-10, 60, 0), new Point(-10, 120, 0));
	var rightLowerLeg = new Cylinder(10, new Point( 10, 60, 0), new Point( 10, 120, 0));

	var leftShoulder = new Sphere(0, new Point(-20, 90, 0));
	var rightShoulder = new Sphere(0, new Point(20, 90, 0));

	var leftUpperArm = new Cylinder(10, new Point(-20, 90, 0), new Point(-70, 90, 0));
	var rightUpperArm = new Cylinder(10, new Point(20, 90, 0), new Point(70, 90, 0));

	var leftElbow = new Sphere(0, new Point(-70, 90, 0));
	var rightElbow = new Sphere(0, new Point(70, 90, 0));

	var leftLowerArm = new Cylinder(10, new Point(-70, 90, 0), new Point(-120, 90, 0));
	var rightLowerArm = new Cylinder(10, new Point(70, 90, 0), new Point(120, 90, 0));

	hip.child.push(leftUpperLeg);
	hip.child.push(rightUpperLeg);
	hip.child.push(body);

	leftUpperLeg.child.push(leftKnee);
	rightUpperLeg.child.push(rightKnee);

	leftKnee.child.push(leftLowerLeg);
	rightKnee.child.push(rightLowerLeg);

	body.child.push(leftShoulder);
	body.child.push(rightShoulder);
	body.child.push(head);

	leftShoulder.child.push(leftUpperArm);
	rightShoulder.child.push(rightUpperArm);

	leftUpperArm.child.push(leftElbow);
	rightUpperArm.child.push(rightElbow);

	leftElbow.child.push(leftLowerArm);
	rightElbow.child.push(rightLowerArm);
	return {
		limbs: [hip, leftKnee, rightKnee, leftShoulder, rightShoulder, leftElbow, rightElbow]
	}
};

// precondition: angles in radians
var applyPersonTransform = function (refPoint, curr, x, y, z) {
	curr.applyTransform(refPoint, x, y, z);
	curr.child.forEach(function (next) {
  		applyPersonTransform(refPoint, next, x, y, z);
	});
}
