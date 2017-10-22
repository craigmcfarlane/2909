/**
 * Created by craig on 20/11/16.
 */
onmessage = makeCall;
var xhr;
function makeCall(event) {
    console.log("work   er called");
    if (event.data == "start") {
        console.log("message received");
        xhr = new XMLHttpRequest();
        setInterval(function () {
            for (var i = 0; i < 20; i++)
                // for (var i = 0; i <1; i++)
            {
                xhr.open('GET', 'http://courses.acs.uwinnipeg.ca/2909-001/assignments/A3Q2.php');
                xhr.onreadystatechange = process;
                xhr.send()
                console.log("processing");
                console.log(xhr);
                if (xhr.status > 399) {
                    i - 1;
                }
            }
        }, 3000);
    }
}


function process() {
    if (xhr.readyState == 4) {
        console.log("processing xhr call");
        var myObject = JSON.parse(xhr.responseText);
        myObject.message = " Type is " + myObject.type + " with a colour of " + myObject.colour;
        var jsonStr = JSON.stringify(myObject);
        postMessage(jsonStr);
    }
}