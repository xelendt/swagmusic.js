var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var cylindergeo = new THREE.CylinderGeometry(1, 1, 3, 8, 1, false, 0);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
var cylinder = new THREE.Mesh( cylindergeo, material );
//    scene.add(cylinder);
//scene.add( cube );

camera.position.z = 5;

// parent
/*parent = new THREE.Object3D();
scene.add( parent );

// pivots
var pivot1 = new THREE.Object3D();
var pivot2 = new THREE.Object3D();
var pivot3 = new THREE.Object3D();

pivot1.rotation.z = 0;
pivot2.rotation.z = 2 * Math.PI / 3;
pivot3.rotation.z = 4 * Math.PI / 3;

parent.add( pivot1 );
parent.add( pivot2 );
parent.add( pivot3 );

// mesh
var mesh1 = new THREE.Mesh( geometry, material );
var mesh2 = new THREE.Mesh( geometry, material );
var mesh3 = new THREE.Mesh( geometry, material );

mesh1.position.y = 1;
mesh2.position.y = 1;
mesh3.position.y = 1;

pivot1.add( mesh1 );
pivot2.add( mesh2 );
pivot3.add( mesh3 );
*/

// steps for success
// 1) create the parent
// 2) create the child
// 3) rotate the objects
// 4) add childs
// 5) create meshes
// 6) translate the objects
// 7) add meshes to the pivots

function libToThree( libObject ){

		

}


// all the body parts
var legGeometry = new THREE.CylinderGeometry( 10, 10, 60, 10, 1, false );		
var armGeometry = new THREE.CylinderGeometry( 10, 10, 50, 10, 1, false );		
var bodyGeometry = new THREE.CylinderGeometry( 20, 20, 100, 10, 1, false ); 
var headGeometry = new THREE.SphereGeometry( 15, 20, 20 ); 
var jointGeometry = new THREE.SphereGeometry( 10, 20, 20 ); 


// all the body geometry
//var p1 = new Person();

parent = new THREE.Object3D();
scene.add( parent );

//p1.limbs[0] 	// hip 
var hipJoint = new THREE.Object3D();
parent.add( hipJoint );

var LLegUpper = new THREE.Object3D();		hipJoint.add( LLegUpper ); 			var LLegUpperMesh = new Geometry( legGeometry, material );
var RLegUpper = new THREE.Object3D();		hipJoint.add( RLegUpper );			var RLegUpperMesh = new Geometry( legGeometry, material );
var LKnee = new THREE.Object3D();			LLegUpper.add( LKnee );				var LKneeMesh = new Geometry( jointGeometry, material );
var RKnee = new THREE.Object3D();			RLegUpper.add( RKnee );				var RKneeMesh = new Geometry( jointGeometry, material );
var LLegLower = new THREE.Object3D();		LKnee.add( LLegLower );				var LLegLowerMesh = new Geometry( legGeometry, material );
var RLegLower = new THREE.Object3D(); 		RKnee.add( RLegLower );				var RLegLowerMesh = new Geometry( legGeometry, material );				

var Body = new THREE.Object3D();			hipJoint.add( Body );				var BodyMesh = new Geometry( bodyGeometry, material );

var LShoulder = new THREE.Object3D();		Body.add( LShoulder );				var LShoulderMesh = new Geometry( jointGeometry, material );
var RShoulder = new THREE.Object3D();		Body.add( RShoulder );				var RShoulderMesh = new Geometry( jointGeometry, material );

var LArmUpper = new THREE.Object3D();		LShoulder.add( LArmShoulder );		var LArmUpperMesh = new Geometry( armGeometry, material );
var RArmUpper = new THREE.Object3D();		RShoulder.add( RArmShoulder );		var RArmUpperMesh = new Geometry( armGeometry, material );
var LElbow = new THREE.Object3D();			LArmUpper.add( LElbow );			var LElbowMesh = new Geometry( jointGeometry, material );
var RElbow = new THREE.Object3D();			RArmUpper.add( RElbow );			var RElbowMesh = new Geometry( jointGeometry, material );
var LArmLower = new THREE.Object3D();		LElbow.add( LArmLower );			var LArmLowerMesh = new Geometry( armGeometry, material );
var RArmLower = new THREE.Object3D();		RElbow.add( RArmLower );			var RArmLowerMesh = new Geometry( armGeometry, material );

var Head = new THREE.Object3D();			Body.add( Head );					var HeadMesh = new Geometry( headGeometry, material );



var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	
	cylinder.rotation.z += 0.05;
	
	/*
	parent.rotation.z += 0.05;
	parent.rotation.x += 0.01;
	*/

	renderer.render(scene, camera);
};

render();

