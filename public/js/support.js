(function($) {

  function SupportViewModel() {

    var self = this;

    self.currentDate = ko.observable("");

    self.supportTopics = [
			{
				"title": "Using Passenger",
				"text": "Get help on how to use the app and get your discounts",
				"img" : "/static/img/passenger-logo.png",
        "myClass": "using-passenger"
			},
      {
        "title": "Account",
        "text": "Have questions about your account? This is the place to get them answered.",
        "img" : "/static/img/account-icon.png",
        "myClass": "account-help"
      },
      {
        "title": "Contact Support",
        "text": "Didn't find what you were looking for in the sections above? No worries. Just send us an email here and we will get everything sorted out for you.",
        "img" : "/static/img/contact-support-icon.png",
        "myClass": "contact-support"
      }
		];

    self.helpSectionClicked = function(d,e) {
      var classSelected = $(e.currentTarget).attr("class").split(" ")[1];

      if (classSelected == 'using-passenger') {
        location.href = '/support/using-passenger';
      } else if (classSelected == 'account-help') {
        location.href = '/support/account-help';
      } else {
        location.href = '/support/contact-support';
      }
    };

    self.facebookClick = function() {
      location.href = 'https://www.facebook.com/Passenger-Mobile-867565216683366/';
    };

    self.instagramClick = function() {
      location.href = 'https://www.instagram.com/passengermobile/';
    };

    self.youtubeClick = function() {
      location.href = 'http://www.youtube.com';
    };

    self.twitterClick = function() {
      location.href = 'https://twitter.com/passengermobile';
    };

    self.snapchatClick = function() {
      location.href = 'https://www.snapchat.com/add/passengermobile';
    };

    var date = new Date();
    var year = date.getFullYear();

    self.currentDate(year);

  };

  var supportObjectVm = new SupportViewModel();
  ko.applyBindings(supportObjectVm,$("#support-home")[0]);
  ko.applyBindings(supportObjectVm,$("#support-footer")[0]);

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


})(jQuery); // End of use strict
