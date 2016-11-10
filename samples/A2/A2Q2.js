/**
 * Created by craig on 06/11/16.
 */
var xhr;

var square = 0;
var circle = 0;
var error = 0;
window.onload = function() {
    var time =  setInterval(getXml, 1000);
    setTimeout(function(){
        clearInterval(time);
        var objContainer = document.getElementById('jsonObject');

        objContainer.appendChild(newLI("there are " + circle + " circles."));
        objContainer.appendChild(newLI("there are " + square + " rectangles."));
        objContainer.appendChild(newLI("there are " + error + " errors."));
    }, 20000);

}
function getXml() {
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://courses.acs.uwinnipeg.ca/2909-001/assignments/A2Q2.php');
    console.log(xhr.status);
    if (xhr.status == 500)
    {
        error++;
    }
    else {
        xhr.onreadystatechange = process;
        xhr.send();
    }
}
function process() {
    if (xhr.readyState === 4) {
        var myObject = JSON.parse(xhr.responseText)
        var jsonStr = JSON.stringify(myObject);
        document.getElementById('jsonContent').innerHTML = jsonStr;
        var objCopy = JSON.parse(jsonStr);

        switch (objCopy.type) {
            case 'rectangle':
                square++;
                break;
            case 'circle':
                circle++;
        }

    }
}
function newLI(text) {
    var li = document.createElement('li');
    li.innerHTML = text;
    return li;
}
