(function($) {

  function LogInViewModel() {

      var self = this;

      const $signUpTodayButton = $('.sign-up-today-button');
      const $signUpBusinessSection = $('#sign-up-business-section');
      const $signUpBusinessContainer = $('.sign-up-business-container');
      const $logInBusinessSection = $('#log-in-business-section');
      const $logInBusinessContainer = $('.log-in-business-container');

      $signUpTodayButton.click(function() {
        $logInBusinessContainer.slideUp(function() {
          $logInBusinessSection.css('display','none');
          $signUpBusinessSection.css('display','block');
          $signUpBusinessContainer.slideDown();
        });
      });

  };


  var logInObjectVm = new LogInViewModel();
  ko.applyBindings(logInObjectVm,$("#log-in-business-section")[0]);

})(jQuery); // End of use strict
