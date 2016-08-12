$(document).ready(function(){
  // initialize page
  $('.home-link').click(function() {
    $('.dashboard-link').removeClass('active');
    $('.home-link').addClass('active');
    $("html, body").animate(
      {
        scrollTop: $('#home-section').offset().top - 70
      }, 1000);
  });

  $('.rewards-link').click(function() {
    $('.dashboard-link').removeClass('active');
    $('.rewards-link').addClass('active');
    $("html, body").animate(
      {
        scrollTop: $('#rewards-section').offset().top - 70
      }, 1000);
  });

  $('.pay-link').click(function() {
    $('.dashboard-link').removeClass('active');
    $('.pay-link').addClass('active');
    $("html, body").animate(
      {
        scrollTop: $('#pay-section').offset().top - 70
      }, 1000);
  });


  $('.support-link').click(function() {
    $('.dashboard-link').removeClass('active');
    $('.support-link').addClass('active');
    $("html, body").animate(
      {
        scrollTop: $('#support-section').offset().top - 70
      }, 1000);
  });


})
