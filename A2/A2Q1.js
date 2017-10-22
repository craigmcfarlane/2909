/**
 * Created by Craig McFarlane 3077763 on 03/11/16.
 */
/**
Write an application that uses a canvas element to create two circles (with different colors) in two different
parts of the canvas. The circle should be able to be dragged within the canvas, and should stop when it gets
to the edges. Put another way, the edge of the circle should not go past the edge of the canvas. Each circle
should be dragged separately. When you release the mouse button, the circle should stop.

 List of Functions

 drawCircles - draw two circles when page loads

 degreesToRadians - convert units

 isInCircle - determine if the mouse click is inside the circle\

 mouseMove -

 others - event listeners, difference in x,y for circle

 need to determine whether it is at the edge of the canvas - can the canvas be set to the size of the dom?
*/
var diff1x, diff1y, diff2x, diff2y, circle1X = 300, circle1Y = 300, circle2X = 600, circle2Y = 300, radians, canvas, movable, c1, c2, atTop, atSide;

window.onload = init;

function init() {
    drawCircles(circle1X, circle1Y, circle2X, circle2Y);

    addEvent(canvas, "mousedown", mouseGrab, false);
}


function drawCircles(x1, y1, x2, y2) {
    canvas = document.getElementById("circle");
    var circle = canvas.getContext("2d");
    circle.clearRect(0, 0, canvas.width, canvas.height);


    circle.beginPath();
    circle.arc(x1, 					// x   x,y is at the center
        y1, 					// y
        100, 					// arc radius
        0, 						// starting angle
        degreesToRadians(360),	// ending angle
        true);					// counter-clockwise
    circle.fillStyle = "#ff0084";
    circle.fill();
    circle.stroke();

    circle.beginPath();
    circle.arc(x2, 					// x   x,y is at the center
        y2, 					// y
        100, 					// arc radius
        0, 						// starting angle
        degreesToRadians(360),	// ending angle
        true);					// counter-clockwise
    circle.fillStyle = "#16a2d5";
    circle.fill();
    circle.stroke();

}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

function isInCircle(x, y, circleX, circleY, radius) {
    var insideOfCircle = (Math.pow((x - circleX),2) +
        Math.pow((y - circleY),2)) < Math.pow(radius,2);
    return insideOfCircle;
}

// Event handler called when mouse is clicked
function mouseGrab(e) {
    var evt = e || window.event;

    //The following is necessary to maintain the element's position wrt to mouse pointer
    var mouseX = evt.clientX; // x-coordinate of pointer
    var mouseY = evt.clientY; // y-coordinate of pointer
    //Change the style of the mouse pointer
    // circle1.style.cursor = "move";

    var inCircle1 = isInCircle(mouseX, mouseY, circle1X, circle1Y, 100);
    var inCircle2 = isInCircle(mouseX, mouseY, circle2X, circle2Y, 100);

    /* Calculate the distance from the pointer to the center of the circle */
    if (inCircle1) {
        diff1x = circle1X - mouseX;
        diff1y = circle1Y - mouseY;
        movable = true;
        c1 = true;
    }
    else if (inCircle2) {
        diff2x = circle2X - mouseX;
        diff2y = circle2Y - mouseY;
        movable = true;
        c2 = true;
    }
    //Listen for mousemove and mouse up events
    addEvent(canvas, "mousemove", mouseMove, false);
    addEvent(canvas, "mouseup", mouseDrop, false);
}
/*
if circle at top edge (e.g. y) keep y the same until it is not at edge but let x change
 if at side edge e.g. x, keep x the same but let y change
 */
function atTop( cirY) {
    if (0 == cirY + 100 || cirY + 100 == canvas.height) {
        return atTop = true;
    }
}
function atSide(cirX) {
    if (0 == cirX + 100 || cirX +100 == canvas.width){
        return atSide = true;
    }
}


//mousemove event handler for moving element
function mouseMove(e) {
    var evt = e || window.event;
    var mouseX = evt.clientX;
    var mouseY = evt.clientY;

    //remove previous circle
    // canvas.clear();
    //Update the position of the grabbed circle
    if (movable){
        if (c1) {
            drawCircles(mouseX + diff1x, mouseY + diff1y, circle2X, circle2Y);
            circle1X = mouseX + diff1x;
            circle1Y = mouseY + diff1y;
        }

        if (c2) {
            drawCircles(circle1X, circle1Y, mouseX + diff2x, mouseY + diff2y);
            circle2X = mouseX + diff2x;
            circle2Y = mouseY + diff2y;
        }
    }


}

//Remove mouse handlers when user lets go of mouse button
function mouseDrop(e) {
    // circle1.style.cursor = "pointer";
    movable = false;
    c1 = false;
    c2 = false;
    removeEvent(document, "mousemove", mouseMove, false);
    removeEvent(document, "mouseup", mouseDrop, false);
}



function addEvent(object, evName, fnName, cap) {
    object.addEventListener(evName, fnName, cap);
}

function removeEvent(object, evName, fnName, cap) {
    object.removeEventListener(evName, fnName, cap);
}

