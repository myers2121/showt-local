(function($) {

  function MerchantsViewModel() {

    var self = this;
    var date = new Date();
    var year = date.getFullYear();

    self.currentDate = ko.observable("");
    self.currentDate(year);

  };

  var merchantsObjectVm = new MerchantsViewModel();
  // ko.cleanNode($("#start-up-section")[0]);
  // ko.applyBindings(merchantsObjectVm,$("#start-up-section")[0]);

  $('.get-started-button-nav').click(function() {
    window.location.href = '/merchants/signup';
  });

  $('.get-started-button-merchant-1').click(function() {
    window.location.href = '/merchants/signup';
  });

  $('.home-nav-link').click(function() {
    location.href = '/';
  });

  $('.what-is-it-nav-link').click(function() {
    var offset = -30; //Offset of 20px
    $('html, body').animate({
        scrollTop: $("#merchant-2").offset().top + offset
    }, 500);

  });

  $('.what-is-it-nav-link-mobile').click(function() {
    var offset = -130; //Offset of 20px
    $('html, body').animate({
        scrollTop: $("#merchant-2").offset().top + offset
    }, 500);

  });

  $('.benefits-link-mobile').click(function() {
    var offset = 0; //Offset of 20px
    $('html, body').animate({
        scrollTop: $("#merchant-3").offset().top + offset
    }, 500);
  });

  $('.benefits-link').click(function() {
    var offset = -30; //Offset of 20px
    $('html, body').animate({
        scrollTop: $("#merchant-3").offset().top + offset
    }, 500);
  });

  $('.sign-up-today-button').click(function() {
    location.href = '/merchants/signup';
  });

  $('.contact-sales').click(function() {
    location.href = '/support/contact-support';
  });

  var mobileNavIndex = 0;

  $('.mobile-menu-item').click(function() {
    if (mobileNavIndex % 2 == 0) {
      $('.merchant-slide-down-container').slideDown();
      mobileNavIndex = mobileNavIndex + 1;
    } else {
      $('.merchant-slide-down-container').slideUp();
      mobileNavIndex = mobileNavIndex + 1;
    }

  });

  $('	.get-started-button-merchant').click(function() {
    location.href = ''
  });

})(jQuery); // End of use strict
