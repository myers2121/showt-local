(function($) {

  function CreateCampaignViewModel() {

      var self = this;

      self.brandName = ko.observable('');
      self.campaignName = ko.observable('');
      self.influencerContent = ko.observable('');
      self.callToAction = ko.observable('');
      self.lowerAgeRange = ko.observable('');
      self.upperAgeRange = ko.observable('');
      self.locations = ko.observableArray([]);
      self.tagsList = ko.observableArray([]);
      self.currentTag = ko.observable('');
      self.locationsList = ko.observableArray([]);
      self.influencersOrderList = ko.observableArray([]);
      self.currentLocation = ko.observable('');
      self.currentHelpText = ko.observable('');
      self.campaignBudget = ko.observable('');
      self.totalPotentialReach = ko.observable(0);
      self.totalCost = ko.observable(0);

      self.campaignInfoNotValidated = ko.observable(false);
      self.postInformationNotValidated = ko.observable(true);

      const $createCampaignSection = $('#create-campaign-section');
      const $campaignHelpContainer = $('.create-campaign-help-container');

      self.sampleInfluencerList = ko.observableArray([
        {
          image: '/static/img/connor.jpg',
          name: 'Connor Myers',
          location: 'Clovis, Ca',
          instagramFollowers: '684',
          instagramFollowersText: '684',
          showtPrice: '17',
          showtPriceText: '$17',
          showtScore: '2.3',
          instagram: 'sdjnfsdigdhg'
        },
        {
          image: '/static/img/chris.jpg',
          name: 'Chris Garduno',
          location: 'Fresno, Ca',
          instagramFollowers: '95',
          instagramFollowersText: '95',
          showtPrice: '1.50',
          showtPriceText: '$1.50',
          showtScore: '1.1',
          instagram: 'sdjnfsdigdhg'
        },
        {
          image: '/static/img/megan.jpg',
          name: 'Megan Sullivan',
          location: 'Fresno, Ca',
          instagramFollowers: '30900',
          instagramFollowersText: '30.9K',
          showtPrice: '125',
          showtPriceText: '$125',
          showtScore: '8.4',
          instagram: 'sdjnfsdigdhg'
        },
        {
          image: '/static/img/jared.jpg',
          name: 'Jared Halphin',
          location: 'Fresno, Ca',
          instagramFollowers: '2900',
          instagramFollowersText: '2.9K',
          showtPrice: '25',
          showtPriceText: '$25',
          showtScore: '6.1',
          instagram: 'sdjnfsdigdhg'
        },
        {
          image: '/static/img/tim.jpg',
          name: 'Tim Farrow',
          location: 'Fresno, Ca',
          instagramFollowers: '395',
          instagramFollowersText: '395',
          showtPrice: '2.50',
          showtPriceText: '$2.50',
          showtScore: '2.3',
          instagram: 'sdjnfsdigdhg'
        }
      ]);

      self.interestArray = ko.observableArray([
        {
          backgroundImageHere: "url(/static/img/animals-interest.png)",
          interestType: "Animals",
          className: 'animals'
        },
        {
          backgroundImageHere: "url(/static/img/automotive-interest.png)",
          interestType: "Automotive",
          className: 'automotive'
        },
        {
          backgroundImageHere: "url(/static/img/beauty-interest.png)",
          interestType: "Beauty & Personal Care",
          className: 'beauty-personal-care'
        },
        {
          backgroundImageHere: "url(/static/img/family-interest.png)",
          interestType: "Children & Family",
          className: 'children-family'
        },
        {
          backgroundImageHere: "url(/static/img/books-interest.png)",
          interestType: "Education & Books",
          className: 'education-books'
        },
        {
          backgroundImageHere: "url(/static/img/events-interest.png)",
          interestType: "Entertainment & Events",
          className: 'entertainment-events'
        },
        {
          backgroundImageHere: "url(/static/img/fashion-interest.png)",
          interestType: "Fashion",
          className: 'fashion'
        },
        {
          backgroundImageHere: "url(/static/img/food-interest.png)",
          interestType: "Food & Drink",
          className: 'food-drink'
        },
        {
          backgroundImageHere: "url(/static/img/health-interest.png)",
          interestType: "Health, Fitness & Sport",
          className: 'health-fitness'
        },
        {
          backgroundImageHere: "url(/static/img/garden-interest.png)",
          interestType: "Home & Garden",
          className: 'home-garden'
        },
        {
          backgroundImageHere: "url(/static/img/art-interest.png)",
          interestType: "Photography, Art & Design",
          className: 'photo-art-design'
        },
        {
          backgroundImageHere: "url(/static/img/bars-interest.png)",
          interestType: "Restaurants, Bars & hotels",
          className: 'bars-hotels'
        },
        {
          backgroundImageHere: "url(/static/img/non-profit-interest.png)",
          interestType: "Social-Enterprise and Not-For-Profit",
          className: 'non-profit'
        },
        {
          backgroundImageHere: "url(/static/img/tech-interest.png)",
          interestType: "Social media, Web & Tech",
          className: 'social-media'
        },
        {
          backgroundImageHere: "url(/static/img/travel-interest.png)",
          interestType: "Travel & Destinations",
          className: 'travel-destinations'
        },
      ]);

      self.helpItem = ko.observableArray([
        "Enter a photo that helps represent your campaign the best. This could be the logo of your company or something else. This helps the influencer get a good feel for what the campaign will be like. The better your campaign photo the more influencers will apply.",
        "Enter the name of the brand or business that you are wanting to promote.",
        'Enter the name of the campaign that you are trying to run. For example, "Nutrishop Brand Awareness". The name of your campaign should represent the goal you have for the campaign.',
        "Describe what you are wanting from this campaign. What type of influencers, what kind of vibe does this campaign need, what is the goal for your company creating this campaign. Basically, explain what it is that you are trying to do and the people you want to do it with.",
        "This is a description of what exactly it is that you need from influencers. The more descriptive you are the better. This description will be shown to all of the influencers who are interested in your campaign.",
        "The call to action is what you want influencers to tell their followers to do. If you want people to come to your website then say that. If you want them to come in to your store then say this as well.",
        "Tags are things that you want the influencers to include in the post. Tags are usually hashtags, links to your own instagram account, and links to your website. Add them below by typing in the box and clicking the plus button.",
        "Influencers are going to be posting about your business. Give them a better understanding of the vibe that you have at your company by uploading a few images the represent waht your company is all about.",
        "In some campaigns there are going to be requirements other than simply posting a picture for the business. You may want them to make the posting in your store, deliver product to them, or simply have them post a stock promotion pic. Select the option that pertains to you below.",
        "Select the age range of the influencers that you are wanting to hire.",
        "What region(s) of the country are you looking to promote your brand in? These helps us find the best influencers in the area you are interested in.",
        "What gender are you wanting to promote your brand? You can pick one or both.",
        "Select from the region below the kind of influencers that you are looking to find. By choosing the interests below it will be much better when finding influencers to help your campaign.", "Help text 14"]);

      self.addTagToList = function() {
        if (self.currentTag().length > 2) {
          self.tagsList.push({
            tagName: self.currentTag()
          });
          console.log(self.tagsList());
          self.currentTag('');
        }
      };

      self.fillCheckBox = function(d,e) {
        var currentBox = e.currentTarget;
        $('.filled-check-box').removeClass('filled-check-box');
        $(currentBox).addClass('filled-check-box');
      };

      self.deleteTagFromTagList = function(index) {
        self.tagsList.remove(index);
        console.log(self.tagsList());
      };

      self.addLocationToList = function() {
        self.locationsList.push({
          locationName: self.currentLocation()
        });
        self.currentLocation('');
      };

      self.deleteLocationFromList = function(index) {
        self.locationsList.remove(index);
      };

      var currentCampaignCreationIteration = 0;

      self.showHelpPopUp = function helpIconHoevered(d,e) {
        const currentHelpIcon = e.currentTarget;
        console.log(currentHelpIcon);
        const id = $(currentHelpIcon).attr('id');
        var lastChar = id.substr(id.length - 2);
        lastChar = lastChar.replace('-', '');
        var helpValueNumber = parseInt(lastChar) - 1;
        self.currentHelpText(self.helpItem()[helpValueNumber]);
        //console.log(self.currentHelpText());
        //console.log($(currentHelpIcon).offset().top);
        const topLocation = $(currentHelpIcon).offset().top - $campaignHelpContainer.height() - 40;
        const leftLocation = $(currentHelpIcon).offset().left - ($campaignHelpContainer.width() / 2) - 2;

        $campaignHelpContainer.css({
            left: leftLocation,
            top: topLocation
        });

        $campaignHelpContainer.fadeIn();

      };

      self.hideHelpPopUp = function helpIconMouseLeft() {
        $campaignHelpContainer.fadeOut();
      };

      self.nextButtonClicked = function() {

        // if (currentCampaignCreationIteration == 0) {
        //   var campaignDescription = $('.content-editable').text();
          // if (self.brandName().length > 5 && self.campaignName().length > 5 && campaignDescription.length > 10) {
          //   self.campaignInfoNotValidated(false);
          //   $('.active-create-campaign-container').fadeOut(function() {
          //     const $nextCampaignCreateItem = $('.active-create-campaign-container').next()
          //     $nextCampaignCreateItem.fadeIn();
          //     $('.active-create-campaign-container').removeClass('active-create-campaign-container');
          //     $nextCampaignCreateItem.addClass('active-create-campaign-container');
          //     console.log('here');
          //     $('#create-campaign-section').animate({
          //         scrollTop: $('#create-campaign-section').offset().top
          //     }, 'fast');
          //   });
          //   currentCampaignCreationIteration = currentCampaignCreationIteration + 1;
          // } else {
          //   self.campaignInfoNotValidated(true);
          // }

        // } else if (currentCampaignCreationIteration == 1) {
        //   $('.active-create-campaign-container').fadeOut(function() {
        //     const $nextCampaignCreateItem = $('.active-create-campaign-container').next()
        //     $nextCampaignCreateItem.fadeIn();
        //     $('.active-create-campaign-container').removeClass('active-create-campaign-container');
        //     $nextCampaignCreateItem.addClass('active-create-campaign-container');
        //     console.log('here');
        //     $('#create-campaign-section').animate({
        //         scrollTop: $('#create-campaign-section').offset().top
        //     }, 'fast');
        //   });
        //   currentCampaignCreationIteration = currentCampaignCreationIteration + 1;
        // } else if (currentCampaignCreationIteration == 2) {
        //   $('.active-create-campaign-container').fadeOut(function() {
        //     const $nextCampaignCreateItem = $('.active-create-campaign-container').next()
        //     $nextCampaignCreateItem.fadeIn();
        //     $('.active-create-campaign-container').removeClass('active-create-campaign-container');
        //     $nextCampaignCreateItem.addClass('active-create-campaign-container');
        //     console.log('here');
        //     $('#create-campaign-section').animate({
        //         scrollTop: $('.create-campaign-information-container').offset().top
        //     }, 'fast');
        //   });
        //   currentCampaignCreationIteration = currentCampaignCreationIteration + 1;
        // } else {
        //   currentCampaignCreationIteration = currentCampaignCreationIteration + 1;
        // }

        $('.active-create-campaign-container').fadeOut(function() {
          const $nextCampaignCreateItem = $('.active-create-campaign-container').next()
          $nextCampaignCreateItem.fadeIn();
          $('.active-create-campaign-container').removeClass('active-create-campaign-container');
          $nextCampaignCreateItem.addClass('active-create-campaign-container');
          console.log('here');
          $('#create-campaign-section').animate({
              scrollTop: $('#create-campaign-section').offset().top
          }, 'fast');
        });
        currentCampaignCreationIteration = currentCampaignCreationIteration + 1;

      };

      self.backButtonClicked = function() {
        $('.active-create-campaign-container').fadeOut(function() {
          const $prevCampaignCreateItem = $('.active-create-campaign-container').prev()
          $prevCampaignCreateItem.fadeIn();
          $('.active-create-campaign-container').removeClass('active-create-campaign-container');
          $prevCampaignCreateItem.addClass('active-create-campaign-container');
          $('#create-campaign-section').animate({
              scrollTop: $('.create-campaign-information-container').offset().top
          }, 'fast');
        });
        currentCampaignCreationIteration = currentCampaignCreationIteration - 1;
      };

      self.showInfluencerInformation = function influecnerFoundContainerClicked(influencerClicked) {
        $('.view-influencer-container').fadeIn();
        $('body').css('overflow','hidden');
      };

      self.closeInfluencerPopUp = function influencerPopUpExitClicked() {
        $('.view-influencer-container').fadeOut();
        $('body').css('overflow','auto');
      };

      self.hireMeAndFadeOutPopUp = function hireMePopUpButtonClicked() {
        $('.view-influencer-container').fadeOut();
        $('body').css('overflow','auto');
      };

      // Function for selecting influencers in the campaign creation process

      self.addInfluencerToOrderList = function influencerClicked(d,e) {
        self.totalPotentialReach(self.totalPotentialReach().toString().replace(/,/g, ""));
        if (self.influencersOrderList.indexOf(d) > -1) {
          self.influencersOrderList.remove(d);
          self.totalPotentialReach(parseInt(self.totalPotentialReach()) - parseInt(d.instagramFollowers));
          self.totalCost(self.totalCost() - parseInt(d.showtPrice));
        } else {
          self.influencersOrderList.push(d);
          self.totalPotentialReach(parseInt(self.totalPotentialReach()) + parseInt(d.instagramFollowers));
          self.totalCost(self.totalCost() + parseInt(d.showtPrice));
        }
        self.totalPotentialReach(self.addCommasInNumber(self.totalPotentialReach().toString()));
        $(e.currentTarget).toggleClass('influencer-added');
      };

      self.addCommasInNumber = function addCommasInNumber(currentNumber) {
        return currentNumber.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      };

      self.placeOrderButtonClicked = function() {
        $('#create-campaign-section').animate({
            scrollTop: $('#create-campaign-section').offset().top
        }, 'fast', function() {
          $createCampaignSection.fadeOut(function() {
            $('body').css('overflow','scroll');
            const $currentActiveCreateContainer = $('.active-create-campaign-container');
            $currentActiveCreateContainer.css('display','none');
            const $FirstCreateContainer = $currentActiveCreateContainer.prev().prev().prev();
            $currentActiveCreateContainer.removeClass("active-create-campaign-container");
            $FirstCreateContainer.addClass('active-create-campaign-container');
          });
        });
      };

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

  $('body').on('click', '#create-campaign-section',function(e) {
    if (e.target == this) {
      $('#create-campaign-section').fadeOut();
      $('body').css('overflow','auto');
    }
  });

  $('body').on('click', '.view-influencer-container',function(e) {
    if (e.target == this) {
      $('.view-influencer-container').fadeOut();
      $('body').css('overflow','auto');
    }
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

  var width = $postInformationPicContainer.width();
  $postInformationPicContainer.css({'height':width+'px'});


  var createCampaignObjectVm = new CreateCampaignViewModel();
  ko.cleanNode($('#create-campaign-section')[0]);
  ko.applyBindings(createCampaignObjectVm,$("#create-campaign-section")[0]);

})(jQuery); // End of use strict
