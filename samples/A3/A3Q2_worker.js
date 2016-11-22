/**
 * Created by craig on 20/11/16.
 */
onmessage = makeCall;

function makeCall(event) {
    if (event.data == "start")
    {
        var xhr = new XMLHttpRequest();
        for (var i = 0; i <20; i++) {

            var time =  setInterval(function () {
                xhr.open('GET', 'http://courses.acs.uwinnipeg.ca/2909-001/assignments/A3Q2.php');
                if (xhr.status == 200) {
                    xhr.onreadystatechange = process;
                }
            }, 1000);
            setTimeout(function(){
                clearInterval(time);
            }, 20000);

        }
    }

}

function process() {
    if (xhr.readyState === 4) {
        var myObject = JSON.parse(xhr.responseText);
        var message = " Type is " + myObject.type + " with a colour of " + myObject.colour;
        var jsonStr = JSON.stringify(message);

        postMessage(jsonStr);
    }
}