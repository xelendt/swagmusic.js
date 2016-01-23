var song_url = "https://soundcloud.com/monstaz-1/popcorn-funk-sneak-peak";
var key = "client_id=35e6e06fe05ccb55d8d7b91c8390405d";
var audio;
var resolve_url = "https://api.soundcloud.com/resolve.json?url=" + song_url + "&" + key

var stream_url;

var curFreqState = {
	_freq = 0,
	setter: function(val) {
		this._freq = val;
	},
	getter: function() {
		return _freq;
	}
}

var chartContext = $("#myChart").get(0).getContext("2d");
var labels = [];
for (var i = 0; i < 128; i++)
	labels.push("");
window.myData = {
	labels: labels,
	datasets: [{
		fillColor: "rgba(220, 220, 220, 0.5)",
		strokeColor: "rgba(220, 220, 220, 1)",
		data: []
	}],
	update: function(index, newData) {
		for (var i = 0; i < 1024; i += 8) {
			this.datasets[index].data[i / 8] = newData[i];
		}	
		//console.log(this.datasets[index].data);
	}
};
var chart = new Chart(chartContext);	
chart.Line(myData, optionsAnimation);
console.log(myData);



$.getJSON(resolve_url, function(data) {

	console.log(this);

	stream_url = data["stream_url"] + "?" + key;
	// var audio = new Audio();
	audio = new Audio();
	audio.crossOrigin = 'anonymous';
	audio.src = stream_url;
	audio.controls = true;
	audio.loop = true;
	audio.autoplay = true;
	initMp3Player();
});



// Establish all variables that your Analyser will use
var ctx, source, context, analyser, fbc_array
// Initialize the MP3 player after the page loads all of its HTML into the window
//window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	document.getElementById('audio_box').appendChild(audio);
	context = new window.webkitAudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	//while (true)
	frameLooper();


};

// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.webkitRequestAnimationFrame(frameLooper);
	var max_mag = 0;
	var max_ind = -1;
	var freq;
	fbc_array = new Uint8Array(analyser.frequencyBinCount);	

	analyser.getByteFrequencyData(fbc_array);
	//	console.log(fbc_array);

	for (var i = 0; i < 1024; i++) {
		if (fbc_array[i] > max_mag) {
			max_mag = fbc_array[i];
			max_ind = i;
		}
	}
	freq = max_ind * 44100 / 1024;
	console.log(freq);
	myData.update(0, fbc_array);
	chart.Line(myData, optionsNoAnimation);
	
	curFreqState.setter(freq);
}


var optionsAnimation = {
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : true,
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : 1,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : 300,
	//Number - The scale starting value
	scaleStartValue : 0,
	scaleShowGridLines: false,
	pointDot : false
}

// Not sure why the scaleOverride isn't working...
var optionsNoAnimation = {
	animation : false,
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : true,
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : 1,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : 300,
	//Number - The scale starting value
	scaleStartValue : 0,
	scaleShowGridLines: false,
	pointDot : false
}


/*
function updateData (data, newData) {
	for (var i = 0; i < datasets.length; i++) {
		data[i] = newData[i];
	}
}
*/
/*
setInterval(function(){
    updateData(data);
    chart.Bar(data, optionsAnimation);
	}, 100
);
*/
