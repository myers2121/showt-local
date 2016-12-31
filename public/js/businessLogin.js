(function($) {

  function BusinessLoginViewModel() {

      var self = this;

      self.businessLoginEmail = ko.observable('');
      self.businessLoginPassword = ko.observable('');

      self.businessLoginEmailNotValidated = ko.observable(false);
      self.businessLoginEmailValidated = ko.observable(false);
      self.businessLoginPasswordNotValidated = ko.observable(false);
      self.businessLoginPasswordValidated = ko.observable(false);

      self.businessLoginEmailTyping = function() {
        if (self.businessLoginEmail().length > 0) {
          if (validateEmail(self.businessLoginEmail())) {
            self.businessLoginEmailNotValidated(false);
            self.businessLoginEmailValidated(true);
          } else {
            self.businessLoginEmailNotValidated(true);
          }
        }
      };

      self.businessLoginPasswordTyping = function() {
        if (self.businessLoginPassword().length > 5) {
          self.businessLoginPasswordNotValidated(false);
          self.businessLoginPasswordValidated(true);
        } else {
          self.businessLoginPasswordNotValidated(true);
        }
      };

      self.logInBusinessUser = function() {
        if (self.businessLoginEmailValidated() && self.businessLoginPasswordValidated()) {
          location.href = '/business/dashboard';
        }
      };

  };

  var businessLoginObjectVm = new BusinessLoginViewModel();
  ko.cleanNode($("#business-login-section")[0]);
  ko.applyBindings(businessLoginObjectVm,$("#business-login-section")[0]);

  $('.showt-logo-about').click(function() {
    location.href = '/';
  });

})(jQuery); // End of use strict
