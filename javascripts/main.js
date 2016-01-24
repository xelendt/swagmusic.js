"use strict"
var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

// Takes any integer
function seed(i) {
    m_w = i;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random() {
    //console.log(m_w);
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + m_w) & mask;
    result /= 4294967296;
    return result + 0.5;
}

class Vector {
    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }
    subtract (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }
    multiply (v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
    }
}

var PI = 3.1415926;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75/2, window.innerWidth/window.innerHeight, 0.1, 1000 );
var dirLight, hemiLight;

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( -1, 1.75, 10 );
dirLight.position.multiplyScalar( 50 );
scene.add( dirLight );

dirLight.castShadow = true;

dirLight.shadowMapWidth = 2048;
dirLight.shadowMapHeight = 2048;

var d = 500;

dirLight.shadowCameraLeft = -d;
dirLight.shadowCameraRight = d;
dirLight.shadowCameraTop = d;
dirLight.shadowCameraBottom = -d;

dirLight.shadowCameraFar = 3500;
dirLight.shadowBias = -0.0001;
//dirLight.shadowCameraVisible = true;

var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
groundMat.color.setHSL( 0.095, 1, 0.75 );

var ground = new THREE.Mesh( groundGeo, groundMat );
ground.rotation.x = -Math.PI/2;
ground.position.y = -120;
scene.add( ground );

ground.receiveShadow = true;


var vertexShader = document.getElementById( 'vertexShader' ).textContent;
var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
var uniforms = {
    topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
    bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
    offset:		 { type: "f", value: 33 },
    exponent:	 { type: "f", value: 0.6 }
};
uniforms.topColor.value.copy( hemiLight.color );

// RENDERER INFORMATION

var renderer = new THREE.WebGLRenderer( {antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth/2, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.gammaInput = true;
renderer.gammaOutput = true;

renderer.shadowMap.enabled = true;
renderer.shadowMap.cullFace = THREE.CullFaceBack;

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var cylindergeo = new THREE.CylinderGeometry(1, 1, 3, 8, 1, false, 0);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
/*var material = new THREE.ShaderMaterial( {

	uniforms: {
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() }
	},
	attributes: {
		vertexOpacity: { type: 'f', value: [] }
	},
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent

} );
*/
//var light = new THREE.AmbientLight( 0x404040 ); // soft white light
//scene.add( light );

var cube = new THREE.Mesh( geometry, material );
var cylinder = new THREE.Mesh( cylindergeo, material );
//    scene.add(cylinder);
//scene.add( cube );

camera.position.z = 500;

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
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );


// all the body parts
var legGeometry = new THREE.CylinderGeometry( 10, 10, 60, 10, 1, false );		
var armGeometry = new THREE.CylinderGeometry( 10, 10, 50, 10, 1, false );		
var bodyGeometry = new THREE.CylinderGeometry( 20, 20, 100, 10, 1, false ); 
var headGeometry = new THREE.SphereGeometry( 15, 10, 10 ); 
var jointGeometry = new THREE.SphereGeometry( 10, 10, 10 ); 


// all the body geometry
//var p1 = new Person();

parent = new THREE.Object3D();
scene.add( parent );


//p1.limbs[0] 	// hip 
var hipJoint = new THREE.Object3D(); 											var hipJointMesh = new THREE.Mesh( jointGeometry, material );
parent.add( hipJoint );
hipJoint.add(hipJointMesh);

var upperHipJoint = new THREE.Object3D();   hipJoint.add(upperHipJoint);        var upperHipJointMesh = new THREE.Mesh( jointGeometry, material );
upperHipJointMesh.position.x = 0;
upperHipJointMesh.position.y = 0;
upperHipJointMesh.position.z = 0;
upperHipJoint.add(upperHipJointMesh);
upperHipJointMesh.castShadow = true;
upperHipJointMesh.receiveShadow = true;

var LHipJoint = new THREE.Object3D();		hipJoint.add(LHipJoint);			var LHipJointMesh = new THREE.Mesh( jointGeometry, material );
LHipJointMesh.position.x = -10;
LHipJointMesh.position.y = 0;
LHipJointMesh.position.z = 0;
LHipJoint.add(LHipJointMesh);
LHipJointMesh.castShadow = true;
LHipJointMesh.receiveShadow = true;

var RHipJoint = new THREE.Object3D();		hipJoint.add(RHipJoint);			var RHipJointMesh = new THREE.Mesh( jointGeometry, material );
RHipJointMesh.position.x = 10;
RHipJointMesh.position.y = 0;
RHipJointMesh.position.z = 0;
RHipJoint.add(RHipJointMesh);
RHipJointMesh.castShadow = true;
RHipJointMesh.receiveShadow = true;

var LLegUpper = new THREE.Object3D();		LHipJoint.add( LLegUpper ); 		var LLegUpperMesh = new THREE.Mesh( legGeometry, material );
LLegUpperMesh.position.x = -10;
LLegUpperMesh.position.y = -30;
LLegUpperMesh.position.z = 0;
LLegUpper.add(LLegUpperMesh);
LLegUpperMesh.castShadow = true;
LLegUpperMesh.receiveShadow = true;

var RLegUpper = new THREE.Object3D();		RHipJoint.add( RLegUpper );			var RLegUpperMesh = new THREE.Mesh( legGeometry, material );
RLegUpperMesh.position.x = 10;
RLegUpperMesh.position.y = -30;
RLegUpperMesh.position.z = 0;
RLegUpper.add(RLegUpperMesh);
RLegUpperMesh.castShadow = true;
RLegUpperMesh.receiveShadow = true;

var LKnee = new THREE.Object3D();			LLegUpper.add( LKnee );				var LKneeMesh = new THREE.Mesh( jointGeometry, material );
LKneeMesh.position.x = -10;
LKneeMesh.position.y = -60;
LKneeMesh.position.z = 0;
LKnee.add(LKneeMesh);
LKneeMesh.castShadow = true;
LKneeMesh.receiveShadow = true;

var RKnee = new THREE.Object3D();			RLegUpper.add( RKnee );				var RKneeMesh = new THREE.Mesh( jointGeometry, material );
RKneeMesh.position.x = 10;
RKneeMesh.position.y = -60;
RKneeMesh.position.z = 0;
RKnee.add(RKneeMesh);
RKneeMesh.castShadow = true;
RKneeMesh.receiveShadow = true;

var LLegLower = new THREE.Object3D();		LKnee.add( LLegLower );				var LLegLowerMesh = new THREE.Mesh( legGeometry, material );
LLegLowerMesh.position.x = -10;
LLegLowerMesh.position.y = -90;
LLegLowerMesh.position.z = 0;
LLegLower.add(LLegLowerMesh);
LLegLowerMesh.castShadow = true;
LLegLowerMesh.receiveShadow = true;

var RLegLower = new THREE.Object3D(); 		RKnee.add( RLegLower );				var RLegLowerMesh = new THREE.Mesh( legGeometry, material );				
RLegLowerMesh.position.x = 10;
RLegLowerMesh.position.y = -90;
RLegLowerMesh.position.z = 0;
RLegLower.add(RLegLowerMesh);
RLegLowerMesh.castShadow = true;
RLegLowerMesh.receiveShadow = true;

var Body = new THREE.Object3D();			upperHipJoint.add( Body );			var BodyMesh = new THREE.Mesh( bodyGeometry, material );
BodyMesh.position.x = 0;
BodyMesh.position.y = 50;
BodyMesh.position.z = 0;
Body.add(BodyMesh);
BodyMesh.castShadow = true;
BodyMesh.receiveShadow = true;

var LShoulder = new THREE.Object3D();		Body.add( LShoulder );				var LShoulderMesh = new THREE.Mesh( jointGeometry, material );
LShoulderMesh.position.x = -30;
LShoulderMesh.position.y = 90;
LShoulderMesh.position.z = 0;
LShoulder.add(LShoulderMesh);
LShoulderMesh.castShadow = true;
LShoulderMesh.receiveShadow = true;

var RShoulder = new THREE.Object3D();		Body.add( RShoulder );				var RShoulderMesh = new THREE.Mesh( jointGeometry, material );
RShoulderMesh.position.x = 30;
RShoulderMesh.position.y = 90;
RShoulderMesh.position.z = 0;
RShoulder.add(RShoulderMesh);
RShoulderMesh.castShadow = true;
RShoulderMesh.receiveShadow = true;

var LArmUpper = new THREE.Object3D();		LShoulder.add( LArmUpper );		var LArmUpperMesh = new THREE.Mesh( armGeometry, material );
LArmUpperMesh.position.x = -30;
LArmUpperMesh.position.y = 65;
LArmUpperMesh.position.z = 0;
LArmUpper.add(LArmUpperMesh);
LArmUpperMesh.castShadow = true;
LArmUpperMesh.receiveShadow = true;

var RArmUpper = new THREE.Object3D();		RShoulder.add( RArmUpper );		var RArmUpperMesh = new THREE.Mesh( armGeometry, material );
RArmUpperMesh.position.x = 30;
RArmUpperMesh.position.y = 65;
RArmUpperMesh.position.z = 0;
RArmUpper.add(RArmUpperMesh);
RArmUpperMesh.castShadow = true;
RArmUpperMesh.receiveShadow = true;

var LElbow = new THREE.Object3D();			LArmUpper.add( LElbow );			var LElbowMesh = new THREE.Mesh( jointGeometry, material );
LElbowMesh.position.x = -30;
LElbowMesh.position.y = 40;
LElbowMesh.position.z = 0;
LElbow.add(LElbowMesh);
LElbowMesh.castShadow = true;
LElbowMesh.receiveShadow = true;

var RElbow = new THREE.Object3D();			RArmUpper.add( RElbow );			var RElbowMesh = new THREE.Mesh( jointGeometry, material );
RElbowMesh.position.x = 30;
RElbowMesh.position.y = 40;
RElbowMesh.position.z = 0;
RElbow.add(RElbowMesh);
RElbowMesh.castShadow = true;
RElbowMesh.receiveShadow = true;

var LArmLower = new THREE.Object3D();		LElbow.add( LArmLower );			var LArmLowerMesh = new THREE.Mesh( armGeometry, material );
LArmLowerMesh.position.x = -30;
LArmLowerMesh.position.y = 15;
LArmLowerMesh.position.z = 0;
LArmLower.add(LArmLowerMesh);
LArmLowerMesh.castShadow = true;
LArmLowerMesh.receiveShadow = true;

var RArmLower = new THREE.Object3D();		RElbow.add( RArmLower );			var RArmLowerMesh = new THREE.Mesh( armGeometry, material );
RArmLowerMesh.position.x = 30;
RArmLowerMesh.position.y = 15;
RArmLowerMesh.position.z = 0;
RArmLower.add(RArmLowerMesh);
RArmLowerMesh.castShadow = true;
RArmLowerMesh.receiveShadow = true;

var Head = new THREE.Object3D();			Body.add( Head );					var HeadMesh = new THREE.Mesh( headGeometry, material );
HeadMesh.position.x = 0;
HeadMesh.position.y = 115;
HeadMesh.position.z = 0;
Head.add(HeadMesh);
HeadMesh.castShadow = true;
HeadMesh.receiveShadow = true;

var HIPJOINT = 0; var UPPERHIPJOINT =1; var LHIPJOINT = 2; var RHIPJOINT = 3;
var LKNEE = 4; var RKNEE = 5; var LSHOULDER = 6; var RSHOULDER = 7; var LELBOW = 8; var RELBOW = 9;
var joints = [hipJoint, upperHipJoint, LHipJoint, RHipJoint, LKnee, RKnee, LShoulder, RShoulder, LElbow, RElbow];
var jointMeshs = [hipJointMesh, upperHipJointMesh, LHipJointMesh, RHipJointMesh, LKneeMesh, RKneeMesh, LShoulderMesh, RShoulderMesh, LElbowMesh, RElbowMesh];
var acc = [new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0)];
var vel = [new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0), new Vector(0, 0, 0)];

var minAngle = [new Vector(0, 0, 0),
                new Vector(-PI / 4, -PI / 4, -PI / 3),          // hipjoints
                new Vector(-PI / 2, -PI / 2, -PI / 2),
                new Vector(-PI / 2, -PI / 6, 0),
                new Vector(0, 0, 0),                            // knees
                new Vector(0, 0, 0),                        
                new Vector(-PI, - PI / 2, -PI),                 // shoulders
                new Vector(-PI, - PI / 3, 0),
                new Vector(-5*PI / 6, 0, 0),                    // elbows
                new Vector(-5*PI / 6, 0, 0)
                ];
var maxAngle = [new Vector(0, 0, 0),
                new Vector(PI /4, PI / 4, PI / 3),              //hipjoints
                new Vector(PI / 4, PI / 6, 0),
                new Vector(PI / 4, PI / 2, PI / 2),
                new Vector(PI / 2, 0, 0),                       // knees
                new Vector(PI / 2, 0, 0),
                new Vector(PI, PI / 3, 0),                      // shoulders
                new Vector(PI, PI/2, PI),
                new Vector(0, 0, 0),                     // elbows
                new Vector(0, 0, 0)
                ];

function translate( object, x, y, z ){

	object.translateX(  x );
	object.translateY(  y );
	object.translateZ(  z );
}

function rotate ( object, objectMesh, v) {
	translate(object, objectMesh.position.x, objectMesh.position.y, objectMesh.position.z);
	object.rotation.x += v.x;
	object.rotation.y += v.y;
	object.rotation.z += v.z;
	translate(object, -objectMesh.position.x, -objectMesh.position.y, -objectMesh.position.z);
}

//parent.translate( -1*RShoulderMesh.position.x, -1*RShoulderMesh.position.y, -1*RShoulderMesh.position.z);
//console.log(RShoulderMesh.position.x + " " + RShoulderMesh.position.y + " " + RShoulderMesh.position.z);
/*
for (var i = 0; i < joints.length; i++) {
	vel[i].x = Math.random() - 0.5;
	vel[i].y = Math.random() - 0.5;
	vel[i].z = Math.random() - 0.5;
} 
*/

var initTime = Date.now();
var nat = 2.718;

parent.rotation.y += PI/4;

var PROB = 0.8;

function elbow1 (amt) {
    if (Math.random() < PROB) {
        vel[RELBOW].x -= amt + 0.05;
        vel[RELBOW].y += (Math.random() - 0.5)/2;
    }
    if (Math.random() < PROB) {
        vel[LELBOW].x -= amt + 0.05;
        vel[LELBOW].y += (Math.random() - 0.5)/2;
    }
}

var elbowMovements = [elbow1];


function shoulder1 (amt) {
    if (Math.random() < PROB) {
        vel[RSHOULDER].x -= amt * 2;
        vel[RSHOULDER].y += (Math.random() - 0.5) * amt;
    }
    if (Math.random() < PROB) {
        vel[LSHOULDER].x -= amt * 2;
        vel[LSHOULDER].y += (Math.random() - 0.5) * amt;
    }
}

function shoulder2 (amt) {
    if (Math.random() < PROB) {
        vel[RSHOULDER].z += (Math.random())/6 + amt / 2;
    }

    if (Math.random() < PROB) {
        vel[LSHOULDER].z -= (Math.random())/6 + amt / 2;
    }
}

var shoulderMovements = [shoulder1, shoulder2];

function torso1 (amt) {
    vel[UPPERHIPJOINT].x += (Math.random() - 0.5) * amt;
}

function torso2 (amt) {
    vel[UPPERHIPJOINT].y += (Math.random() - 0.5) * amt;
}

function torso3 (amt) {
    vel[UPPERHIPJOINT].z += (Math.random() - 0.5) * amt;
}

var torsoMovements = [torso1, torso2, torso3];

function knee1 (amt) {

    if (Math.random() < PROB) {
    vel[RKNEE].x += amt;
    vel[RKNEE].y += (Math.random() - 0.5)/2;
    }

    if (Math.random() < PROB) {
    vel[LKNEE].x += amt;
    vel[LKNEE].y += (Math.random() - 0.5)/2;
    }
}

var kneeMovements = [knee1];

function leg1 (amt) {

    if (Math.random() < PROB) {
        vel[RHIPJOINT].x -= amt;
        vel[RHIPJOINT].y += (Math.random() - 0.5)/2;
    }
    if (Math.random() < PROB) {
        vel[LHIPJOINT].x -= amt;
        vel[LHIPJOINT].y += (Math.random() - 0.5)/2;
        
    }
}

function leg2 (amt) {

    if (Math.random() < 0.5) {
        vel[RHIPJOINT].z += (Math.random())/6 + amt / 6;
        
        vel[LHIPJOINT].x -= amt * 2;
        vel[LKNEE].x += amt * 2;
    } else {
        vel[LHIPJOINT].z -= (Math.random())/6 + amt / 6;
    
        vel[RHIPJOINT].x -= amt * 2;
        vel[RKNEE].x += amt * 2;
    }
}

var legMovements = [leg1, leg2];

function randChoice (arr, amt) {
    var choice = Math.floor(Math.random() * arr.length);
    arr[choice](amt);
}


var freq = 0;

var cameraVelocity = 0.05;
var cameraAcceleration = 0;

var render = function () {
	
    freq = curFreqState.getter();

    requestAnimationFrame( render );
    
    
    var timelapsed = (Date.now() - initTime) / 50;
    //if (timelapsed > 100)
        //return;
	/***
    for (var i = 0; i < joints.length; i++) {
	   //vel[i].x += random() / 10 - 0.05;
	   //vel[i].y += random() / 10 - 0.05;
	   //vel[i].z += random() / 10 - 0.05;
       vel[i].x += freq / 100000;
       vel[i].y += freq / 100000;
       vel[i].z += freq / 100000;
    }
    ***/
    console.log(freq);
    
    if (timelapsed * freq / 10000 >= 0.75) {
        initTime = Date.now();
        //console.log(freq / 10000 + 0.05);
        randChoice(elbowMovements, freq / 10000 + 0.05);
        randChoice(shoulderMovements, freq / 10000 + 0.05);
        randChoice(torsoMovements, freq / 10000 + 0.05);
        randChoice(kneeMovements, freq / 10000 + 0.05);
        randChoice(legMovements, freq / 10000 + 0.05);
    }
    
    /*
    if (timelapsed >= 25) {
        initTime = Date.now();
    }*/

    /*
    if (timelapsed >= 25) {
        initTime = Date.now();
        
        var reduced = 0.25;
        
        if (freq < 0)  {
            console.log('case 1');
            vel[HIPJOINT].x += reduced; vel[HIPJOINT].y += reduced; vel[HIPJOINT].z += reduced;
        }
        if (freq >= 0) {
            console.log('case 2');
            vel[RHIPJOINT].x -= reduced; vel[RHIPJOINT].y += reduced; vel[RHIPJOINT].z += reduced;
            vel[LHIPJOINT].x -= reduced; vel[LHIPJOINT].y -= reduced; vel[LHIPJOINT].z -= reduced;
        }
        if (freq >= 100) {
            console.log('case 3');
            vel[RKNEE].x += reduced; vel[RKNEE].y -= reduced; vel[RKNEE].z -= reduced;
            vel[LKNEE].x += reduced; vel[LKNEE].y += reduced; vel[LKNEE].z += reduced;
            vel[UPPERHIPJOINT].x += (Math.random() * 2 - 1) * 0.5 * reduced;
            vel[UPPERHIPJOINT].y += (Math.random() * 2 - 1) * 0.5 * reduced;
            vel[UPPERHIPJOINT].z += (Math.random() * 2 - 1) * 0.5 * reduced;
        }
        if (freq >= 200) {
            console.log('case 4');
            vel[RSHOULDER].x += reduced; vel[RSHOULDER].y += reduced; vel[RSHOULDER].z += reduced;
            vel[LSHOULDER].x -= reduced; vel[LSHOULDER].y -= reduced; vel[LSHOULDER].z -= reduced;
        }
        if (freq >= 400) {
            console.log('case 5');
            vel[RELBOW].x -= reduced; vel[RELBOW].y -= reduced; vel[RELBOW].z -= reduced;
            vel[LELBOW].x += reduced; vel[LELBOW].y += reduced; vel[LELBOW].z += reduced;
        }
        if (freq >= 1600) {
            console.log('case 6');
            vel[RKNEE].x += reduced * 3; vel[RSHOULDER].y += reduced * 3; vel[LHIPJOINT].z += reduced * 3;
            vel[RELBOW].x -= reduced * 3; vel[LKNEE].y -= reduced * 3; vel[HIPJOINT].z -= reduced * 3;
        }
        if (freq >= 3200) {
            console.log('case 7');
            vel[RELBOW].x += reduced * 7; vel[LSHOULDER].y += reduced * 7; vel[HIPJOINT].z += reduced * 7;
            vel[RKNEE].x -= reduced * 7; vel[LHIPJOINT].y -= reduced * 7; vel[LELBOW].z -= reduced * 7;
        }
    }
    */
    // designate freqeuncies for each limb

    // legs
    // move thigh up, move knee down, in opposition

    // arms 
    // move shoulders
    
    for (var i = 0; i < joints.length; i++) {
        rotate(joints[i], jointMeshs[i], vel[i]);
        
        if (joints[i].rotation.x > maxAngle[i].x || joints[i].rotation.x < minAngle[i].x) {
            vel[i].x = - vel[i].x;
            rotate(joints[i], jointMeshs[i], new Vector(vel[i].x, 0, 0));    
            vel[i].x = 0;
        }
        if (joints[i].rotation.y > maxAngle[i].y || joints[i].rotation.y < minAngle[i].y) {
            vel[i].y = - vel[i].y;
            rotate(joints[i], jointMeshs[i], new Vector(0, vel[i].y, 0));
            vel[i].y = 0;
        }
        if (joints[i].rotation.z > maxAngle[i].z || joints[i].rotation.z < minAngle[i].z) {
            vel[i].z = - vel[i].z;
            rotate(joints[i], jointMeshs[i], new Vector(0, 0, vel[i].z));
            vel[i].z = 0;
        }

    }
	
	for (var i = 0; i < joints.length; i++) {
        
		vel[i].add(acc[i]);
        // -0.01 -- 0.01
        vel[i].multiply(new Vector(0.95, 0.95, 0.95));
        acc[i].x = -joints[i].rotation.x / 100;
        acc[i].y = -joints[i].rotation.y / 100;    
        acc[i].z = -joints[i].rotation.z / 100;
        
    }
    //console.log(freq);
    if (freq > 500)
        cameraVelocity += 0.025;
    parent.rotation.y += 0.01;
    cameraVelocity -= cameraAcceleration;
    cameraAcceleration = cameraVelocity / 10;
    cameraVelocity *= 0.95;
	renderer.render(scene, camera);
    //camera.position.x += 5;

};

render();

