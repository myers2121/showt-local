(function($) {

  magicForm.init();

  self.validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  self.validatePhoneNumber = function(phoneNumber) {
    var re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

    return re.test(phoneNumber)
  }

  // Buttons in the nav or sections that handle the click events

  const $signUpButton = $('.sign-up-link');
  const $logInButton = $('.log-in-link');
  const $signUpTodayButton = $('.sign-up-today-button');
  const $forgotPasswordButton = $('.forgot-password-button');
  const $readyToGrowIcon = $('.ready-to-grow-link');
  const $showtLocalIcon = $('.showt-local-icon');
  const $signUpTodayButtonForgotPassword = $('.sign-up-today-button-forgot-password');

  // Section identifiers and variables

  const $signUpBusinessSection = $('#sign-up-business-section');
  const $signUpBusinessContainer = $('.sign-up-business-container');
  const $exitSignUpBusinessContainer = $('.exit-sign-up-business-container');
  const $logInBusinessSection = $('#log-in-business-section');
  const $logInBusinessContainer = $('.log-in-business-container');
  const $exitLogInBusinessContainer = $('.exit-log-in-business-container');
  const $forgotPasswordBusinessSection = $('#forgot-password-business-section');
  const $forgotPasswordBusinessContainer = $('.forgot-password-business-container');
  const $exitforgotPasswordBusinessContainer = $('.exit-forgot-password-business-container');

  // click events

  $signUpButton.click(function() {
    location.href = '/business/signup';
  });

  $logInButton.click(function() {
    location.href = '/business/login';
  });

  $showtLocalIcon.click(function() {
    location.href = '/';
  });

  $readyToGrowIcon.click(function() {
    location.href = '/get-started';
  });

  // View model for the entire site where things get repeated like the login form

  function SiteViewModel() {

      var self = this;

      // Login in form validation and submission

      self.businessEmail = ko.observable("");
      self.businessEmailNotValidated = ko.observable(false);

      self.emailInputTyping = function() {
        if (self.businessEmail().length > 0) {
          if (validateEmail(self.businessEmail())) {
            self.businessEmailNotValidated(false);
          } else {
            self.businessEmailNotValidated(true);
          }
        } else {
          self.emailNotValidated(false);
        }
      };

      // Sign up form validation and submission

      self.businessName = ko.observable("");
      self.firstName = ko.observable("");
      self.lastName = ko.observable("");
      self.signUpBusinessEmail = ko.observable("");
      self.password = ko.observable("");
      self.phoneNumber = ko.observable("");

      self.businessNameNotValidated = ko.observable(false);
      self.firstLastNameNotValidated = ko.observable(false);
      self.signUpBusinessEmailNotValidated = ko.observable(false);
      self.passwordNotValidated = ko.observable(false);
      self.phoneNumberNotValidated = ko.observable(false);

      self.businessNameInputTyping = function() {
        if (self.businessName().length > 2) {
          self.businessNameNotValidated(false);
        } else  {
          self.businessNameNotValidated(true);
        }
      };

      self.firstLastNameInputTyping = function() {
        if (self.firstName().length > 1 && self.lastName().length > 1) {
          self.firstLastNameNotValidated(false);
        } else {
          self.firstLastNameNotValidated(true);
        }
      };

      self.signUpEmailInputTyping = function() {
        if (self.signUpBusinessEmail().length > 0) {
          if (validateEmail(self.signUpBusinessEmail())) {
            self.signUpBusinessEmailNotValidated(false);
          } else {
            self.signUpBusinessEmailNotValidated(true);
          }
        } else {
          self.signUpBusinessEmailNotValidated(false);
        }
      };

      self.passwordInputTyping = function() {
        if (self.password().length > 5) {
          self.passwordNotValidated(false);
        } else {
          self.passwordNotValidated(true);
        }
      };

      self.phoneNumberTyping = function() {
        if (self.phoneNumber().length > 0) {
          if (validatePhoneNumber(self.phoneNumber())) {
            self.phoneNumberNotValidated(false);
          } else {
            self.phoneNumberNotValidated(true);
          }
        } else {
          self.phoneNumberNotValidated(false);
        }
      };


      // Forgot password validation and submission

      self.forgotPasswordBusinessEmail = ko.observable("");
      self.forgotPasswordBusinessEmailNotValidated = ko.observable(false);

      self.forgotPasswordEmailInputTyping = function() {
        if (self.forgotPasswordBusinessEmail().length > 0) {
          if (validateEmail(self.forgotPasswordBusinessEmail())) {
            self.forgotPasswordBusinessEmailNotValidated(false);
          } else {
            self.forgotPasswordBusinessEmailNotValidated(true);
          }
        } else {
          self.forgotPasswordBusinessEmailNotValidated(false);
        }
      };

  };


  var siteObjectVm = new SiteViewModel();
  ko.applyBindings(siteObjectVm,$("#sign-up-business-section")[0]);
  ko.applyBindings(siteObjectVm,$("#log-in-business-section")[0]);
  ko.applyBindings(siteObjectVm,$("#forgot-password-business-section")[0]);

})(jQuery); // End of use strict
