var n = 500;
var width = 50;
var height = 50;

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
        
        var body = document.getElementsByTagName("body");
        body[0].appendChild(div);
    }
}

