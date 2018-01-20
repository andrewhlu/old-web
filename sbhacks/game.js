var video = document.querySelector("#videoElement");
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {
	var constraints = {
		video: {
			facingMode: "environment"
		}
	};
    navigator.getUserMedia(constraints, handleVideo, videoError);
}
 
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    console.log("fail");
}

//Capture Image Script
function captureImage() {
	var image = document.getElementById("videoshot");
	var imagecontext = image.getContext("2d");
    var videoelement = document.getElementById("videoElement");
    imagecontext.drawImage(videoelement, 0, 0);
    var newimage = document.getElementById("videoshot");
    var imagelink = newimage.toDataURL("image/png");
    console.log(imagelink);
}