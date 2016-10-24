//Add mouse movemove event handler to update coordinates any time the mouse is moved
window.onload = function() {
    addEvent(document, "mousemove", mouseMove, false);
}

//Event handler to update coordinates of the mouse
function mouseMove(e) {
	//Get reference to elements containing the coordinates
    var xC = document.getElementById("xcoor");
    var yC = document.getElementById("ycoor");

	//Update the coordinates
    var evt = e || window.event;
    xC.innerHTML = evt.clientX;
    yC.innerHTML = evt.clientY;      
}

function addEvent(object, evName, fnName, cap) {
   object.addEventListener(evName, fnName, cap);
}