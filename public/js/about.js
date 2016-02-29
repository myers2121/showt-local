$(document).ready(function() {

  function AboutViewModel() {

    var self = this;

    self.hunt_type = ko.observable("");
    self.hunt_description = ko.observable("");

    self.huntItemClicked = function(data,event) {
      console.log(data.text());
    }

  };

  var aboutObjectVm = new AboutViewModel();
  ko.applyBindings(aboutObjectVm,$("#about")[0]);

  $('.billy-picture').click(function() {
    $('.about-people-expanded-billy').fadeIn();
  });

  $('.exit-person-expanded-billy').click(function() {
    $('.about-people-expanded-billy').fadeOut();
  });

  $('.janell-picture').click(function() {
    $('.about-people-expanded-janell').fadeIn();
  });

  $('.exit-person-expanded-janell').click(function() {
    $('.about-people-expanded-janell').fadeOut();
  });

});
