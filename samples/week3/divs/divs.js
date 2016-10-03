/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = init;
var count = 0;

function init() {
    var button = document.getElementById("addDiv");
    button.onclick = handleButtonClick;
}


function handleButtonClick() {
    
    var element = document.createElement("div");
    element.innerHTML = count++;
    
    var body=document.getElementById("bodyId");
    body.appendChild(element);
}