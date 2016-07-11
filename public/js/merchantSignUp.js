(function($) {

  function MerchantSignUpViewModel() {

    var self = this;

    var ref = new Firebase("https://passenger-app.firebaseio.com");
    var merchantsSignUpRef = ref.child('merchantSignUpSubmit');

    self.merchantSignUpTitle = ko.observable("");
    self.merchantSignUpText = ko.observable("");
    self.email = ko.observable("");
    self.confirmEmail = ko.observable("");
    self.businessType = ko.observable("");
    self.businessCategory = ko.observable("");
    self.businessName = ko.observable("");
    self.businessPhone = ko.observable("");
    self.firstName = ko.observable("");
    self.lastName = ko.observable("");
    self.address = ko.observable("");
    self.zipcode = ko.observable("");
    self.city = ko.observable("");
    self.state = ko.observable("");
    self.personalPhone = ko.observable("");
    self.position = ko.observable("");

    var merchantInfoIterator = 0;

    self.topMerchantSignUpItems = [
      {
        "img": "/static/img/contact.png",
        "title": "Get in touch",
        "text": "Get in contact with us by filling out the forms below.",
        "myClass": "contact-div"
      },
      {
        "img": "/static/img/money.png",
        "title": "Sign up for free",
        "text": "Begin the process of creating your free account on Passenger.",
        "myClass": "free-div"
      },
      {
        "img": "/static/img/building.png",
        "title": "Grow your business",
        "text": "Begin offering rewards immediately to expand your business.",
        "myClass": "grow-div"
      }
    ];

    self.merchantHeaderInfo = [
      {
        "title": "Let's get started",
        "text": "Fill out the form below with the necessary information for us to reach you and to find out more about you and your business"
      },
      {
        "title": "Tell us about your business",
        "text": "Give us a little information about your business so we can get a better understanding of your business to make sure your Passenger experience is perfect."
      },
      {
        "title": "Tell us about yourself",
        "text": "Give us a better understanding of yourself so that when we get in contact with you and can make sure to tailor Passenger to the needs that you have personally and professionally."
      }
    ];

    self.isEmailFormValidated = ko.observable(false);

    self.emailCheck = ko.observable(false);
    self.emailIsVerified = ko.observable(false)
    self.checkEmail = function() {
      // Check to see if the email is valid
      if(self.email().length == 0) {
        self.emailCheck(false);
      } else if (self.email().length < 2) {
        self.emailCheck(true);
        self.emailIsVerified(false);
      } else if(self.validateEmail(self.email())) {
        self.emailCheck(false);
        self.emailIsVerified(true);
      } else {
        self.emailCheck(true)
        self.emailIsVerified(false);
      }
    };

    self.emailConfirmCheck = ko.observable(false);
    self.emailConfirmLabelVerified = ko.observable(false);
    self.checkEmailConfirm = function() {
      if (self.confirmEmail() == 0) {
        self.emailConfirmCheck(false);
        self.isEmailFormValidated(false);
      } else if (self.email() == self.confirmEmail()) {
        self.emailConfirmCheck(false);
        self.emailConfirmLabelVerified(true);
        self.isEmailFormValidated(true);
      } else {
        self.emailConfirmCheck(true);
        self.emailConfirmLabelVerified(false);
        self.isEmailFormValidated();
      }
    };

    self.validateEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };


    self.businessTypeCheck = ko.observable(false);
    self.businessTypeFormCheck = ko.observable(false);
    self.checkBusinessType = function() {
      if (self.businessType().length == 0) {
        self.businessTypeCheck(false);
        self.businessTypeFormCheck(false);
      } else if (self.businessType().length > 2) {
        self.businessTypeCheck(true);
        self.businessTypeFormCheck(false);
      } else {
        self.businessTypeCheck(false);
        self.businessTypeFormCheck(true);
      }
    };

    self.businessCategoryCheck = ko.observable(false);
    self.businessCategoryFormCheck = ko.observable(false);
    self.checkBusinessCategory = function() {
      if (self.businessCategory().length == 0) {
        self.businessCategoryCheck(false);
        self.businessCategoryFormCheck(false);
      } else if (self.businessCategory().length > 2) {
        self.businessCategoryCheck(true);
        self.businessCategoryFormCheck(false);
      } else {
        self.businessCategoryCheck(false);
        self.businessCategoryFormCheck(true);
      }
    };

    self.businessNameCheck = ko.observable(false);
    self.businessNameFormCheck = ko.observable(false);
    self.checkBusinessName = function() {
      if (self.businessName().length == 0) {
        self.businessNameCheck(false);
        self.businessNameFormCheck(false);
      } else if (self.businessName().length > 4) {
        self.businessNameCheck(true);
        self.businessNameFormCheck(false);
      } else {
        self.businessNameCheck(false);
        self.businessNameFormCheck(true);
      }
    };

    self.businessPhoneCheck = ko.observable(false);
    self.businessPhoneFormCheck = ko.observable(false);
    self.checkBusinessPhone = function() {
      var isnum = /^\d+$/.test(self.businessPhone());
      if (self.businessPhone().length == 10 && isnum) {
        self.businessPhoneCheck(true);
        self.businessPhoneFormCheck(false);
      } else {
        self.businessPhoneCheck(false);
        self.businessPhoneFormCheck(true);
      }
    };

    self.checkBusinessInfo = function() {
      if ( self.businessTypeCheck() && self.businessCategoryCheck() && self.businessNameCheck() && self.businessPhoneCheck() ) {
        return true;
      } else {
        return false;
      }
    };

    self.firstNameCheck = ko.observable(false);
    self.showFirstNameErrorLabel = ko.observable(false);
    self.checkFirstName = function() {
      if ( self.firstName().length > 1 ) {
        self.firstNameCheck(true);
        self.showFirstNameErrorLabel(false);
      } else {
        self.firstNameCheck(false);
        self.showFirstNameErrorLabel(true);
      }
    };

    self.lastNameCheck = ko.observable(false);
    self.showLastNameErrorLabel = ko.observable(false);
    self.checkLastName = function() {
      if ( self.lastName().length > 1 ) {
        self.lastNameCheck(true);
        self.showLastNameErrorLabel(false);
      } else {
        self.lastNameCheck(false);
        self.showLastNameErrorLabel(true);
      }
    };

    self.addressCheck = ko.observable(false);
    self.showAddressErrorLabel = ko.observable(false);
    self.checkAddress = function() {
      if (self.address() > 5) {
        self.addressCheck(true);
        self.showAddressErrorLabel(false);
      } else {
        self.addressCheck(false);
        self.showAddressErrorLabel(true);
      }
    };

    self.zipcodeCheck = ko.observable(false);
    self.showZipcodeErrorLabel = ko.observable(false);
    self.checkZipcode = function() {
      if (self.zipcode().length > 2 && self.zipcode().length < 10) {
        self.zipcodeCheck(true);
        self.showZipcodeErrorLabel(false);
      } else {
        self.zipcodeCheck(false);
        self.showZipcodeErrorLabel(true);
      }
    };

    self.cityCheck = ko.observable(false);
    self.showCityErrorLabel = ko.observable(false);
    self.checkCity = function() {
      if (self.city().length > 1) {
        self.cityCheck(true);
        self.showCityErrorLabel(false);
      } else {
        self.cityCheck(false);
        self.showCityErrorLabel(true);
      }
    };

    self.stateCheck = ko.observable(false);
    self.showStateErrorLabel = ko.observable(false);
    self.checkState = function() {
      if ( self.state().length == 2 ) {
        self.stateCheck(true);
        self.showStateErrorLabel(false);
      } else {
        self.stateCheck(false);
        self.showStateErrorLabel(true);
      }
    };

    self.personalPhoneCheck = ko.observable(false);
    self.showPersonalPhoneErrorLabel = ko.observable(false);
    self.checkPersonalPhone = function() {
      var isnum = /^\d+$/.test(self.personalPhone());
      if (self.personalPhone().length == 10 && isnum) {
        self.personalPhoneCheck(true);
        self.showPersonalPhoneErrorLabel(false);
      } else {
        self.personalPhoneCheck(false);
        self.showPersonalPhoneErrorLabel(true);
      }
    };

    self.positionCheck = ko.observable(false);
    self.showPositionErrorLabel = ko.observable(false);
    self.checkPosition = function() {
      if ( self.position().length > 2 ) {
        self.positionCheck(true);
        self.showPositionErrorLabel(false);
      } else {
        self.positionCheck(false);
        self.showPositionErrorLabel(true);
      }
    };

    self.checkPersonalInfo = function() {
      if (self.firstNameCheck() && self.lastNameCheck() && self.zipcodeCheck() && self.cityCheck() && self.stateCheck() && self.personalPhoneCheck() && self.positionCheck()) {
        return true;
      } else {
        return false;
      }
    };

    self.continueButtonClicked = function() {

      if ( merchantInfoIterator == 0  && self.isEmailFormValidated() ) {

          merchantInfoIterator += 1;
          self.merchantSignUpTitle(self.merchantHeaderInfo[merchantInfoIterator].title);
          self.merchantSignUpText(self.merchantHeaderInfo[merchantInfoIterator].text);
          $('.merchants-email-container').fadeOut(function() {
            $('.merchants-business-info-container').fadeIn();
            window.scrollTo(0, 0);
          });

      } else if ( merchantInfoIterator == 1 && self.checkBusinessInfo() ) {

        merchantInfoIterator += 1;
        self.merchantSignUpTitle(self.merchantHeaderInfo[merchantInfoIterator].title);
        self.merchantSignUpText(self.merchantHeaderInfo[merchantInfoIterator].text);
        $( '.merchants-business-info-container' ).fadeOut(function() {
          $( '.merchants-personal-info-container' ).fadeIn();
          $( '.merchant-form-button-container .btn' ).text('Finish');
          window.scrollTo(0, 0);
        });

      } else if ( merchantInfoIterator == 2 && self.checkPersonalInfo() ){
        window.scrollTo(0, 0);
        $('body').css('overflow','hidden');
        $('.submitting-form-container').fadeIn();

        var merchantToSignUp = {
          "email": self.confirmEmail(),
          "businessType": self.businessType(),
          "businessCategory": self.businessCategory(),
          "businessName": self.businessName(),
          "businessPhone": self.businessPhone(),
          "firstName": self.firstName(),
          "lastName": self.lastName(),
          "address": self.address(),
          "zipcode": self.zipcode(),
          "city": self.city(),
          "state": self.state(),
          "personalPhone": self.personalPhone(),
          "position": self.position()
        };

        merchantsSignUpRef.push(merchantToSignUp);

        var emailData = {};
        emailData.businessName = self.businessName();
        emailData.name = self.firstName() + " " + self.lastName();
        emailData.businessPhone = self.businessPhone();
        emailData.personalPhone = self.personalPhone();
        emailData.message = self.businessName() + " has submitted the form to get more information about becoming a merchant on Passenger. Get in contact with them in the next 24 hours to respond to their request.";

        $.ajax({
          type: 'POST',
          data: JSON.stringify(emailData),
          contentType: 'application/json',
          url: '/merchants/submit',
          success: function (data) {
                Success = true;//doesnt goes here
                // The email was successfully sent to Spacebar to get in contact with tem
                $('.inside-submit-container').fadeOut(function() {
                  $('.inside-submit-confirmed-container').fadeIn();
                });
            },
            error: function (textStatus, errorThrown) {
                Success = false;//doesnt goes here
                console.log(errorThrown);
            }
        });

      }

    };

    self.merchantSignUpTitle(self.merchantHeaderInfo[merchantInfoIterator].title);
    self.merchantSignUpText(self.merchantHeaderInfo[merchantInfoIterator].text);

    setTimeout(function(){
      $('.free-div').fadeIn();
    }, 700);

    setTimeout(function(){
      $('.grow-div').fadeIn();
    }, 1000);

    self.sendMerchantSignUpEmail = function() {
      console.log("Working");
      window.location = '/';
    };

  };

  var merchantObjectVm = new MerchantSignUpViewModel();
  //ko.applyBindings(merchantObjectVm,$("#merchant-sign-up")[0]);
  //ko.applyBindings(merchantObjectVm,$("#merchant-form-section")[0]);
  //ko.applyBindings(merchantObjectVm,$(".submitting-form-container")[0]);

})(jQuery); // End of use strict
