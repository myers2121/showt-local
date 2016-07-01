(function($) {

  function ContactSupportViewModel() {

    var self = this;

    self.name = ko.observable("");
    self.email = ko.observable("");
    self.phone = ko.observable("");
    self.subject = ko.observable("");
    self.message = ko.observable("");
    self.merchantCheck = ko.observable(false);
    self.mobileAppCheck = ko.observable(false);
    self.discountsCheck = ko.observable(false);
    self.otherCheck = ko.observable(false);

    // Check if form input meets the parameters

    self.nameCheck = ko.observable(false);
    self.emailCheck = ko.observable(false);
    self.phoneCheck = ko.observable(false);
    self.subjectCheck = ko.observable(false);
    self.messageCheck = ko.observable(false);

    // Show the error label or not

    self.showNameErrorLabel = ko.observable(false);
    self.showEmailErrorLabel = ko.observable(false);
    self.showPhoneErrorLabel = ko.observable(false);
    self.showSubjectErrorLabel = ko.observable(false);
    self.showMessageErrorLabel = ko.observable(false);

    var formValidator = new FormValidator();

    self.checkName = function() {
      self.nameCheck(formValidator.checkName(self.name()));
      self.showNameErrorLabel(!(self.nameCheck()));
    };

    self.checkEmail = function() {
      self.emailCheck(formValidator.checkEmail(self.email()));
      self.showEmailErrorLabel(!(self.emailCheck()));
    };

    self.checkPhone = function() {
      self.phoneCheck(formValidator.checkPhone(self.phone()));
      self.showPhoneErrorLabel(!(self.phoneCheck()));
    };

    self.checkSubject = function() {
      self.subjectCheck(formValidator.checkSubject(self.subject()));
      self.showSubjectErrorLabel(!(self.subjectCheck()));
    };

    self.checkMessage = function() {
      self.messageCheck(formValidator.checkMessage(self.message()));
      self.showMessageErrorLabel(!(self.messageCheck()));
    };

    self.checkboxClicked = function(d,e) {

      var currentInquiry = $(e.currentTarget).attr("class").split(" ")[1];

      if (currentInquiry == "merchant-inquiry") {
        self.merchantCheck(true);
        self.mobileAppCheck(false);
        self.discountsCheck(false);
        self.otherCheck(false);
      } else if (currentInquiry == "mobile-app-inquiry") {
        self.mobileAppCheck(true);
        self.discountsCheck(false);
        self.otherCheck(false);
        self.merchantCheck(false);
      } else if (currentInquiry == "discounts-inquiry") {
        self.discountsCheck(true);
        self.merchantCheck(false);
        self.mobileAppCheck(false);
        self.otherCheck(false);
      } else {
        self.otherCheck(true);
        self.merchantCheck(false);
        self.mobileAppCheck(false);
        self.discountsCheck(false);
      }

      return true;
    };

    self.contactSupportButtonSubmit = function() {
      var reasonToMessage = "";

      if (self.merchantCheck()) {
        reasonToMessage = "Merchant inquiry";
      } else if (self.mobileAppCheck()) {
        reasonToMessage = "Mobile app inquiry";
      } else if (self.discountsCheck()) {
        reasonToMessage = "Discounts inquiry";
      } else {
        reasonToMessage = "Other inquiry";
      }

      if (self.nameCheck() && self.emailCheck() && self.phoneCheck() && self.subjectCheck() && self.messageCheck()) {

        var formData = {
          "name": self.name(),
          "email": self.email(),
          "phone": self.phone(),
          "subject": self.subject(),
          "message": self.message(),
          "inquiry": reasonToMessage
        };

        $.ajax({
          type: 'POST',
          data: JSON.stringify(formData),
          contentType: 'application/json',
          url: '/support/contact-support',
          success: function (data) {
                Success = true;//doesnt goes here
                // The email was successfully sent to Spacebar to get in contact with tem
                window.scrollTo(0, 0);
                $('body').css('overflow','hidden');
                $('.submitting-form-container').fadeIn();
            },
            error: function (textStatus, errorThrown) {
                Success = false;//doesnt goes here
                console.log(errorThrown);
            }
        });

      } else {
        // The form is not yet validated there are some error still on the screen.
      }

    };

  };

  var contactObjectVm = new ContactSupportViewModel();
  //ko.applyBindings(contactObjectVm,$("#contact-support-home")[0]);

  $('.inside-submit-confirmed-container .btn').click(function() {
    location.href = '/';
  });


})(jQuery); // End of use strict
