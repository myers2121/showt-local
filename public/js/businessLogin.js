(function($) {

  function BusinessLoginViewModel() {

      firebase.auth().signOut();

      var self = this;

      self.businessLoginEmail = ko.observable('');
      self.businessLoginPassword = ko.observable('');

      self.businessLoginEmailNotValidated = ko.observable(false);
      self.businessLoginEmailValidated = ko.observable(false);
      self.businessLoginPasswordNotValidated = ko.observable(false);
      self.businessLoginPasswordValidated = ko.observable(false);
      self.isABusiness = ko.observable(false);

      const $businessCheckBox = $('.save-card-for-future-text-box');

      self.checkBusinessLogin = function businessCheckboxClicked() {
        $businessCheckBox.toggleClass('businessCheckActive');
        if (self.isABusiness()) {
          self.isABusiness(false);
        } else {
          self.isABusiness(true);
        }
      };

      self.businessLoginEmailTyping = function() {
          if (validateEmail(self.businessLoginEmail())) {
            self.businessLoginEmailNotValidated(false);
            self.businessLoginEmailValidated(true);
          } else {
            self.businessLoginEmailNotValidated(true);
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
        if (self.isABusiness()) {
          // Log in the business
          if (self.businessLoginEmailValidated() && self.businessLoginPasswordValidated()) {
            firebase.auth().signInWithEmailAndPassword(self.businessLoginEmail(), self.businessLoginPassword()).then(function() {
              location.href = '/business/dashboard';
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
              // ...
            });
          }
        } else {
          // Log in the influencer
          if (self.businessLoginEmailValidated() && self.businessLoginPasswordValidated()) {
            firebase.auth().signInWithEmailAndPassword(self.businessLoginEmail(), self.businessLoginPassword()).then(function(user) {
              var userID = user.uid;
              var influencersRef = firebase.database().ref('influencers/' + userID);
              influencersRef.on('value', function(snapshot) {

                var snapshot = snapshot.val();
                location.href = '/users/' + snapshot.instagram;
              });

            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
              // ...
            });
          }
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
