/* tweetshirt.js */

window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;

	// Easter Egg
	makeImage();
}

function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	var context = canvas.getContext("2d");

	fillBackgroundColor(canvas, context);

	var selectObj = document.getElementById("shape");
	var index = selectObj.selectedIndex;
	var shape = selectObj[index].value;

	if (shape == "squares") {
		for (var squares = 0; squares < 20; squares++) {
			drawSquare(canvas, context);
		}
	} else if (shape == "circles") {
		for (var circles = 0; circles < 20; circles++) {
			drawCircle(canvas, context);
		}
	}

	drawText(canvas, context);
}

// This is where we'll set the background color
function fillBackgroundColor(canvas, context) {
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgColor = selectObj[index].value;

	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);

}

// Draws a square at a random location
function drawSquare(canvas, context) {
	var w = Math.floor(Math.random() * 40);    
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);

	// Use this fillStyle 
	context.fillStyle = "lightblue";
	context.fillRect(x, y, w, w);
}

// Draws a circle at a random location
function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);

	context.beginPath();
	context.arc(x, y, radius, 0, degreesToRadians(360), true);

	// Use this fillStyle 
	context.fillStyle = "lightblue";
	context.fill();
}

// draws all the text
function drawText(canvas, context) {
	var selectObj = document.getElementById("foregroundColor");
	var index = selectObj.selectedIndex;
	var fgColor = selectObj[index].value;

	context.fillStyle = fgColor;
	context.font = "bold 1em sans-serif";
	context.textAlign = "left";
	context.fillText("Week 5 Example", 20, 40);
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}

// Easter Egg
function makeImage() {
	var canvas = document.getElementById("tshirtCanvas");
	canvas.onclick = function () {
		window.location = canvas.toDataURL('image/png');
	};
}
