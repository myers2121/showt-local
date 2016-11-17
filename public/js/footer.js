(function($) {

  function footerViewModel() {

      var self = this;

      self.currentDate = ko.observable("");

      self.facebookClick = function() {
        location.href = 'https://www.facebook.com/Passenger-Mobile-867565216683366/';
      };

      self.instagramClick = function() {
        location.href = 'https://www.instagram.com/passengermobile/';
      };

      self.youtubeClick = function() {
        location.href = 'https://www.youtube.com/channel/UCeF6PanOUEmKjTaFqnGeLow';
      };

      self.twitterClick = function() {
        location.href = 'https://twitter.com/passengermobile';
      };

      self.snapchatClick = function() {
        location.href = 'https://www.snapchat.com/add/passengermobile';
      };

      self.backToTopFooter = function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow', function () {

        });
      };

      var date = new Date();
      var year = date.getFullYear();

      self.currentDate(year);

  };


  var footerObjectVm = new footerViewModel();
  ko.applyBindings(footerObjectVm,$("#footer")[0]);

  $('.ios-app-store-button').click(function() {
    location.href = 'https://itunes.apple.com/us/app/passenger-mobile/id1154585703?ls=1&mt=8';
  });

})(jQuery); // End of use strict
