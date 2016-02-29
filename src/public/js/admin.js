$(document).ready(function() {

  var ref = new Firebase("https://bg-outfitters.firebaseio.com");
  // ref.createUser({
  //   email: "bobtony@firebase.com",
  //   password: "correcthorsebatterystaple"
  // }, function(error, userData) {
  //   if (error) {
  //     switch (error.code) {
  //       case "EMAIL_TAKEN":
  //         console.log("The new user account cannot be created because the email is already in use.");
  //         break;
  //       case "INVALID_EMAIL":
  //         console.log("The specified email is not a valid email.");
  //         break;
  //       default:
  //         console.log("Error creating user:", error);
  //     }
  //   } else {
  //     console.log("Successfully created user account with uid:", userData.uid);
  //   }
  // });

  function AdminViewModel() {

    var self = this;

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
      $('#hunt-price-section').fadeIn();
    };

  };


  var adminObjectVm = new AdminViewModel();
  ko.applyBindings(adminObjectVm,$("#admin")[0]);

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
