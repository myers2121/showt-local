(function($) {

  $('.navbar-toggle').click(function() {
    $('#support-nav').css('display','block');
    $('#support-nav').animate({'left':'0px'},250, function() {
      $('.exit-mobile-nav-support').css('display','block');
    });
  });

  $('.exit-mobile-nav-support').click(function() {
    $('.exit-mobile-nav-support').css('display','none');
    $('#support-nav').animate({'left':'-100vw'},250, function() {
      $('.navbar-header').css('display','block');
      $('#page-top').css('overflow','scroll');
      $('#mainNav .container-fluid').css('height','70px');
    });
  });

  $(".support-nav-top").click(function() {
    location.href = '/support';
  });

  $('.using-passenger-nav').click(function() {
    location.href = '/support/using-passenger';
  });

  $('.account-info-nav').click(function() {
    location.href = '/support/account-info';
  });

  $('.contact-support-nav').click(function() {
    location.href = '/support/contact-support';
  });

})(jQuery); // End of use strict
