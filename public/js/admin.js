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

    self.saveHuntPriceUpdate = function(data) {
      console.log(self.huntTypes());
      huntingRef.update(self.huntTypes());
    };

};


  var adminObjectVm = new AdminViewModel();
  ko.applyBindings(adminObjectVm,$("#admin")[0]);
  ko.applyBindings(adminObjectVm,$("#hunt-price-section")[0]);
  ko.applyBindings(adminObjectVm,$("#hunt-calendar-section")[0]);

  window.onload = function() {
    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      alert('You must be logged in as an administrator to access this page.');
      location.href = '/login';
    }
  };

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

  var previousInput;
  var currentSelectedSection = "";

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
