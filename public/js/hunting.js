$(document).ready(function() {

  var ref = new Firebase("https://bg-outfitters.firebaseio.com");
  var huntingRef = ref.child("huntingTypes");

  var HuntingViewModel = function() {

    var self = this;

    self.hunt_type = ko.observable("");
    self.locations = ko.observable("");
    self.hunt_description = ko.observable("");
    self.locationFrameSRC = ko.observable("");
    self.animalSelected = ko.observableArray("");
    self.locationsAnimals = ko.observableArray("");
    self.animalSelectedSpecific = ko.observable("");
    self.animalSelectedSpecificDates = ko.observableArray("");
    self.animalNameAndDateForLocation = ko.observable("");

    self.huntItemClicked = function(huntingType) {
      console.log(huntingType);
      self.hunt_type(huntingType.animalType);
      self.hunt_description(huntingType.description);
      self.animalSelected(huntingType.animal);
      console.log(self.animalSelected());
      $('.hunt-type-popup').fadeIn();
      $('body').css('overflow','hidden');
    };

    self.locationClicked = function(huntingType) {
      self.locationsAnimals(huntingType.animal);
      self.hunt_type(huntingType.animalType);
      console.log(self.locationsAnimals());
      //self.hunt_type(huntingType.animalName);
      //self.locations(huntingType.locations);
      $('.hunt-location-popup').fadeIn();
      $('body').css('overflow','hidden');
    };

    self.specificAnimalClicked = function(huntingType) {
      console.log(huntingType);
      self.animalSelectedSpecific(huntingType.animalName);
      self.animalSelectedSpecificDates(huntingType.huntingDates);
      console.log(self.animalSelectedSpecificDates());
      $('.hunt-location-expanded-container').fadeOut(250, function() {
        $('.hunt-location-dates-container').fadeIn();
      });
    };

    self.openGoogleMaps = function(huntType) {
        console.log(huntType);
        self.locationFrameSRC(huntType.url);
        var animalNameAndDate = self.animalSelectedSpecific() + " - " + huntType.date
        self.animalNameAndDateForLocation(animalNameAndDate);
      $('.hunt-location-dates-container').fadeOut(250, function() {
        $('.frame-container').fadeIn();
      });
    }

    self.locationSelected = function(location) {
      self.locationFrameSRC(location.frame);
      $('.frame-container').fadeIn();
    }

    self.huntTypes = ko.observableArray("");

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

  var huntingObjectVm = new HuntingViewModel();
  ko.applyBindings(huntingObjectVm,$("#hunting")[0]);

  $('.exit-person-expanded-hunt').click(function() {
    $('.hunt-type-popup').fadeOut();
    $('body').css('overflow','auto');
  });

  $('.exit-location-expanded-frame').click(function() {
    $('.frame-container').fadeOut(250, function() {
      $('.hunt-location-dates-container').fadeIn();
    });
  });

  $('.exit-location-expanded-hunt').click(function() {
    $('.hunt-location-popup').fadeOut();
    $('body').css('overflow','auto');
  });

  $('.exit-location-expanded-dates').click(function() {
    $('.hunt-location-dates-container').fadeOut(250, function() {
      $('.hunt-location-expanded-container').fadeIn();
    });
  });

});
