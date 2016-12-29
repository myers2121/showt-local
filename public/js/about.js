(function($) {

  const $hoverContainer = $('.picture-container');
  const $showtLogo = $('.showt-logo-about');

  $hoverContainer.mouseenter( function() {
    $(this).next().fadeIn();
  }).mouseleave( function() {
    $(this).next().fadeOut();
  });

  $showtLogo.click(function() {
    location.href = '/';
  });

})(jQuery); // End of use strict
