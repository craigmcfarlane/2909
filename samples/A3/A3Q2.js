/**
 * Created by craig on 20/11/16.
 */
window.onload = function() {
    var worker = new Worker("A3Q2_worker.js");
        console.log("calling worker");
        worker.postMessage("start");
        worker.onmessage = function (event) {
            console.log("Mesasge received");
            var message = event.data;

            var objCopy = JSON.parse(message);
            var div = document.getElementById("response");
            var li = document.createElement("li");
            li.style.color = objCopy.colour;
            div.appendChild(li).innerHTML = objCopy.message;

        }
}
