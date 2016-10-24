var mousePiece = null;
var n = 500;
var width = 50;
var height = 50;
var diffX = null;
var diffY = null;

window.onload = function() {
    for (var i=0; i<n; i++) {
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.top = Math.round(Math.random()*window.innerHeight) + "px";
        div.style.left = Math.round(Math.random()*window.innerWidth) + "px";
        var R = Math.round(Math.random() * 255);
        var G = Math.round(Math.random() * 255);
        var B = Math.round(Math.random() * 255);
        div.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
        addEvent(div, "mousedown", mouseGrab, false);
        
        var body = document.getElementsByTagName("body");
        body[0].appendChild(div);
    }
}

function mouseGrab(e) {
    var evt = e || window.event;
    mousePiece = evt.target || evt.srcElement;

    var mouseX = evt.clientX; 
    var mouseY = evt.clientY; 
   
    diffX = parseInt(mousePiece.style.left) - mouseX; 
    diffY = parseInt(mousePiece.style.top) - mouseY;

    addEvent(document, "mousemove", mouseMove, false);
    addEvent(document, "mouseup", mouseDrop, false);
}

function mouseMove(e) {
    var evt = e || window.event;
    var mouseX = evt.clientX; 
    var mouseY = evt.clientY;

    mousePiece.style.left = mouseX + diffX + "px";
    mousePiece.style.top = mouseY + diffY + "px";
}

function mouseDrop(e) {
    removeEvent(document, "mousemove", mouseMove, false);
    removeEvent(document, "mouseup", mouseDrop, false);
}


function addEvent(object, evName, fnName, cap) {
        object.addEventListener(evName, fnName, cap);
}

function removeEvent(object, evName, fnName, cap) {
        object.removeEventListener(evName, fnName, cap);
}

