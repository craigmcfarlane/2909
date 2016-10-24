//Add onload event handler
window.onload = init;
//Global variables necessary to maintain element's position wrt to mouse pointer
var diffX, diffY;

//Method used to initialize application
function init() {

    //Get style for inside div
	//Notice there is no var in front of inside, which makes it a global variable
    inside = document.getElementById("inside");
    inside.style.top = getStyle(inside, "top");
    inside.style.left = getStyle(inside, "left");
    inside.style.width = getStyle(inside, "width");
    inside.style.height = getStyle(inside, "height");
    inside.style.cursor = "pointer";

	//Listen for mousedown event
    addEvent(inside, "mousedown", mouseGrab, false);

    //Get style for outside div
    outside = document.getElementById("outside");
    outside.style.top = getStyle(outside, "top");
    outside.style.left = getStyle(outside, "left");
    outside.style.width = getStyle(outside, "width");
    outside.style.height = getStyle(outside, "height");
}

//Event handler called when mouse is clicked
function mouseGrab(e) {
     var evt = e || window.event;
     
    //The following is necessary to maintain the element's position wrt to mouse pointer
    var mouseX = evt.clientX; // x-coordinate of pointer
    var mouseY = evt.clientY; // y-coordinate of pointer
	//Change the style of the mouse pointer
    inside.style.cursor = "move";

    /* Calculate the distance from the pointer to the piece */
    diffX = parseInt(inside.style.left) - mouseX;
    diffY = parseInt(inside.style.top) - mouseY;

	//Listen for mousemove and mouse up events
    addEvent(document, "mousemove", mouseMove, false);
    addEvent(document, "mouseup", mouseDrop, false);
}

//mousemove event handler for moving element
function mouseMove(e) {
    var evt = e || window.event;
    var mouseX = evt.clientX;
    var mouseY = evt.clientY;
    
	//Get the original coordintes of the inside box.
    var oL = parseInt(inside.style.left);
    var oT = parseInt(inside.style.top);

	//Update the position of the inside box
    inside.style.left = mouseX + diffX + "px";
    inside.style.top = mouseY + diffY + "px";

	//Move outside box if the new position of inside box is not completely contained by the outside box
    if (!withinIt(inside, outside)) {
		//Inner box dimensions
		var iL = parseInt(inside.style.left);
        var iT = parseInt(inside.style.top);
        var iHeight = parseInt(inside.style.height);
        var iBottom = iT + iHeight;
        var iWidth = parseInt(inside.style.width)
        var iRight = iL + iWidth;
        
		//Outer box dimensions
        var oL = parseInt(outside.style.left);
        var oT = parseInt(outside.style.top);
        var oHeight = parseInt(outside.style.height)
        var oBottom = oT + oHeight
        var oWidth = parseInt(outside.style.width);
        var oRight = oL + oWidth;
        
        if (iL < oL) { //Inner Left is outside of outer, so move outer
            outside.style.left = iL + "px";
        } else if (iT < oT) { //Inner Top is outside of outer, so move outer
            outside.style.top = iT + "px";
        } else if (iRight > oRight) { //Inner Right is outside of outer, so move by the difference between inner left and outer width
            outside.style.left = iL - oWidth + iWidth + "px";
        } else if (iBottom > oBottom) { 
            outside.style.top = iT - oHeight + iHeight + "px";
        }
    }
}

//Remove mouse handlers when user lets go of mouse button
function mouseDrop(e) {
    inside.style.cursor = "pointer";
    removeEvent(document, "mousemove", mouseMove, false);
    removeEvent(document, "mouseup", mouseDrop, false);
}

//Check if object1 is inside object2
function withinIt(object1, object2) {
    var within = false;
    var obj1Left = parseInt(object1.style.left);
    var obj1Top = parseInt(object1.style.top);
    var obj1Right = parseInt(object1.style.width);
    var obj1Bottom = parseInt(object1.style.height);
    obj1Right += obj1Left;
    obj1Bottom += obj1Top;

    var obj2Left = parseInt(object2.style.left);
    var obj2Top = parseInt(object2.style.top);
    var obj2Right = parseInt(object2.style.width);
    var obj2Bottom = parseInt(object2.style.height);

    obj2Right +=  obj2Left;
     obj2Bottom += obj2Top;

    if ((obj1Left >= obj2Left && obj1Right <= obj2Right) && (obj1Top >= obj2Top && obj1Bottom <= obj2Bottom)) 
        within = true;

    return within;
}

function addEvent(object, evName, fnName, cap) {
    object.addEventListener(evName, fnName, cap);
}

function removeEvent(object, evName, fnName, cap) {
    object.removeEventListener(evName, fnName, cap);
}

function getStyle(object, styleName) {
    if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(object, null).getPropertyValue(styleName);
    } else if (object.currentStyle) {
        return object.currentStyle[styleName]
    }
}