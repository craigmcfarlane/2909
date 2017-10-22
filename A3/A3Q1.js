/**
 * Created by craig on 17/11/16.
 */

window.onload = init;

function init() {
    var button = document.getElementById("addItem");
    button.onclick = createItem;
    var remButton = document.getElementsByClassName("remove");
    console.log(remButton);
    var listArray = getListArray();
    document.getElementById("list").innerHTML = "";

    for (var i = 0; i < listArray.length; i++) {
        var key = listArray[i];
        var value = localStorage[key];
        addItemToDOM(key, value);
    }
    updateTotal();
}

function addItemToDOM(key, value) {
    var items = document.getElementById("list");
    var item = document.createElement("li");
    var span = document.createElement("span");
    item.value = key;
    span.classList.add("list");
    span.innerHTML = key.substr(0, key.indexOf("_"))  + ", $" + value;

    var remove = document.createElement("input");
    remove.setAttribute("type", "button");
    remove.setAttribute("id", key);
    remove.setAttribute("class", "remove");
    remove.setAttribute("style", "margin-left: 10px");
    remove.innerHTML = "X";

    span.appendChild(remove);
    item.appendChild(span);
    items.appendChild(item);
    updateTotal();

}

function removeItemFromDom(key)
{
    localStorage.removeItem(key);

    var list  = document.getElementsByName("list");
    var item = document.getElementById(key);
    list.removeChild(item);

    var lArray = getListArray();
    lArray.splice(lArray.indexOf(key), 1);

}

function updateTotal()
{
    var cost = 0;

    var listArray = getListArray();

    for (var i = 0; i < listArray.length; i++) {
        var key = listArray[i];
        var value = localStorage[key];
        cost += parseInt(value);
    }

    var total = document.getElementById("total");
    total.innerHTML = "The total cost is $" + cost;
}


function createItem() {
    var listArray = getListArray();
    var key = document.getElementById("item").value + "_" + Math.floor((Math.random() * 10000) + 1);
    var value = document.getElementById("cost").value;

    localStorage.setItem(key, value);
    listArray.push(key);
    localStorage.setItem("listArray", JSON.stringify(listArray));

    addItemToDOM(key, value);
}

function getListArray() {
    var listArray = localStorage.getItem("listArray");
    if (!listArray) {
        listArray = [];
        localStorage.setItem("listArray", JSON.stringify(listArray));
    } else {
        listArray = JSON.parse(listArray);
    }
    return listArray;
}
