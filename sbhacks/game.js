//Initialize ScavengerHunt function on startup
window.onload = function() {
  window.ScavengerHunt = new ScavengerHunt();
};

//Camera Feed
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

//Firebase Initialization
function ScavengerHunt() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  // this.messageList = document.getElementById('messages');
  // this.messageForm = document.getElementById('message-form');
  // this.messageInput = document.getElementById('message');
  // this.submitButton = document.getElementById('submit');
  // this.submitImageButton = document.getElementById('submitImage');
  // this.imageForm = document.getElementById('image-form');
  // this.mediaCapture = document.getElementById('mediaCapture');
  // this.userPic = document.getElementById('user-pic');
  // this.userName = document.getElementById('user-name');
   this.signInButton = document.getElementById('sign-in');
  // this.signOutButton = document.getElementById('sign-out');
  // this.signInSnackbar = document.getElementById('must-signin-snackbar');

  // Saves message on form submit.
  //this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  //this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  // Toggle for the button.
  // var buttonTogglingHandler = this.toggleButton.bind(this);
  // this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  // this.messageInput.addEventListener('change', buttonTogglingHandler);

  // Events for image upload.
  // this.submitImageButton.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   this.mediaCapture.click();
  // }.bind(this));
  // this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));

  this.initFirebase();
}

// Checks that the Firebase SDK has been correctly setup and configured.
ScavengerHunt.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
};


ScavengerHunt.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
  //Shortcuts to Firebase SDK features
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  //Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

ScavengerHunt.prototype.signIn = function() {
  // TODO(DEVELOPER): Sign in Firebase with credential from the Google user.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

