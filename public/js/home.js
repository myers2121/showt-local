(function($) {

  function HomeViewModel() {

      var self = this;

      const $howItWorksButton = $('.how-it-works-link');
      const $signUpButton = $('.sign-up-link');
      const $logInButton = $('.log-in-link');
      const $growBusinessButton = $('.grow-your-business-button');
      const $howItWorksSection = $('#how-it-works-section');
      const $howItWorksContainer = $('.how-it-works-container');
      const $exitHowItWorksContainer = $('.exit-how-it-works-container');
      const $signUpBusinessSection = $('#sign-up-business-section');
      const $signUpBusinessContainer = $('.sign-up-business-container');
      const $exitSignUpBusinessContainer = $('.exit-sign-up-business-container');
      const $logInBusinessSection = $('#log-in-business-section');
      const $logInBusinessContainer = $('.log-in-business-container');
      const $exitLogInBusinessContainer = $('.exit-log-in-business-container');
      const $forgotPasswordBusinessSection = $('#forgot-password-business-section');
      const $forgotPasswordBusinessContainer = $('.forgot-password-business-container');
      const $exitforgotPasswordBusinessContainer = $('.exit-forgot-password-business-container');

      $howItWorksButton.click(function() {
        // Slide down the how it works section
        $howItWorksSection.css('display','block');
        $howItWorksContainer.slideDown();
      });

      $exitHowItWorksContainer.click(function() {
        $howItWorksContainer.slideUp(function() {
          $howItWorksSection.css('display','none');
        });
      });

      $signUpButton.click(function() {
        // Show the sign up section
        $signUpBusinessSection.css('display','block');
        $signUpBusinessContainer.slideDown();
      });

      $exitSignUpBusinessContainer.click(function() {
        $signUpBusinessContainer.slideUp(function() {
          $signUpBusinessSection.css('display','none');
        });
      });

      $logInButton.click(function() {
        $logInBusinessSection.css('display','block');
        $logInBusinessContainer.slideDown();
      });

      $exitLogInBusinessContainer.click(function() {
        $logInBusinessContainer.slideUp(function() {
          $logInBusinessSection.css('display','none');
        });
      });

      $growBusinessButton.click(function() {
        // Send them to the business link
        location.href = '/business';
      });

  };


  var homeObjectVm = new HomeViewModel();
  ko.applyBindings(homeObjectVm,$("#home")[0]);

})(jQuery); // End of use strict
