$(document).ready(function(){

  function LoginViewModel() {

    var ref = new Firebase("https://passenger-app.firebaseio.com/");

    var self = this;

    self.email = ko.observable("");
    self.password = ko.observable("");

    self.loginButtonClicked = function() {
      ref.authWithPassword({
        email    : self.email(),
        password : self.password()
      }, authHandler);
    };

    self.forgotPasswordButtonClicked = function() {
      $('#forgot-password-section').fadeIn();
    };

    self.resetPasswordButtonClicked = function() {
      $('#reset-password-section').fadeIn();
    };

    function authHandler(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        location.href = '/merchants/dashboard';
      }
    };

    $('.cancel-button').click(function() {
      $('#forgot-password-section').fadeOut();
    });

    $('.cancel-change-password-button').click(function() {
      $('#reset-password-section').fadeOut();
    });

  };

  var loginObjectVM = new LoginViewModel();
  ko.applyBindings(loginObjectVM,$("#login-section")[0]);

});
