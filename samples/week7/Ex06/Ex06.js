var position = 0;
var playlist;
var video;
var nowPlaying;

window.onload = function() {
    playlist = ["small",
        "big-buck-bunny",
        "nature"];
		
	nowPlaying = document.getElementById("nowPlayingText");
		
    video = document.getElementById("video");
    video.addEventListener("ended", nextVideo, false);
	
    video.src = playlist[position]+getExtensionName();
	updateNowPlaying(playlist[position]);
    video.load();
    video.play();
}
function nextVideo() {
    position++;
    if (position >= playlist.length) {
        position = 0;
    }
    video.src = playlist[position]+getExtensionName();
	updateNowPlaying(playlist[position]);
    video.load();
    video.play();
}

function getExtensionName() {
	if (video.canPlayType("video/mp4") != "") {
		return ".mp4";
	} 
	else if (video.canPlayType("video/ogg") != "") {
		return ".ogv";
	}
	else if (video.canPlayType("video/webm") != "") {
		return ".webm";
	} 
}

function updateNowPlaying(name) {
	nowPlaying.innerHTML = name;
}