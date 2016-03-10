$(document).ready(function() {

  var ref = new Firebase("https://bg-outfitters.firebaseio.com");
  var huntingRef = ref.child("huntingTypes");

  function AdminViewModel() {

    var self = this;

    self.selectedAnimalType = ko.observable("");
    self.animalTypeAnimals = ko.observableArray("");
    self.huntTypes = ko.observableArray("");

    self.huntDatesContainerClicked = function() {
      $('#hunt-calendar-section').fadeIn();
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title'
        },
        dayClick: function() {
            console.log('a day has been clicked!');
        }
      });

      $('.fc-day-number').click(function() {
        console.log('This day was clicked');
      });
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


});
