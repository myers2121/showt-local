(function($) {

  function ContactViewModel() {

    var self = this;

    self.name = ko.observable("");
    self.email = ko.observable("");
    self.phoneNumber = ko.observable("");
    self.subject = ko.observable("");
    self.message = ko.observable("");

    self.isFormNotValidated = ko.observable(true);

    self.nameCheck = ko.observable(false);
    self.nameIsVerified = ko.observable(false)
    self.checkName = function(namer) {
      console.log('This is being called');
      if(self.name().length == 0) {
        self.nameCheck(false);
      } else if (self.name().length < 2) {
        self.nameCheck(true);
        self.nameIsVerified(false);
        self.isButtonActive();
      } else {
        self.nameCheck(false);
        self.nameIsVerified(true)
        self.isButtonActive();
      }
    };

    self.emailCheck = ko.observable(false);
    self.emailIsVerified = ko.observable(false)
    self.checkEmail = function() {
      // Check to see if the email is valid
      if(self.email().length == 0) {
        self.emailCheck(false);
      } else if (self.email().length < 2) {
        self.emailCheck(true);
        self.emailIsVerified(false);
        self.isButtonActive();
      } else if(self.validateEmail(self.email())) {
        self.emailCheck(false);
        self.emailIsVerified(true)
        self.isButtonActive();
      } else {
        self.emailCheck(true)
        self.emailIsVerified(false);
        self.isButtonActive();
      }
    };

    self.validateEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    self.validatePhone = function(phoneNumber) {
      var re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
      return re.test(phoneNumber)
    }

    self.phoneCheck = ko.observable(false);
    self.phoneIsVerified = ko.observable(false)
    self.checkPhone = function() {
      // Check to see if the phone number is valid
      if(self.phoneNumber().length == 0) {
        self.phoneCheck(false);
      } else if (self.phoneNumber().length < 2) {
        self.phoneCheck(true)
        self.phoneIsVerified(false);
        self.isButtonActive();
      } else if(self.validatePhone(self.phoneNumber())) {
        self.phoneCheck(false);
        self.phoneIsVerified(true);
        self.isButtonActive();
      } else {
        self.phoneCheck(true);
        self.phoneIsVerified(false);
        self.isButtonActive();
      }
    };

    self.subjectCheck = ko.observable(false);
    self.subjectIsVerified = ko.observable(false)
    self.checkSubject = function() {
      // Make sure the user entered in a couple sentences of data to make sure we get a good understanding.
      if(self.subject().length == 0) {
        self.subjectCheck(false);
      } else if (self.subject().length < 5) {
        self.subjectCheck(true);
        self.subjectIsVerified(false);
        self.isButtonActive();
      } else {
        self.subjectCheck(false);
        self.subjectIsVerified(true);
        self.isButtonActive();
      }
    };

    self.messageCheck = ko.observable(false);
    self.messageIsVerified = ko.observable(false)
    self.checkMessage = function() {
      // Make sure the user enters in some information with regards to a deadline.
      if(self.message().length == 0) {
        self.messageCheck(false)
      } else if (self.message().length < 15) {
        self.messageCheck(true);
        self.messageIsVerified(false);
        self.isButtonActive();
      } else {
        self.messageCheck(false);
        self.messageIsVerified(true);
        self.isButtonActive();
      }

    };

    self.isButtonActive = function() {
      if(self.nameIsVerified() && self.emailIsVerified() && self.phoneIsVerified() && self.subjectIsVerified() && self.messageIsVerified()) {
        self.isFormNotValidated(false);
      } else {
        self.isFormNotValidated(true);
      }
    };

  };


  var contactObjectVm = new ContactViewModel();
  ko.applyBindings(contactObjectVm,$("#contact")[0]);

  var previousInput;
  var currentSelectedSection = "";

$('.form-label').click(function() {

  $('.text-input').removeClass('input-method-animation');

  $(this).css('color','#4895D9');
  $(this).css('font-size', '14px');
  $(this).next().focus();

  $(this).next().css('border-bottom','1px solid #4895D9');
  $(this).next().addClass('input-method-animation');

  if ($(this).text() == currentSelectedSection) {
    console.log("They are the same.");
  }  else {
    currentSelectedSection = $(this).text();
    if (previousInput == undefined) {
      previousInput = $(this).next();
    } else {
        if (previousInput.val().length < 1 && previousInput != $(this)) {
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
    $(this).next().css('border-bottom','1px solid #4895D9');
  }
});

$('.contact-submit-button').hover(
  function() {
    $('.contact-submit-button').addClass( 'contact-submit-hover',10000);
  }, function() {
    $('.contact-submit-button').removeClass( 'contact-submit-hover',1000);
  }
);

$('.faq-selector').click(function() {
  location.href = '/faq';
});

})(jQuery); // End of use strict
