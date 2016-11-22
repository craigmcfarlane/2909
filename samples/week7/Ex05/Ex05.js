var position = 0;
var playlist;
var video;
window.onload = function() {
    playlist = ["small.mp4",
        "big-buck-bunny.mp4",
        "nature.mp4"];
    video = document.getElementById("video");
    video.addEventListener("ended", nextVideo, false);
    video.src = playlist[position];
    video.load();
    video.play();
}
function nextVideo() {
    position++;
    if (position >= playlist.length) {
        position = 0;
    }
    video.src = playlist[position];
    video.load();
    video.play();
}