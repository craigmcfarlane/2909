window.onload = function() {
    var worker = new Worker("worker.js");
	
	worker.onmessage = function(event) {
        var message = "Worker says " + event.data;
        document.getElementById("output").innerHTML = message;
    }

    document.getElementById("output").innerHTML = "Manager says Ping";

    setTimeout(function() {
        worker.postMessage("ping");
    }, 2000);
    
}
