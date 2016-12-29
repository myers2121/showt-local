(function($) {

  function CreateCampaignViewModel() {

      var self = this;

      self.interestArray = ko.observableArray([
        {
          backgroundImageHere: "url(/static/img/about-background.jpg)",
          interestType: "Weightlifting",
          className: 'weightlifting'
        },
        {
          backgroundImageHere: "url(/static/img/business-background.jpg)",
          interestType: "Skateboarding",
          className: 'skateboarding'
        },
        {
          backgroundImageHere: "url(/static/img/about-background.jpg)",
          interestType: "Crossfit",
          className: 'crossfit'
        },
        {
          backgroundImageHere: "url(/static/img/about-background.jpg)",
          interestType: "Lazy fuck",
          className: 'lazy-fuck'
        },
        {
          backgroundImageHere: "url(/static/img/about-background.jpg)",
          interestType: "Women's fashion",
          className: 'womens-fashion'
        }
      ]);

  };

  const $postInformationPicContainer = $('.pic-container');
  const $interestInPicture = $('.influencer-interest-picture-container img');
  const $interestTypeInfoContainer = $('.interest-type-info-container');
  const $genderButton = $('.gender-button');

  $('body').on('click', '.gender-button',function() {
    console.log('This');
    $(this).toggleClass('next-button-tapped');
  });

  $interestTypeInfoContainer.click(function() {
    console.log('Hello');
  });

  $('body').on('click', '.interest-type-info-container',function() {
    var currentItem = $(this).children()[3];
    $(currentItem).toggleClass('active-interest');
  });

  $('body').on('mouseenter', '.interest-type-info-container',function() {
    var currentItem = $(this).children()[2];
    $(currentItem).css('display','block');
  });

  $('body').on('mouseleave', '.interest-type-info-container',function() {
    var currentItem = $(this).children()[2];
    $(currentItem).css('display','none');
  });
  // .mouseleave(function() {
  //   console.log('Hello');
  // });

  var width = $postInformationPicContainer.width();
  $postInformationPicContainer.css({'height':width+'px'});


  var createCampaignObjectVm = new CreateCampaignViewModel();
  var element = $('#create-campaign-home-section');
  ko.cleanNode(element[0]);
  ko.applyBindings(createCampaignObjectVm,$("#create-campaign-home-section")[0]);

})(jQuery); // End of use strict
