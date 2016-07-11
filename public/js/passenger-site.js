/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    $('.exit-mobile-nav').click(function() {
      // $(".navbar-toggle").trigger( "click" );
      $('.navbar-collapse').css('display','none');
       $('.navbar-header').css('display', 'block');
       $('.container-fluid').css('height','50px');
       $('.container-fluid').css('background','none');
       $('.exit-mobile-nav').css('display','none');
       $('body').css('overflow','auto');
    });

    $('.navbar-toggle-1').click(function() {
      $('.navbar-collapse').css('display','block');
      $('.navbar-header').css('display', 'none');
     $('.container-fluid').css('height','100vh');
     $('.container-fluid').css('background','#fff');
     $('.exit-mobile-nav').css('display','block');
     $('body').css('overflow','hidden');
      // $('.navbar-collapse').css('display','block');
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    $('.email-contact').click(function() {
        Avgrund.show("#contact-popup");
    });

  function apply( func, element ) {
    if ( element.length ) {
      ko.applyBindings( func, element[0] );
    }
  }

  function socialMediaViewModel() {
    var self = this;

    self.socialMedias = [
      {
        'socialMedia': 'facebook',
        'link'       : 'https://www.facebook.com/Passenger-Mobile-867565216683366/',
        'src'        : '/static/img/facebook.png'
      },
      {
        'socialMedia': 'instagram',
        'link'       : 'https://www.instagram.com/passengermobile/',
        'src'        : '/static/img/instagram.png'
      },
      {
        'socialMedia':'youtube',
        'link'       : 'http://www.youtube.com',
        'src'        : '/static/img/youtube.png'
      },
      {
        'socialMedia': 'twitter',
        'link'       : 'https://twitter.com/passengermobile',
        'src'        : '/static/img/twitter.png'
      },
      {
        'socialMedia': 'snapchat',
        'link'       : 'https://www.snapchat.com/add/passengermobile',
        'src'        : '/static/img/snapchat.png'
      }
    ];

    self.socialMediaClick = function( d ) {
      location.href = d.link;
    }

  }

  var socialMediaVM = new socialMediaViewModel();
  apply(socialMediaVM, $(".social-icons-container"));

  $(".back-to-top-container").on("click", function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  })

})(jQuery); // End of use strict
