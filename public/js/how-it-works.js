(function($) {

  var ref = new Firebase("https://bg-outfitters.firebaseio.com");
  var huntingRef = ref.child("huntingTypes");

  var distance = $('#how-it-works').offset().top,
    $window = $(window);

  $window.scroll(function() {
      if ( $window.scrollTop() == distance ) {
        // Your div has reached the top
        $('.previous-section-clicker').fadeIn();
        $('.next-section-clicker').fadeIn();
      } else if ($window.scrollTop() > 2250) {
        $('.previous-section-clicker').fadeOut();
        $('.next-section-clicker').fadeOut();
      } else if ($window.scrollTop() < 2250 && $window.scrollTop() > 1473) {
        $('.previous-section-clicker').fadeIn();
        $('.next-section-clicker').fadeIn();
      } else if ($window.scrollTop() < 1472) {
        $('.previous-section-clicker').fadeOut();
        $('.next-section-clicker').fadeOut();
      }
  });

  function howItWorksViewModel() {

    var self = this;

    self.howItWorksArray = ko.observableArray([
      {
        imgSrc: "/static/img/passenger-homescreen.png",
        title: "Open the app",
        text: "When you get into your car, open the Passenger app to begin monitoring your driving.",
        showArrow: true
      },
      {
        imgSrc: "/static/img/passenger-screen-locked.png",
        title: "Lock your phone",
        text: "Before your leave for your drive, lock your phone.",
        showArrow: true
      },
      {
        imgSrc: "/static/img/passenger-profile.png",
        title: "Earn points",
        text: "As you drive down the road you are going to earn points for every minute that you drive without using your phone.",
        showArrow: true
      },
      {
        imgSrc: "/static/img/passenger-rewards.png",
        title: "Get rewarded",
        text: "Use these points to get discounts at your favorite spots in your area!",
        showArrow: false
      }
    ]);

    self.currentIteration = 0;

    self.currentImage = ko.observable("");
    self.currentTitle = ko.observable("");
    self.currentText = ko.observable("");
    self.currentImage(self.howItWorksArray()[self.currentIteration].imgSrc);
    self.currentTitle(self.howItWorksArray()[self.currentIteration].title);
    self.currentText(self.howItWorksArray()[self.currentIteration].text);


    self.nextHowItem = function() {
      if (self.currentIteration < 3) {
        self.currentIteration++;
        self.currentImage(self.howItWorksArray()[self.currentIteration].imgSrc);
        self.currentTitle(self.howItWorksArray()[self.currentIteration].title);
        self.currentText(self.howItWorksArray()[self.currentIteration].text);
      }
    };

    self.prevHowItem = function() {
      if (self.currentIteration > 0) {
        self.currentIteration--;
        self.currentImage(self.howItWorksArray()[self.currentIteration].imgSrc);
        self.currentTitle(self.howItWorksArray()[self.currentIteration].title);
        self.currentText(self.howItWorksArray()[self.currentIteration].text);
      }
    };

  };


  var howItWorksObjectVm = new howItWorksViewModel();
  ko.applyBindings(howItWorksObjectVm,$("#how-it-works")[0]);


})(jQuery); // End of use strict
