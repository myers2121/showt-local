(function($) {

  var ref = new Firebase("https://bg-outfitters.firebaseio.com");
  var huntingRef = ref.child("huntingTypes");

  function RegisterViewModel() {

    var self = this;

    self.name = ko.observable("");
    self.email = ko.observable("");
    self.phoneNumber = ko.observable("");
    self.subject = ko.observable("");
    self.message = ko.observable("");
    self.selectedHuntTypeAnimals = ko.observableArray("");
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.confirmationNumber = ko.observable("");

    self.animalType = ko.observable("");
    self.animalDate = ko.observable("");
    self.animalCity = ko.observable("");
    self.animalState = ko.observable("");
    self.animalTime = ko.observable("");
    self.animalPrice = ko.observable("");
    self.animalImage = ko.observable("");
    self.registeredUsersFirstName = ko.observable("");
    self.registeredUsersLastName = ko.observable("");

    self.isFormNotValidated = ko.observable(true);

    self.huntTypes = ko.observableArray("");

    self.huntTypeSelected = function(huntType) {
      self.selectedHuntTypeAnimals(huntType.animal);
      $('.hunt-choices-overall-container').fadeIn();
    };

    self.confirmationCodeSubmission = function() {
      // Check to make sure the user has selected a hunt, a date, and entered in all of their information before proceeding.

      for (var i = 0; i < self.huntTypes().length; i++) {
        var length = self.huntTypes()[i].huntersRegistered.length;
        for (var j = 0; j < length; j++) {
          console.log(self.huntTypes()[i].huntersRegistered[j]);
          if (self.huntTypes()[i].huntersRegistered[j].confirmationNumber == self.confirmationNumber()) {
            // Break from the loop because this is the hunt we need.
            self.animalType(self.huntTypes()[i].huntersRegistered[j].animalType);
            self.animalDate(self.huntTypes()[i].huntersRegistered[j].date);
            self.animalCity(self.huntTypes()[i].huntersRegistered[j].city);
            self.animalState(self.huntTypes()[i].huntersRegistered[j].state);
            self.animalTime(self.huntTypes()[i].huntersRegistered[j].time);
            self.animalPrice(self.huntTypes()[i].huntersRegistered[j].animalPrice);

            var fullName = self.huntTypes()[i].huntersRegistered[j].name;

            self.registeredUsersFirstName(fullName.split(' ').slice(0, -1).join(' '));
            self.registeredUsersLastName(fullName.split(' ').slice(-1).join(' '));

            self.animalImage(self.huntTypes()[i].imgDark);
          }
        }
      };

      $('.register-first-container').fadeOut(250, function() {
        $('#footer').fadeOut();
        $('.back-button').css('display', 'none');
        $('.register-payment-section').fadeIn();
        $('#register').css('margin-bottom','0px');
        window.scrollTo(0, 0);
      });
    };

    self.loadDatesForHunt = function(huntType) {
      self.currentHuntAnimal(huntType.animalName);
      self.currentHuntPrice(huntType.price);
      self.currentAvailableDatesForSelectedHunt(huntType.huntingDates);
      console.log(self.currentAvailableDatesForSelectedHunt());
      $('.hunt-choices-overall-container').fadeOut();
      $('html, body').animate({
        scrollTop: $("#current-hunt-date-container").offset().top - 60
      }, 2000);
    };

    self.selectedDateForHunt = function(date, event) {
      $('.selected-date-container').css('background','#fff');
      $(event.currentTarget).css('background','#e3e3e3');
    };

    self.loadHuntTypes = function() {
      firebaseFuncs.ref.child("/huntingTypes").once("value", function(snapshot) {
        var huntingTypes = snapshot.val();
        $.each(huntingTypes, function(index,value) {
          self.huntTypes.push(value);
        });
        console.log(self.huntTypes());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    };

    self.loadHuntTypes();

    self.nameCheck = ko.observable(false);
    self.nameIsVerified = ko.observable(false)
    self.checkName = function(namer) {
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

    self.purchaseHunt = function() {
      $('.register-payment-container').fadeOut(500, function() {
        $('.register-confirmation-container').fadeIn();
      });
    };

    self.finishRegistrationProcess = function() {

    };
  };


  var registerObjectVm = new RegisterViewModel();
  ko.applyBindings(registerObjectVm,$("#register")[0]);
  ko.applyBindings(registerObjectVm,$(".register-payment-section")[0]);

  var previousInput;
  var currentSelectedSection = "";

  $('.exit-register-hunt-expanded').click(function() {
    $('.hunt-choices-overall-container').fadeOut();
  });

  $('.register-information-button').click(function() {

  });

  $('.exit-checkout').click(function() {
    $('.register-payment-section').fadeOut(250, function() {
        $('.register-first-container').fadeIn();
        $('#footer').fadeIn();
        $('.back-button').css('display','block');
    });
  });

  $('.bg-outfitters-button').click(function() {
    location.href = '/';
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