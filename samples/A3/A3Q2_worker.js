/**
 * Created by craig on 20/11/16.
 */
onmessage = makeCall;

function makeCall(event) {
    console.log("worder called");
    if (event.data == "start")
    {
        console.log("message received");
        var xhr = new XMLHttpRequest();
        for (var i = 0; i <20; i++)
        {
            xhr.open('GET', 'http://courses.acs.uwinnipeg.ca/2909-001/assignments/A3Q2.php');
            console.log(xhr);
            if (xhr.response == 200)
            {
                console.log("processing");
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