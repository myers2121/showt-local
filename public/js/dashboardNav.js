$(document).ready(function(){

  $(window).scroll(function() {
    var scrollPos = $(document).scrollTop();
    $('.dashboard-link').each(function() {
      var currLink = $(this);
      var linkedSection = $( "#" + $(this).attr("for") );
      if (linkedSection.position().top - 106.25 <= scrollPos && linkedSection.position().top + linkedSection.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
  })

  // initialize page
  $('.home-link').click(function() {
    $("html, body").animate(
      {
        scrollTop: $('#home-section').offset().top - 70
      }, 1000, function() {
        $('.dashboard-link').removeClass('active');
        $('.home-link').addClass('active');
      });
  });

  $('.rewards-link').click(function() {
    $("html, body").animate(
      {
        scrollTop: $('#rewards-section').offset().top - 70
      }, 1000, function() {
        $('.dashboard-link').removeClass('active');
        $('.rewards-link').addClass('active');
      });
  });

  $('.pay-link').click(function() {
    $("html, body").animate(
      {
        scrollTop: $('#pay-section').offset().top - 70
      }, 1000, function() {
        $('.dashboard-link').removeClass('active');
        $('.pay-link').addClass('active');
      });
  });


  $('.support-link').click(function() {
    $("html, body").animate(
      {
        scrollTop: $('#support-section').offset().top - 70
      }, 1000, function() {
        $('.dashboard-link').removeClass('active');
        $('.support-link').addClass('active');
      });
  });


})
