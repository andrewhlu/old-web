var video = document.querySelector("#videoElement");
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {
	var constraints = {
		video: {
			width: {min: 1280},
            height: {min: 720},
			facingMode: "environment"
		}
	};
    navigator.getUserMedia(constraints, handleVideo, videoError);
}
 
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    console.log("Video stream failed to start.");
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

//Firebase Auth
FriendlyChat.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
  //Shortcuts to Firebase SDK features
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  //Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

this.initFirebase();