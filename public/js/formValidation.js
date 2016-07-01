function FormValidator()
{
    var self = this;

    self.checkName = function(nameInput) {
      if ( nameInput.length == 0 ) {
        return false;
      } else if ( nameInput.length > 1 ) {
        return true;
      } else {
        return false;
      }
    };

    self.checkEmail = function(emailInput) {
      // Check to see if the email is valid
      if(emailInput.length == 0) {
        return false;
      } else if (emailInput.length < 2) {
        return false;
      } else if(self.validateEmail(emailInput)) {
        return true;
      } else {
        return false;
      }
    };

    self.checkPhone = function(phoneInput) {
      var isnum = /^\d+$/.test(phoneInput);
      if (phoneInput.length == 10 && isnum) {
        return true;
      } else {
        return false;
      }
    };

    self.checkSubject = function(subjectInput) {
      if (subjectInput.length == 0) {
        return false;
      } else if ( subjectInput.length > 5 ) {
        return true;
      } else {
        return false;
      }
    };

    self.checkMessage = function(messageInput) {
      if ( messageInput.length == 0 ) {
        return false;
      } else if ( messageInput.length > 10 ) {
        return true;
      } else {
        return false;
      }
    };

    self.submitForm = function(submitData) {

    };

    self.validateEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
}
