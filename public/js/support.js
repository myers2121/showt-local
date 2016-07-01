(function($) {
  var questionListName = location.href.split("/").pop() + "-questions";

  var ajaxOptions = {
    dataType: "json",
    url: "/static/js/json/" + questionListName + ".json",
    success: function(d) { return d },
    async: false
  }

  var questions = $.ajax(ajaxOptions).responseJSON;

  function SupportViewModel() {

    var self = this;

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
        "myClass": "account-info"
      },
      {
        "title": "Contact Support",
        "text": "Didn't find what you were looking for in the sections above? No worries. Just send us an email here and we will get everything sorted out for you.",
        "img" : "/static/img/contact-support-icon.png",
        "myClass": "contact-support"
      }
		];

    self.helpSectionClicked = function(d,e) {
      var page = $(e.currentTarget).attr("class").split(" ")[1];

      location.href = "/support/" + page;
    }

  };

  function questionsViewModel() {

    var self = this;

    self.askQuestion = function( d, e ) {
      self.currentQuestion(d.question);
      self.currentAnswer(d.answer);
    }

    self.currentQuestion = ko.observable('');
    self.currentAnswer = ko.observable('')

    self.questions = questions;

    console.log("hi");
  }

  function SupportFooterViewModel() {
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

    var date = new Date();
    var year = date.getFullYear();

    self.currentDate = ko.observable("");
    self.currentDate(year);

  }

  var supportObjectVm = new SupportViewModel();
  var supportFooterVm = new SupportFooterViewModel();
  var supportQandAVm  = new questionsViewModel();

  ko.applyBindings(supportObjectVm,$("#support-home")[0]);
  ko.applyBindings(supportQandAVm ,$("#question-answer-container")[0]);
  ko.applyBindings(supportFooterVm,$("#support-footer")[0]);

  var exitMenu = function() {
    $('#support-nav').animate({'left':'-100vw'},250, function() {
      $('.exit-mobile-nav-support').css('display','none');
      $('.navbar-header').css('display','block');
      $('#page-top').css('overflow','auto');
      $('#mainNav').children(".container-fluid").css('height','70px');
    });

    //will cast false value to var menuOpen;
    return false;
  }

  var openMenu = function() {
    $('#support-nav').css('display','block');
    $('#support-nav').animate({'left':'0px'},250, function() {
      $('.exit-mobile-nav-support').css('display','block');
    });

    //will cast true value to var menuOpen;
    return true;
  }

  $(".question-container").on("click", function() {
    $(".question-container.active").removeClass("active");
    $(this).addClass("active");
  })

  var menuOpen = false;

  $('.navbar-toggle').click(function() {

    menuOpen = openMenu();
  });
  
  //exits menu on click outside of pmenu
  $(document).mouseup(function (e) {
    if(menuOpen) { // make sure menu is open.
      var menu = $("#support-nav");
      if (!menu.is(e.target) // if the target of the click isn't the menu...
        && menu.has(e.target).length === 0) // ... nor a descendant of the menu
      {
        menuOpen = exitMenu();
      }
    }
  });

  $('.exit-mobile-nav-support').click(function() {
    menuOpen = exitMenu();
  });

})(jQuery); // End of use strict
