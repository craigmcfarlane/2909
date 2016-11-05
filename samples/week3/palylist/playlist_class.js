/* playlist.js */

window.onload = init;
// onclick a shortcut to start an event listener

function init() {
	var button = document.getElementById("addButton");
	// button.onclick = handleButtonClick;
	button.onclick = buttonWasClicked;
	loadPlaylist();
}

function buttonWasClicked() {
	// alert("button was clicked");
	var textInput = document.getElementById("songTextInput")
	// gets the value
	var song  = textInput.value;

	var listItem = document.createElement('li');
	listItem.innerHTML = song;

	var playlist = document.getElementById("playlist");
	playlist.appendChild(listItem)
}

function handleButtonClick(e) {
	var textInput = document.getElementById("songTextInput");
	var songName = textInput.value;
	//alert("Adding " + songName);

	if (songName == "") {
		alert("Please enter a song");
	}
	else {
		//alert("Adding " + songName);
		var li = document.createElement("li");
		li.innerHTML = songName;
		var ul = document.getElementById("playlist");
		ul.appendChild(li);

		// for Ready Bake
		//save(songName);
	}
}


