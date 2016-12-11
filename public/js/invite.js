(function($) {

  $('.ios-app-store-button').click(function() {
    window.location.href = 'https://itunes.apple.com/us/app/passenger-mobile/id1154585703?ls=1&mt=8';
  });

  function InviteViewModel() {

    var database = firebase.database();
    var usersRefOverall = firebase.database().ref("users");
    var storageRef = firebase.storage().ref();

    function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/png");
    }

    var finalProfileImage64 = "";
    var img = document.getElementById('profileTemp');
    img.onload = function() {
      var res = getBase64Image(img);
      finalProfileImage64 = res.replace('data:image/png;base64,', '');
    };

    var self = this;

    self.email = ko.observable("")
    self.emailFocusVar = ko.observable(false);
    self.emailValidated = ko.observable(false);
    self.password = ko.observable("");
    self.passwordFocus = ko.observable(false);
    self.passwordValidated = ko.observable(false);
    self.fullName = ko.observable("");
    self.fullNameFocus = ko.observable(false);
    self.fullNameValidated = ko.observable(false);
    self.promotionCode = ko.observable("");
    self.formErrorMessage = ko.observable("Please make sure all of the required fields above have been filled out correctly.");

    self.promotionCode(window.location.href.split("/")[4]);

    self.emailFocusVar.subscribe(function(newValue) {
       if (newValue) {
           //do validation logic here and set any validation observables as necessary
       } else {
         if (!self.validateEmail(self.email())) {
           $('.email-input').css('border','1px solid red');
           self.emailValidated(false);
         } else {
           $('.email-input').css('border','1px solid green');
           self.emailValidated(true);
         }
       }
    });

    self.passwordFocus.subscribe(function(newValue) {
       if (newValue) {
           //do validation logic here and set any validation observables as necessary
       } else {
         if (self.password().length < 6) {
           $('.password-input').css('border','1px solid red');
           self.passwordValidated(false);
         } else {
           $('.password-input').css('border','1px solid green');
           self.passwordValidated(true);
         }
       }
    });

    self.fullNameFocus.subscribe(function(newValue) {
       if (newValue) {
           //do validation logic here and set any validation observables as necessary
       } else {
         if (self.fullName().length < 2) {
           $('.name-input').css('border','1px solid red');
           self.fullNameValidated(false);
         } else {
           $('.name-input').css('border','1px solid green');
           self.fullNameValidated(true);
         }
       }
    });

    self.validateEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    self.createUser = function() {
      $('.submitting-form-container').fadeIn();
      firebase.auth().createUserWithEmailAndPassword(self.email(), self.password()).catch(function(error) {
        // Handle Errors here.
        if (error !== null) {
          if (error.code == "auth/email-already-in-use") {
            console.log(error.code);
            self.formErrorMessage("The email your entered is already in use");
            $('.submission-error-message').slideDown();
          }
          var errorCode = error.code;
          var errorMessage = error.message;
          alert('This email is already in use');
        }
      }).then(function() {

        $('.submission-error-message').slideUp();
        var user = firebase.auth().currentUser;
        var uid = "" + user.uid;
        var usersImageRef = storageRef.child('images/' + uid);
        usersImageRef.putString(finalProfileImage64, 'base64').then(function(snapshot) {
          var key = uid;
          var newUser = {};
          newUser[key] = {
            currentPoints: 225,
            distanceTraveled: 0,
            email: self.email(),
            imageLocation: "gs://firebase-passenger-app.appspot.com/images/" + uid,
            name: self.fullName(),
            phoneNumber: "",
            profileImage: " ",
            rewardsReceived: 0,
            timeSpentDriving: 0,
            totalPoints: 225
          }
          var usersRef = firebase.database().ref('users');
          usersRef.update(newUser);
          usersRefOverall.orderByChild("promoCode").equalTo(self.promotionCode()).once("value", function(snapshot) {
            var user = snapshot.val();
            for(var key in user) {
              var currentPoints = user[key].currentPoints;
              var totalPoints = user[key].totalPoints;
              currentPoints = currentPoints + 75;
              totalPoints = totalPoints + 75;

              firebase.database().ref('users/' + key + '/currentPoints').set(currentPoints);
              firebase.database().ref('users/' + key + '/totalPoints').set(totalPoints);

              // Fade out the loading spinner and bring in the download buttons

              $('.inside-submit-container').fadeOut(function() {
                $('.inside-submit-confirmed-container').fadeIn();
              });
            }
          });
        });
      });
    };

    self.createAccountButtonClick = function createPassengerMobileAccount() {

      if (self.emailValidated() && self.passwordValidated() && self.fullNameValidated()) {
        $('.submission-error-message').slideUp();
          self.createUser()
          // If promo code is real save the data

            // Make sure to submit all the data: temporary profile icon, default emails, file storage location,

          // If promo code is not real show them the error
      } else {
        $('.submission-error-message').slideDown();
      }

    };
  };

  var inviteObjectVm = new InviteViewModel();
  ko.applyBindings(inviteObjectVm,$("#invite-section")[0]);


})(jQuery); // End of use strict
