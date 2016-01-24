var ctx = $("#myChart").get(0).getContext("2d");
var dts = [
	{
		fillColor: "rgba(220, 220, 220, 0.5)",
		strokeColor: "rgba(220, 220, 220, 1)",
		data: [1, 1, 1, 1, 1]
	}
];

var data = {
	labels: ["Core#1", "Core#2", "Core#3", "Core#4", "Core#5"],
	datasets: dts
};

var optionsAnimation = {
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : true,
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : 1,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : 1,
	//Number - The scale starting value
	scaleStartValue : 0
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
	scaleStepWidth : 1,
	//Number - The scale starting value
	scaleStartValue : 0
}

var chart = new Chart(ctx);
chart.Bar(data, optionsAnimation);



function updateData (data) {
	var datasets = data["datasets"][0]["data"];
	for (var i = 0; i < datasets.length; i++) {
		datasets[i] = Math.random() + 0.5;
	}
}

setInterval(function(){
    updateData(data);
    chart.Bar(data, optionsAnimation);
	}, 100
);