/**
 * Created by craig on 09/11/16.
 */
var xhr;


window.onload = function() {
    var time =  setInterval(getXml, 1000);
    setTimeout(function(){
        clearInterval(time);

    }, 20000);

}

function getXml() {
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://courses.acs.uwinnipeg.ca/2909-001/assignments/A2Q2.php');

    xhr.onreadystatechange = process;
    xhr.send();
}
function process() {
    if (xhr.readyState === 4) {
        var myObject = JSON.parse(xhr.responseText)
        var jsonStr = JSON.stringify(myObject);
        document.getElementById('jsonContent').innerHTML = jsonStr;
        var objCopy = JSON.parse(jsonStr);
        console.log(objCopy);
        switch (objCopy.type) {
            case 'rectangle':
                drawRec(objCopy.x, objCopy.y, objCopy.colour, objCopy.width, objCopy.height);
                break;
            case 'circle':
                drawCircle(objCopy.x, objCopy.y, objCopy.radius, objCopy.colour);
        }

    }
}

function drawCircle(x, y, radius, colour) {
    canvas = document.getElementById("circle");
    var circle = canvas.getContext("2d");

    circle.beginPath();
    circle.arc(x, 					// x   x,y is at the center
        y, 					// y
        radius, 					// arc radius
        0, 						// starting angle
        degreesToRadians(360),	// ending angle
        true);					// counter-clockwise
    circle.fillStyle = colour;
    circle.fill();
    circle.stroke();
}

function drawRec(x, y, colour, w, h) {
    canvas = document.getElementById("rectangle");
    var rec = canvas.getContext("2d");

    rec.fillStyle = colour;
    rec.fillRect(x, y, w, h)
}


function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}
