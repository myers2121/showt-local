(function($) {

  var ref = new Firebase("https://bg-outfitters.firebaseio.com");
  // ref.createUser({
  //   email: "bobtony@firebase.com",
  //   password: "correcthorsebatterystaple"
  // }, function(error, userData) {
  //   if (error) {
  //     switch (error.code) {
  //       case "EMAIL_TAKEN":
  //         console.log("The new user account cannot be created because the email is already in use.");
  //         break;
  //       case "INVALID_EMAIL":
  //         console.log("The specified email is not a valid email.");
  //         break;
  //       default:
  //         console.log("Error creating user:", error);
  //     }
  //   } else {
  //     console.log("Successfully created user account with uid:", userData.uid);
  //   }
  // });

  function LoginViewModel() {

    var self = this;

    self.username = ko.observable("");
    self.password = ko.observable("");
    self.forgotPasswordEmail = ko.observable("");
    self.tempPassword = ko.observable("");
    self.newPassword = ko.observable("");
    self.newConfirmedPassword = ko.observable("");

    self.usernameCheck = ko.observable(false);
    self.checkUsername = function() {
      if(self.username().length == 0) {
        self.usernameCheck(false);
      } else if (self.username().length < 2) {
        self.usernameCheck(true);
      } else {
        self.usernameCheck(false);
      }
    };

    self.passwordCheck = ko.observable(false);
    self.checkPassword = function() {
      // Check to see if the email is valid
      if(self.password().length == 0) {
        self.passwordCheck(false);
      } else if (self.password().length < 2) {
        self.passwordCheck(true);
      } else {
        self.passwordCheck(false);
      }
    };

    self.forgotEmailCheck = ko.observable(false);
    self.checkForgotEmail = function() {
      // Check to see if the email is valid
      if(self.forgotPasswordEmail().length == 0) {
        self.forgotEmailCheck(false);
      } else if (self.forgotPasswordEmail().length < 2) {
        self.forgotEmailCheck(true);
      } else if(self.validateEmail(self.forgotPasswordEmail())) {
        self.forgotEmailCheck(false);
      } else {
        self.forgotEmailCheck(true)
      }
    };

    self.validateEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    self.sendForgotEmail = function() {
      $('.password-first-stage').fadeOut();
      $('.password-final-stage').fadeIn();
      if (!(self.forgotEmailCheck())) {
        //self.resetPassword();
      }
    }

    self.resetPassword = function() {
      ref.resetPassword({
        email: self.forgotPasswordEmail()
      }, function(error) {
        if (error) {
          switch (error.code) {
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              break;
            default:
              console.log("Error resetting password:", error);
          }
        } else {
          console.log("Password reset email sent successfully!");
          $('.forgot-email-input-container').fadeOut();
          $('.password-final-stage').fadeIn();
        }
      });
    }

    self.loginAdmin = function() {

      var authHandler = function(error, authData) {
        if (error) {
          alert('Login failed');
        } else {
          console.log("Authenticated successfully with payload:", authData);
          location.href = '/admin';
        }
      }

      ref.authWithPassword({
    		email    : self.username(),
    		password : self.password()
    	}, authHandler);

    	var authData = ref.getAuth();
    	if (authData) {
    		console.log("User " + authData.uid + " is logged in with " + authData.provider);
    	} else {
    		console.log("User is logged out");
    	}
    };

  };


  var loginObjectVm = new LoginViewModel();
  ko.applyBindings(loginObjectVm,$("#login")[0]);

  var previousInput;
  var currentSelectedSection = "";

  $('.forgot-password-text').click(function() {
    $('.forgot-password-container').fadeIn();
  });

  $('.forgot-password-container').click(function() {
    $('.forgot-password-container').fadeOut();
  }).children().click(function(e) {
    return false;
  });

$('.form-label').click(function() {

  $('.text-input').removeClass('input-method-animation');

  $(this).css('color','#9A998C');
  $(this).css('font-size', '14px');
  $(this).next().focus();

  $(this).next().css('border-bottom','1px solid #9A998C');
  $(this).next().addClass('input-method-animation');

  if ($(this).text() == currentSelectedSection) {
    console.log("They are the same.");
  }  else {
    currentSelectedSection = $(this).text();
    if (previousInput == undefined) {
      previousInput = $(this).next();
    } else {
        if (previousInput.val().length < 1 && previousInput != $(this)) {
          console.log("This is less than zero");
          previousInput.animate({
            height: "0px"
          }, 250, function() {
            // Animation complete.
          });

          previousInput.prev().css('color','#e3e3e3');
          previousInput.prev().css('font-size','18px')
          previousInput.css('border-bottom','1px solid #e3e3e3');

        }
    }

    previousInput = $(this).next();
    previousInput.addClass('previous-input');

    $(this).next().animate({
      height: "40px"
    }, 250, function() {
      // Animation complete.
    });
    $(this).prev().css('color','#e3e3e3');
    $(this).next().css('border-bottom','1px solid #9A998C');
  }
});



})(jQuery); // End of use strict
