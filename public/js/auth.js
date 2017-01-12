function requireAuth( path , callback ) {

  let _DB          = firebase.database().ref();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      callback();
    } else {
      // No user is signed in.
      location.href = path;
    }
  });
  
}
