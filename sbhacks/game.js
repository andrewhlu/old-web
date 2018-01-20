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
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  // this.signInSnackbar = document.getElementById('must-signin-snackbar');
  this.captureImageLink = document.getElementById('captureImageLink');

  // Saves message on form submit.
  //this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.captureImageLink.addEventListener('click', this.captureImage.bind(this));

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

ScavengerHunt.prototype.signOut = function() {
  // TODO(DEVELOPER): Sign out of Firebase.
  this.auth.signOut();
};

ScavengerHunt.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;   // TODO(DEVELOPER): Get profile pic.
    var userName = user.displayName;        // TODO(DEVELOPER): Get user's name.

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = "Hi, " + userName + "!  ";

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

ScavengerHunt.prototype.checkSignedInWithMessage = function() {
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */
  //Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  //this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  console.log(data);
  return false;
};

ScavengerHunt.prototype.captureImage = function() {
	var image = document.getElementById("videoshot");
	var imagecontext = image.getContext("2d");
    var videoelement = document.getElementById("videoElement");
    imagecontext.drawImage(videoelement, 0, 0);
    var newimage = document.getElementById("videoshot");
    console.log("test 1")
    var imagelink = newimage.toDataURL("image/png");
    console.log("test 2");

  // Check if the user is signed-in
  if (this.checkSignedInWithMessage()) {

    // TODO(DEVELOPER): Upload image to Firebase storage and add message.
    // We add a message with a loading icon that will get updated with the shared image.
    var currentUser = this.auth.currentUser;

	// Upload Data URL string to Firebase
	var storageRef = firebase.storage().ref(); //Root Reference

	ref.putString(imagelink, 'data_url').then(function(snapshot) {
	  console.log('Uploaded a data_url string!');
	});
  }
};