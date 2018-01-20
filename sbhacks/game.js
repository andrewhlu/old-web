var video = document.querySelector("#videoElement");
 
//navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {
	var constraints = {
		video: true,
		facingMode: "environment"
	};
    navigator.getUserMedia(constraints, handleVideo, videoError);
}
 
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    console.log("fail");
}