(function($) {

  function influencerPrivateProfileViewModel() {

      var self = this;

      self.influencerEmail         = ko.observable('connor.myers21@gmail.com');
      self.influencerFirstName     = ko.observable('Connor');
      self.influencerLastName      = ko.observable('Myers');
      self.influencerPassword      = ko.observable('');
      self.influencerPhoneNumber   = ko.observable('(559) 940-9699');
      self.influencerDescription   = ko.observable('');
      self.influencerBirthMonth    = ko.observable('March');
      self.influencerBirthDay      = ko.observable('14');
      self.influencerBirthYear     = ko.observable('1995');
      self.influencerInstagramName = ko.observable('connormyers21');
      self.influencerTagList       = ko.observableArray([
        'Skateboarding','Education & Books','Volleyball','Basketball','Entrepreneurship','Inspiration'
      ]);
      self.influencerInterestList  = ko.observableArray(["Food & Drink","Animals","Education & Books","Fashion"]);
      self.influencerGender        = ko.observable('Male');
      self.currentTag              = ko.observable('');
      self.influencerProfileNotFinished = ko.observable(true);
      self.profileImage = ko.observable('/static/img/profile-add-camera.png');

      self.currentOpenBrandName = ko.observable('');
      self.currentOpenBrandImage = ko.observable('');
      self.currentOpenCampaignName = ko.observable('');
      self.currentOpenCampaignPrice = ko.observable('');
      self.currentOpenCampaignDescription = ko.observable('');
      self.currentOpenPostingType = ko.observable('');
      self.currentOpenConentFromInfluencer = ko.observable('');
      self.currentOpenCallToAction = ko.observable('');
      self.currentOpenPlatform = ko.observable('');
      self.currentOpenTags = ko.observableArray([]);
      self.currentOpenVibePics = ko.observableArray([]);

      const $activeProfileButton = $('.active-profile-link');
      const $inactiveProfileButton = $('.inactive-profile-link');
      const $aboutInformationContainer = $('.influencer-about-information-container');
      const $workInformationContainer = $('.influencer-work-information-container');
      const $influencerSignUpSection = $('#influencer-edit-profile-section');
      const $influencerAccountInformationContainer = $('.influencer-account-form-container');
      const $influencerFurtherInformationContainer = $('.influencer-information-sign-up-form-container');
      const $influencerInformationSavedContainer = $('.influencer-finish-sign-up-form-container');
      const $maleButton = $('.male-button');
      const $femalButton = $('.female-button');
      const $profileImageFileInput = $('.profile-image-file-input');
      const $currentOrderContainer = $('.influencer-profile-orders-container');

      self.interests = ko.observableArray([
        {
          interestTitle: "Animals",
          interestImage: "url(/static/img/animals-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Automotive",
          interestImage: "url(/static/img/automotive-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Beauty & Personal Care",
          interestImage: "url(/static/img/beauty-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Children & Family",
          interestImage: "url(/static/img/family-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Education & Books",
          interestImage: "url(/static/img/books-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Entertainment & Events",
          interestImage: "url(/static/img/events-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Fashion",
          interestImage: "url(/static/img/fashion-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Food & Drink",
          interestImage: "url(/static/img/food-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Health, Fitness & Sport",
          interestImage: "url(/static/img/health-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Home & Garden",
          interestImage: "url(/static/img/garden-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Photography, Art & Design",
          interestImage: "url(/static/img/art-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Restaurants, Bars & hotels",
          interestImage: "url(/static/img/bars-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Social-Enterprise and Not-For-Profit",
          interestImage: "url(/static/img/non-profit-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Social media, Web & Tech",
          interestImage: "url(/static/img/tech-interest.png)",
          classInterestName: ""
        },
        {
          interestTitle: "Travel & Destinations",
          interestImage: "url(/static/img/travel-interest.png)",
          classInterestName: ""
        }
      ]);

      self.newJobs       = ko.observableArray(
        [
          {
            array: [
              {
                brandName: "Nutrishop",
                brandLogo: '/static/img/fresno.png',
                orderTitle: "Nutrishop Protein Powder Push",
                orderPrice: "$175",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here.",
                postingType: 'In-store picture',
                contentInfo: 'We are looking for girls around Fresno, Ca to come in to the Nutrishop at Campus Pointe to take a picture with some of our products and to post these products on their instagram. The entire process should only take 15 minutes.',
                callToAction: 'Come in to Nutrishop at Campus Pointe to get the best deals on all of your workout supplements.',
                tags: ["@nutrishop","#nutrishop",'#isItLegDayYet'],
                platform: [""],
                vibePictures: ["/static/img/bars-interest.png",'/static/img/books-interest.png','/static/img/animals-interest.png','/static/img/art-interest.png']
              },
              {
                orderTitle: "Nutrishop Brand Recognition",
                orderPrice: "$210",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              }
            ]
          },
          {
            array: [
              {
                orderTitle: "Beach Hut Deli Store",
                orderPrice: "$194",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              },
              {
                orderTitle: "Mad Duck Beerfest",
                orderPrice: "$170",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              }
            ]
          }
        ]
      );

      self.currentJobs       = ko.observableArray(
        [
          {
            array: [
              {
                orderTitle: "Nutrishop Protein Powder Push",
                orderPrice: "$175",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              },
              {
                orderTitle: "Nutrishop Brand Recognition",
                orderPrice: "$210",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              }
            ]
          },
          {
            array: [
              {
                orderTitle: "Beach Hut Deli Store",
                orderPrice: "$194",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              }
            ]
          }
        ]
      );

      self.previousJobs       = ko.observableArray(
        [
          {
            array: [
              {
                orderTitle: "Nutrishop Protein Powder Push",
                orderPrice: "$175",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              },
              {
                orderTitle: "Nutrishop Brand Recognition",
                orderPrice: "$210",
                orderDescription: "Take a picture in the Nutrishop store at Campus Pointe by Fresno State to help promote the protein that we make and sell here."
              }
            ]
          }
        ]
      );

      for (var i = 0; i < self.interests().length; i++) {
        if (self.influencerInterestList().indexOf(self.interests()[i].interestTitle) > -1) {
          const indexToChange = self.influencerInterestList().indexOf(self.interests()[i].interestTitle);
          self.interests()[indexToChange].classInterestName = 'interest-checked-layer-show';
        } else {
          console.log('Not working');
        }
      };

// Set up the view with the data from the database

      // Set the height of the profile image to the width

      var imageWidth = $('.influencer-profile-image-container img').width();
      $('.influencer-profile-image-container img').css({'height':imageWidth+'px'});

      // Handle the accept / deny buttons and pop up
      self.newOrderActivated = ko.observable(false);
      self.detailsOrderActivated = ko.observable(false);
      self.openNewOrder = function acceptDenyButtonClicked(currentOrder) {
        self.currentOpenBrandImage(currentOrder.brandLogo);
        self.currentOpenBrandName(currentOrder.brandName);
        self.currentOpenCallToAction(currentOrder.callToAction);
        self.currentOpenConentFromInfluencer(currentOrder.contentInfo);
        self.currentOpenCampaignDescription(currentOrder.orderDescription);
        self.currentOpenCampaignName(currentOrder.orderTitle);
        self.currentOpenCampaignPrice(currentOrder.orderPrice);
        self.currentOpenPostingType(currentOrder.postingType);
        self.currentOpenTags(currentOrder.tags);
        self.currentOpenVibePics(currentOrder.vibePictures);

        $currentOrderContainer.fadeIn();
        $('body').css('overflow','hidden');

        self.newOrderActivated(true);
        self.detailsOrderActivated(false);

      };

      self.openCurrentOrPreviousOrder = function detailsButtonClicked() {
        $currentOrderContainer.fadeIn();
        $('body').css('overflow','hidden');
        self.newOrderActivated(false);
        self.detailsOrderActivated(true);
      };

      self.closeCurrentOrder = function closeButtonClicked() {
        $('.influencer-profile-orders-container').animate({
           scrollTop: 0
        }, function(){
          $currentOrderContainer.fadeOut();
          $('body').css('overflow','scroll');
        });

      };

      self.denyOrder = function denyButtonClicked() {
        $('.influencer-profile-orders-container').animate({
           scrollTop: 0
        }, function(){
          $currentOrderContainer.fadeOut();
          $('body').css('overflow','scroll');
        });
      };

      self.approveOrder = function approveOrderButtonClicked() {
        $('.influencer-profile-orders-container').animate({
           scrollTop: 0
        }, function(){
          $currentOrderContainer.fadeOut();
          $('body').css('overflow','scroll');
        });
      };

      if (self.influencerGender() == 'Male') {
        $maleButton.addClass('active');
      } else {
        $femalButton.addClass('active');
      }

      // Operations once the view has been populated with the data

      self.showFileInputWindow = function() {
        $profileImageFileInput.click();
      };

      self.uploadProfileImage = function(image) {
        readProfileImageURL(image);
      };

      // Load the image from the invisible file input for the profile image

      function readProfileImageURL(image) {
        var reader = new FileReader();

        reader.onload = function (e) {
          self.profileImage(e.target.result);
            // $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(image);

        var imageWidth = $('.influencer-profile-image-container img').width();
        $('.influencer-profile-image-container img').css({'height':imageWidth+'px'});
      }

      self.daysOptionsList = ko.observableArray([]);
      self.yearOptionsList = ko.observableArray([]);

      for(var i = 1; i < 32; i++) {
        self.daysOptionsList.push({dayNumber: i});
      }

      for(var i = 2017; i > 1900; i--) {
        self.yearOptionsList.push({yearNumber: i});
      }

      self.registerInfluencerEmailNotValidated = ko.observable(false);
      self.influencerEmailValidated            = ko.observable(false);

      self.influencerEmailTyping = function() {
        if (self.influencerEmail().length > 0) {
          if (validateEmail(self.influencerEmail())) {
            self.registerInfluencerEmailNotValidated(false);
            self.influencerEmailValidated(true);
          } else {
            self.registerInfluencerEmailNotValidated(true);
          }
        }
      };

      self.firstNameNotValidated = ko.observable(false);
      self.firstNameValidated    = ko.observable(false);

      self.influencerFirstNameTyping = function() {
        if (self.influencerFirstName().length > 1) {
          self.firstNameNotValidated(false);
          self.firstNameValidated(true);
        } else {
          self.firstNameNotValidated(true);
        }
      };

      self.lastNameNotValidated = ko.observable(false);
      self.lastNameValidated    = ko.observable(false);

      self.influencerLastNameTyping = function() {
        if (self.influencerLastName().length > 1) {
          self.lastNameNotValidated(false);
          self.lastNameValidated(true);
        } else {
          self.lastNameNotValidated(true);
        }
      };

      self.passwordNotValidated = ko.observable(false);
      self.passwordValidated    = ko.observable(false);

      self.influencerPasswordTyping = function() {
        if (self.influencerPassword().length > 5) {
          self.passwordNotValidated(false);
          self.passwordValidated(true);
        } else {
          self.passwordNotValidated(true);
        }
      };

      self.phoneNumberNotValidated = ko.observable(false);
      self.phoneNumberValidated    = ko.observable(false);

      self.influencerPhoneTyping = function() {
        if (self.influencerPhoneNumber().length > 0) {
          if (validatePhoneNumber(self.influencerPhoneNumber())) {
            self.phoneNumberNotValidated(false);
            self.phoneNumberValidated(true);
          } else {

            self.phoneNumberNotValidated(true);
          }
        } else {
          self.phoneNumberNotValidated(true)
        }
      };

      self.influencerDescriptionNotValidated = ko.observable(false);
      self.influencerDescriptionTyping = function() {
        if (self.influencerDescription().length < 20) {
          self.influencerDescriptionNotValidated(true);
        } else {
          self.influencerDescriptionNotValidated(false);
        }
      };

      self.accountCreationFormNotValidated = ko.observable(false);

      self.checkUserEntries = function() {
        if (self.influencerEmailValidated() && self.firstNameValidated() && self.lastNameValidated() && self.passwordValidated() && self.phoneNumberValidated() && self.influencerBirthMonth() != '' && self.influencerBirthDay() != '' && self.influencerBirthYear() != '') {
          self.accountCreationFormNotValidated(false);
          return true;
        } else {
          self.accountCreationFormNotValidated(true);
        }
      };

      self.selectInterest = function interestClickedOn( d, e ) {

        let $target = $( e.target );

        $target.toggleClass('interest-checked-layer-show');

        let inArray = !$target.hasClass('interest-checked-layer-show');

        if ( !inArray )
          self.influencerInterestList.push( d.interestTitle );

        if ( inArray ) {

          self.influencerInterestList.remove(( interest ) => {
            return interest == d.interestTitle;
          })

        }

      };

      self.setGender = function accountGenderSelected( d, e ) {

        let $target = $( e.target );

        if ( !$target.hasClass('gender-button') )
          $target = $target.closest('gender-button');

        let gender = $target[0].dataset.gender;

        self.influencerGender( gender );
        $('.gender-button.active').removeClass('active');
        $target.addClass('active');

      };

      self.addInfluencerTag = function addTagToInfluencerList( d, e ) {

        let tag = $("#tag-input").val();

        if ( tag == null || tag == '' )
          return;

        self.influencerTagList.push( tag );
        $('#tag-input').val('');

      };

      self.removeInfluencerTag = function deleteTagFromInfluencerList( d, e ) {

        self.influencerTagList.remove(( tag ) => {
          return tag == d;
        });

      };

      self.hideProfileNotFinished = function() {
        $('.influencer-profile-not-finished-container').fadeOut();
      };

      self.aboutButtonClicked = function(d,e) {
        const currentTarget = e.currentTarget;
        $(currentTarget).addClass('active-profile-link');
        $(currentTarget).removeClass('inactive-profile-link');
        const $workButton = $(currentTarget).parent().next().children();
        $workButton.addClass('inactive-profile-link');
        $workButton.removeClass('active-profile-link');
        $workInformationContainer.fadeOut(function() {
          $aboutInformationContainer.fadeIn();
        });
      };

      self.workButtonClicked = function(d,e) {
        const currentTarget = e.currentTarget;
        $(currentTarget).addClass('active-profile-link');
        $(currentTarget).removeClass('inactive-profile-link');
        const $workButton = $(currentTarget).parent().prev().children();
        $workButton.addClass('inactive-profile-link');
        $workButton.removeClass('active-profile-link');
        $aboutInformationContainer.fadeOut(function() {
          $workInformationContainer.fadeIn();
        });
      };

      self.editProfileButtonClicked = function() {
        $influencerSignUpSection.fadeIn();
        $('body').css('overflow','hidden');
      };

      self.changeInfluencerPersonalInformation = function() {
        $influencerAccountInformationContainer.fadeOut(function() {
          $influencerFurtherInformationContainer.fadeIn();
        })
      };;

      self.finishSavingInfluencerInformation = function() {
        $influencerFurtherInformationContainer.fadeOut(function() {
          $influencerInformationSavedContainer.fadeIn();
        });
      };

      self.accountInfoNotValidated = ko.observable(false);
      self.exitInfluencerSavedInformation = function() {
        $influencerSignUpSection.fadeOut(function() {
          $influencerInformationSavedContainer.fadeOut(function() {
            $influencerAccountInformationContainer.fadeIn();
          });
        });
        $('body').css('overflow','scroll');
      };

  };

  var influencerPrivateProfileObjectVm = new influencerPrivateProfileViewModel();
  ko.cleanNode($('#influencer-private-profile-section')[0]);
  ko.applyBindings(influencerPrivateProfileObjectVm,$("#influencer-private-profile-section")[0]);
  ko.cleanNode($('#influencer-edit-profile-section')[0]);
  ko.applyBindings(influencerPrivateProfileObjectVm,$("#influencer-edit-profile-section")[0]);

  $('#influencer-edit-profile-section').on('click', function(e) {
    if (e.target == this) {
      $('#influencer-edit-profile-section').fadeOut();
      $('body').css('overflow','auto');
    }

  });

  $('.influencer-profile-orders-container').on('click', function(e) {
    if (e.target == this) {
      $('.influencer-profile-orders-container').fadeOut();
      $('body').css('overflow','auto');
    }

  });

})(jQuery); // End of use strict
