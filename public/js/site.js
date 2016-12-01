
(function($) {

    var timesHeaderWasClicked = 0;

    $('.apple-store-button-container').click(function() {
      location.href = 'https://itunes.apple.com/us/app/passenger-mobile/id1154585703?ls=1&mt=8';
    });

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

    $('.business-owner-button').click(function() {
      location.href = '/merchants';
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

    $('.what-is-it-nav-link').click(function() {
      $('.merchant-slide-down-container').slideUp();
      $('html, body').animate({
          scrollTop: $("#how-it-works").offset().top
      }, 500);

    });

    $('.our-mission-nav-link').click(function() {
      $('.merchant-slide-down-container').slideUp();
      var offset = -130; //Offset of 20px
      $('html, body').animate({
          scrollTop: $("#our-mission").offset().top
      }, 500);

    });

    $('.locations-nav-link').click(function() {
      var offset = 0; //Offset of 20px
      $('.merchant-slide-down-container').slideUp();
      $('html, body').animate({
          scrollTop: $("#locations").offset().top
      }, 500);
    });

    $('.merchants-nav-link').click(function() {
      location.href = '/merchants';
    });

    $('.contact-nav-link').click(function() {
      $('.merchant-slide-down-container').slideUp();
      var offset = -30; //Offset of 20px
      $('html, body').animate({
          scrollTop: $("#contact").offset().top
      }, 500);
    });

    $('.help-nav-link').click(function() {
      $('.merchant-slide-down-container').slideUp();
      var offset = -30; //Offset of 20px
      $('html, body').animate({
          scrollTop: $("#help").offset().top
      }, 500);
    });

})(jQuery); // End of use strict
