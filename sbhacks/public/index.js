//Initialize ScavengerHunt function on startup
window.onload = function() {
  window.ScavengerHunt = new ScavengerHunt();
};

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
  //this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.joinGameButton = document.getElementById('joingame');
  // this.signInSnackbar = document.getElementById('must-signin-snackbar');
  //this.captureImageLink = document.getElementById('captureImageLink');

  // Saves message on form submit.
  //this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  //this.joinGameButton.addEventListener('click', this.joinGame.bind(this));

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
    //var profilePicUrl = user.photoURL;   // TODO(DEVELOPER): Get profile pic.
    var userName = user.displayName;        // TODO(DEVELOPER): Get user's name.

    // Set the user's profile pic and name.
    //this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = "Hi, " + userName + "!";

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.joinGameButton.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    //Launch Game
    this.userDatabase = this.database.ref('users');
    this.userDatabase.push({
      name: userName,
      points: 0
    }).then(function() {

      var setClient = function(data) {
        var val = data.val();
        var client = data.key;
        console.log(client);

        var redirectlink = "game.html?client=" + client;
        window.location.replace(redirectlink);


      }.bind(this);
      this.userDatabase.limitToLast(1).on('child_added', setClient);
      this.userDatabase.limitToLast(1).on('child_changed', setClient);
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });

  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.joinGameButton.setAttribute('hidden', 'true');
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

/*ScavengerHunt.prototype.joinGame = function() {
  //Load database, /users/ database path
  this.userDatabase = this.database.ref('users');
  console.log(userName);

  //Push your client information to database
  this.userDatabase.push({
    name: userName,
    points: 0
  }).then(function(snapshot) {
    var client = snapshot.numChildren();
    console.log(client);
  }.bind(this)).catch(function(error) {
    console.error('Error writing new message to Firebase Database', error);
  });
};*/