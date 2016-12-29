(function($) {

  function HomeViewModel() {

      var self = this;

      const $businessLoginButton = $('.grow-your-business-button');
      const $influencerButton = $('.influencer-button');
      const $businessButton = $('.business-button');

      $influencerButton.click(function() {
        $('#influencer-sign-up-section').fadeIn();
        $('body').css('overflow-y','hidden');
      });

      $businessButton.click(function() {
        location.href = '/business';
      });

      self.influencerEmail = ko.observable("");
      self.emailNotValidated = ko.observable(false);

      $businessLoginButton.click(function() {
        // Send them to the business link
        location.href = '/business/login';
      });

  };


  var homeObjectVm = new HomeViewModel();
  ko.applyBindings(homeObjectVm,$("#home")[0]);

})(jQuery); // End of use strict
