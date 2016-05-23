$(document).ready(function() {

  var ref = new Firebase("https://bg-outfitters.firebaseio.com");
  var huntingRef = ref.child("huntingTypes");
  var adminRef = ref.child("administrator");

  function AdminViewModel() {

    var self = this;

    self.selectedAnimalType = ko.observable("");
    self.animalTypeAnimals = ko.observableArray("");
    self.huntTypes = ko.observableArray("");
    self.dateSelected = ko.observable("");
    self.selectedAnimalTypeSpecific = ko.observable("");
    self.animalToSaveDates = ko.observableArray("");
    self.currentAdminName = ko.observable("");
    self.datesForAnimal = ko.observableArray("");
    self.currentDate = ko.observableArray("");
    self.currentDateCity = ko.observable("");
    self.currentDateState = ko.observable("");
    self.currentDateTime = ko.observable("");
    self.currentDateDate = ko.observable("");
    self.currentDateURL = ko.observable("");

    // For handling the create hunt form
    self.huntLocationCity = ko.observable("");
    self.huntLocationState = ko.observable("");
    self.googleURL = ko.observable("");
    self.ampm = ko.observable("");
    self.minuteTime = ko.observable("");
    self.hourTime = ko.observable("");

    var authData = ref.getAuth();

    // self.loadUserData = function() {
    //   console.log(authData.uid);
    //   adminRef.orderByChild("id").equalTo(authData.uid).once("value", function(snapshot) {
    //     console.log(snapshot);
    //   });
    // };
    //
    // self.loadUserData();

    self.currentHuntsContainerClicked = function() {
      self.huntTypes([]);
      console.log(self.huntTypes());
      firebaseFuncs.ref.child("/huntingTypes").once("value", function(snapshot) {
        var huntingTypes = snapshot.val();
        $.each(huntingTypes, function(index,value) {
          self.huntTypes.push(value);
        });
        console.log(self.huntTypes());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      $('#current-hunts-section').fadeIn(250,function() {

      });
    };

    self.registerHunterContainerClicked = function() {
      $('#register-hunter-section').fadeIn(250,function() {

      });
    };

    self.huntDatesContainerClicked = function() {
      $('#hunt-calendar-section').fadeIn();
      $('#calendar').fullCalendar({
        selectable: true,
        dayClick: function(date, allDay, jsEvent, view) {
            if (allDay) {
                if ($(jsEvent.target).is('div.fc-day-number')) {
                    alert('Clicked on the day');
                }
                else{
                    alert('Clicked everywhere');
                }
            }
        },
        header: {
          left: 'prev,next today',
          center: 'title'
        }
      });

      $('.fc-day-number').click(function() {
        self.dateSelected($(this).data("date"));
        $('.calendar-container').fadeOut(500,function() {
            $('.create-hunt-first').fadeIn();
        });
      });

      $('.fc-next-button').click(function() {
        $('.fc-day-number').click(function() {
          self.dateSelected($(this).data("date"));
          $('.calendar-container').fadeOut(500,function() {
              $('.create-hunt-first').fadeIn();
          });
        });
      });

      $('.fc-prev-button').click(function() {
        $('.fc-day-number').click(function() {
          self.dateSelected($(this).data("date"));
          $('.calendar-container').fadeOut(500,function() {
              $('.create-hunt-first').fadeIn();
          });
        });
      });

      self.huntTypes([]);
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

    self.huntCalendarAnimalClicked = function(huntType) {
      self.animalTypeAnimals(huntType.animal);
      self.selectedAnimalType(huntType.animalType);
      $('.create-hunt-first').fadeOut(250, function() {
        $('.create-hunt-second').fadeIn();
      });
    };

    self.huntContainerAnimalTypeClicked = function(huntTypeAnimal) {
      self.selectedAnimalTypeSpecific(huntTypeAnimal.animalName);
      self.animalToSaveDates(huntTypeAnimal.huntingDates)
      console.log(huntTypeAnimal);
      $('.create-hunt-second').fadeOut(250, function() {
        $('.create-hunt-final').fadeIn();
      });
    };

    self.createNewHunt = function() {
        console.log(self.animalToSaveDates());
        self.animalToSaveDates.push({
          city: self.huntLocationCity(),
          date: self.dateSelected(),
          state: self.huntLocationState(),
          time: self.hourTime() + ":" + self.minuteTime() + " " + self.ampm(),
          url: self.googleURL()
        });

        // Before we save the hunts we need to be able to sort them by an array.

        huntingRef.update(self.huntTypes());

    };

    self.huntPriceContainerClicked = function() {
      self.huntTypes([]);
      firebaseFuncs.ref.child("/huntingTypes").once("value", function(snapshot) {
        var huntingTypes = snapshot.val();
        $.each(huntingTypes, function(index,value) {
          self.huntTypes.push(value);
        });
        console.log(self.huntTypes());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      $('#hunt-price-section').fadeIn();
      // huntingRef.set(self.animals);
    };

    self.editButtonClicked= function(huntType) {
      self.animalTypeAnimals(huntType.animal);
      self.selectedAnimalType(huntType.animalType);
      $('.hunt-prices-container').fadeOut(500,function() {
          $('.hunt-clicked-edit-container').fadeIn();
      });

    };

    self.exitEditContatinerClicked = function() {
      $('#hunt-price-section').css('display', 'block !important');
      $('.hunt-clicked-edit-container').fadeOut(500, function() {
          $('.hunt-prices-container').fadeIn();
      });
    };

    var isFirstClick = true;

    self.registerHuntsContainerClicked = function() {
      self.huntTypes([]);
      firebaseFuncs.ref.child("/huntingTypes").once("value", function(snapshot) {
        var huntingTypes = snapshot.val();
        $.each(huntingTypes, function(index,value) {
          self.huntTypes.push(value);
        });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      $('#register-hunts-section').fadeIn();
      $('html, body').animate({
        scrollTop: $("#register-hunts-section").offset().top
      }, 500);
    };

    self.registeredAnimalAnimals = ko.observableArray("");

    self.registeredHuntsAnimalClicked = function(huntType) {
      self.registeredAnimalAnimals(huntType.huntersRegistered);
      console.log(self.registeredAnimalAnimals());
      $('#register-hunts-section').css('height','auto');
      $('.hunts-registered-container').fadeOut(250, function() {
        $('.containing-registered-animals').fadeIn();
      });
    };

    self.deleteCurrentRegisteredHunt = function(currentDate) {
      var indexToDelete = 0;
      console.log(currentDate);
      for(var i = 0; i < self.registeredAnimalAnimals().length; i++) {
        var city = self.registeredAnimalAnimals()[i].city;
        var date = self.registeredAnimalAnimals()[i].date;
        var state = self.registeredAnimalAnimals()[i].state;
        var time = self.registeredAnimalAnimals()[i].time;
        var name = self.registeredAnimalAnimals()[i].name;

        if (city == currentDate.city && date == currentDate.date && state == currentDate.state && time == currentDate.time && name == currentDate.name) {
          indexToDelete = i;
          console.log(indexToDelete);
        }
      }
      self.registeredAnimalAnimals.splice(indexToDelete, 1);
      //huntingRef.update(self.huntTypes());
      console.log(self.registeredAnimalAnimals());
    };

    self.saveHuntPriceUpdate = function(data) {
      huntingRef.update(self.huntTypes());
    };

    self.saveHuntDateCity = function(data) {
      huntingRef.set(self.huntTypes());
    };

    self.saveHuntDateState = function(data) {
        huntingRef.update(self.huntTypes());
    };

    self.saveHuntDateTime = function(data) {
        huntingRef.update(self.huntTypes());
    };

    self.saveHuntDateURL = function(data) {
        huntingRef.update(self.huntTypes());
    };

    self.animalTypeSelected = function(huntType) {
      self.animalTypeAnimals(huntType.animal);
      self.selectedAnimalType(huntType.animalType);
      $('.created-hunts-container').fadeOut(250, function() {
        $('.created-hunt-animal-selected-container').fadeIn();
      });
    };

    self.animalTypeSelectedExpanded = function(huntAnimal) {
      console.log(huntAnimal.huntingDates);
      self.selectedAnimalTypeSpecific(huntAnimal.animalName);
      self.datesForAnimal(huntAnimal.huntingDates);
      $('.created-hunt-animal-selected-container').fadeOut(250, function() {
        $('.current-available-dates-for-animal').fadeIn();
      });
    };

    self.editThisDate = function(currentDate) {
        self.currentDate(currentDate);
        $('.current-available-dates-for-animal').fadeOut(250, function () {
          $('.edit-current-date-container').fadeIn();
        });
    };

    self.deleteThisDate = function(currentDate) {
      self.currentDate("");
      var indexToDelete = 0;
      for(var i = 0; i < self.datesForAnimal().length; i++) {
        var city = self.datesForAnimal()[i].city;
        var date = self.datesForAnimal()[i].date;
        var state = self.datesForAnimal()[i].state;
        var time = self.datesForAnimal()[i].time;
        var url = self.datesForAnimal()[i].url;

        if (city == currentDate.city && date == currentDate.date && state == currentDate.state && time == currentDate.time && url == currentDate.url) {
          console.log(self.datesForAnimal()[i]);
          indexToDelete = i;
        }

        self.datesForAnimal.splice(indexToDelete, 1);
        huntingRef.update(self.huntTypes());
      }

    };

    self.saveCurrentDate = function() {
      $('.edit-current-date-container').fadeOut(250, function() {
        $('.created-hunts-container').fadeIn();
      });
    };


    // Below are the methods and variables used to register a hunter

    self.email = ko.observable("");
    self.phoneNumber = ko.observable("");
    self.selectedHuntTypeAnimals = ko.observableArray("");
    self.firstName = ko.observable("");
    self.lastName = ko.observable("");
    self.registeredHunterToSave = ko.observableArray("");

    self.currentAvailableDatesForSelectedHunt = ko.observableArray("");

    self.currentHuntAnimal = ko.observable("");
    self.currentHuntPrice = ko.observable("");
    var dateSelected = "";
    var timeSelected = "";
    var citySelected = "";
    var stateSelected = "";
    var nameRegistered = '';

    self.isFormNotValidated = ko.observable(true);

    self.huntTypes = ko.observableArray("");

    self.huntTypeSelected = function(huntType) {
      self.selectedHuntTypeAnimals(huntType.animal);
      self.registeredHunterToSave(huntType.huntersRegistered);
      $('.hunt-choices-overall-container').fadeIn();
    };

    self.registrationInformationFinished = function() {

      // Create a hunt in the database for the animal

      var confirmationNumber = Math.floor(Math.random() * 1000000000);

      console.log(confirmationNumber);

      self.registeredHunterToSave.push({
        animalType: self.currentHuntAnimal(),
        animalPrice: self.currentHuntPrice(),
        name: self.firstName() + " " + self.lastName(),
        email: self.email(),
        phoneNumber: self.phoneNumber(),
        city: citySelected,
        date: dateSelected,
        state: stateSelected,
        time: timeSelected,
        paid: false,
        confirmationNumber: confirmationNumber
      });

      huntingRef.set(self.huntTypes());

      $.post("/registeredHunter",
        {
          animalType: self.currentHuntAnimal(),
          animalPrice: self.currentHuntPrice(),
          name: self.firstName() + " " + self.lastName(),
          email: self.email(),
          phoneNumber: self.phoneNumber(),
          city: citySelected,
          date: dateSelected,
          state: stateSelected,
          time: timeSelected,
          confirmationNumber: confirmationNumber
        },
        function(data, status){
          //  alert("Data: " + data + "\nStatus: " + status);
            $('.register-hunter-container').fadeOut(250, function() {
              $('#register-hunter-section').css('height','100vh');
              $('.hunter-registration-finished-container').fadeIn();
            });
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
      console.log(date);
      dateSelected = date.date;
      citySelected = date.city;
      stateSelected = date.state;
      timeSelected = date.time;
      nameRegistered = self.firstName() + " " + self.lastName();
    };

    self.loadHuntTypes = function() {
      firebaseFuncs.ref.child("/huntingTypes").once("value", function(snapshot) {
        var huntingTypes = snapshot.val();
        $.each(huntingTypes, function(index,value) {
          self.huntTypes.push(value);
        });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    };

    self.loadHuntTypes();

    self.firstNameCheck = ko.observable(false);
    self.firstNameIsVerified = ko.observable(false)
    self.checkFirstName = function(namer) {
      if(self.firstName().length == 0) {
        self.firstNameCheck(false);
      } else if (self.firstName().length < 2) {
        self.firstNameCheck(true);
        self.firstNameIsVerified(false);
        self.isButtonActive();
      } else {
        self.firstNameCheck(false);
        self.firstNameIsVerified(true)
        self.isButtonActive();
      }
    };

    self.lastNameCheck = ko.observable(false);
    self.lastNameIsVerified = ko.observable(false)
    self.checkLastName = function(namer) {
      if(self.lastName().length == 0) {
        self.lastNameCheck(false);
      } else if (self.lastName().length < 2) {
        self.lastNameCheck(true);
        self.lastNameIsVerified(false);
        self.isButtonActive();
      } else {
        self.lastNameCheck(false);
        self.lastNameIsVerified(true)
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

    self.isButtonActive = function() {
      if(self.firstNameIsVerified() && self.lastNameIsVerified() && self.emailIsVerified() && self.phoneIsVerified() && citySelected != "") {
        self.isFormNotValidated(false);
      } else {
        self.isFormNotValidated(true);
      }
    };

};


  var adminObjectVm = new AdminViewModel();
  ko.applyBindings(adminObjectVm,$("#admin")[0]);
  ko.applyBindings(adminObjectVm,$("#hunt-price-section")[0]);
  ko.applyBindings(adminObjectVm,$("#hunt-calendar-section")[0]);
  ko.applyBindings(adminObjectVm,$("#current-hunts-section")[0]);
  ko.applyBindings(adminObjectVm,$("#register-hunter-section")[0]);
  ko.applyBindings(adminObjectVm,$("#register-hunts-section")[0]);

  window.onload = function() {
    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      alert('You must be logged in as an administrator to access this page.');
      location.href = '/login';
    }
  };

  $('.registered-animals-back-button').click(function() {
    $('.containing-registered-animals').fadeOut(250, function() {
      $('#register-hunts-section').css('height','100vh');
      $('.hunts-registered-container').fadeIn();
      $('html, body').animate({
        scrollTop: $("#register-hunts-section").offset().top
      }, 500);
    });
  });

  $('.close-calendar-popup ').click(function() {
    $('#hunt-calendar-section').fadeOut();
  });

  $('.exit-hunt-prices').click(function() {
    $('#hunt-price-section').fadeOut();
  });

  $('.exit-hunt-calendar-first').click(function() {
     $('.create-hunt-first').fadeOut(250, function() {
       $('.calendar-container').fadeIn();
     });
  });

  $('.exit-hunt-calendar-second').click(function() {
     $('.create-hunt-second').fadeOut(250, function() {
       $('.create-hunt-first').fadeIn();
     });
  });

  $('.exit-hunt-calendar-final').click(function() {
     $('.create-hunt-final').fadeOut(250, function() {
       $('.create-hunt-second').fadeIn();
     });
  });

  $('.exit-created-hunts').click(function() {
    $('#current-hunts-section').fadeOut(250, function() {

    });
  });

  $('.exit-created-hunts-expanded').click(function() {
    $('.created-hunt-animal-selected-container').fadeOut(250,function() {
      $('.created-hunts-container').fadeIn();
    });
  });

  $('.exit-final-dates-container').click(function() {
    $('.current-available-dates-for-animal').fadeOut(250, function() {
      $('.created-hunt-animal-selected-container').fadeIn();
    });
  });

  $('.exit-date-editor').click(function() {
    $('.edit-current-date-container').fadeOut(function() {
      $('.current-available-dates-for-animal').fadeIn();
    });
  });

  $('.exit-register-hunter-container').click(function() {
    $('#register-hunter-section').fadeOut();
  });

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

  $('.exit-register-hunts-container').click(function() {
    $('#register-hunts-section').fadeOut();
  });

  $('.finish-registration-button').click(function() {
    $('#register-hunter-section').fadeOut(250, function() {
      $('#register-hunter-section').css('height','auto');
      $('.hunter-registration-finished-container').fadeOut();
      $('.register-hunter-container').fadeIn();
    });
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

});
