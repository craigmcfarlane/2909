/**
 * Created by craig on 20/11/16.
 */
window.onload = function() {
    var worker = new Worker("A3Q2_worker.js");

        worker.postMessage("start");
        worker.onmessage = function (event) {
            var message = event.data;

            var objCopy = JSON.parse(message);
            document.getElementById("response").innerHTML = objCopy;
        }
}
