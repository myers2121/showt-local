(function($) {

  function GetStartedViewModel() {

      var self = this;

      const $signUpTopSectionButton = $('.start-growing-button');
      const $signUpBottomSectionButton = $('.sign-up-button-get-started');

      $signUpTopSectionButton.click(function() {
        slideDownSignUp();
      });

      $signUpBottomSectionButton.click(function() {
        slideDownSignUp();
      });
  };


  var getStartedObjectVm = new GetStartedViewModel();
  ko.applyBindings(getStartedObjectVm,$("#get-started-section")[0]);

})(jQuery); // End of use strict
