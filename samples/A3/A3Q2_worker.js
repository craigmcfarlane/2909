/**
 * Created by craig on 20/11/16.
 */
onmessage = makeCall;
var i=0;
function makeCall(event) {
    console.log("worder called");
    if (event.data == "start")
    {
        console.log("message received");
        var xhr = new XMLHttpRequest();
        if( i<20)
        {
            xhr.open('GET', 'http://courses.acs.uwinnipeg.ca/2909-001/assignments/A3Q2.php');
            console.log(xhr);
            console.log("processing");
            if (xhr.status == 200)
            {
                xhr.onreadystatechange = process;
                i++;
            }
        }
    }
}

function process() {
    console.log("processing xhr call");
    if (xhr.readyState === 4) {
        var myObject = JSON.parse(xhr.responseText);
        myObject.message = " Type is " + myObject.type + " with a colour of " + myObject.colour;
        var jsonStr = JSON.stringify(myObject);
        postMessage(jsonStr);
    }
}