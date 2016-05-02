
(function($) {

    var timesHeaderWasClicked = 0;

    $('.back-button').click(function() {
      location.href = '/';
    });

    $('.hunting-type-container img').click(function() {
      $('.hunt-explained-dialog').fadeIn();
    });

    $('.ok-button-dialog').click(function() {
      $('.hunt-explained-dialog').fadeOut();
    });

    $('.register-button-dialog').click(function() {
      location.href = '/register';
    });

    $('.learn-more-arrow').click(function() {
    });

    $('.header-content-inner img').click(function() {
      timesHeaderWasClicked++;
      if (timesHeaderWasClicked == 5) {
        location.href = '/login';
      }
    });

    $('.facebook').click(function() {
      location.href = 'http://www.facebook.com';
    });

    $('.instagram').click(function() {
      location.href = 'https://www.instagram.com/bgoutfitters/';
    });

    $('.twitter').click(function() {
      location.href = 'https://twitter.com/bg_outfitters';
    });

})(jQuery); // End of use strict
