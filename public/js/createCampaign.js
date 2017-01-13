(function($) {

  function CreateCampaignViewModel() {

      var self = this;

      self.isInfluencerLoggedInOrSignedUp = ko.observable(false);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          self.isInfluencerLoggedInOrSignedUp(true);
        } else {
          // No user is signed in.
          self.isInfluencerLoggedInOrSignedUp(false);
        }
      });

      self.brandName = ko.observable('');
      self.campaignName = ko.observable('');
      self.lowerAgeRange = ko.observable('');
      self.upperAgeRange = ko.observable('17');
      self.ageRange = ko.observable('');
      self.locations = ko.observableArray([]);
      self.targetLocation = ko.observable('');
      self.tagsList = ko.observableArray([]);
      self.currentTag = ko.observable('');
      self.locationsList = ko.observableArray([]);
      self.influencersOrderList = ko.observableArray([]);
      self.currentLocation = ko.observable('');
      self.currentHelpText = ko.observable('');
      self.campaignBudget = ko.observable('');
      self.totalPotentialReach = ko.observable(0);
      self.totalCost = ko.observable(0);
      self.genderList = ko.observableArray([]);
      self.postingType = ko.observable('');
      self.interestsAddedList = ko.observableArray([]);
      self.campaignDeadline = ko.observable('');
      self.deadlineMonth = ko.observable('');
      self.deadlineDay = ko.observable('');
      self.deadLineYear = ko.observable('');

      var dateObj = new Date();
      self.deadlineMonth(dateObj.getUTCMonth() + 1); //months from 1-12
      self.deadlineDay(dateObj.getUTCDate());
      self.deadLineYear(dateObj.getUTCFullYear());

      // Variable for the influencer pop up when the influencer is clicked on the second page of the campaign process

      self.selectedInfluencerName = ko.observable('');
      self.selectedInfluencerInstagram = ko.observable('');
      self.selectedInfluencerLocation = ko.observable('');
      self.selectedInfluencerFollowers = ko.observable('');
      self.selectedInfluencerEngagementRate = ko.observable('');
      self.selectedInfluencerShowtScore = ko.observable('');
      self.selectedInfluencerAboutMe = ko.observable('');
      self.selectedInfluencerImage = ko.observable('');

      // Variables for business login and sign up for the campaign page

      self.businessLoginEmail = ko.observable('');
      self.businessLoginPassword = ko.observable('');
      self.showBusinessEmailErrorMessage = ko.observable(false);
      self.showPasswordErrorMessage = ko.observable(false);
      self.businessCardNumber = ko.observable('');
      self.businessCardExpirationDate = ko.observable('');
      self.businessCardSecurityCode = ko.observable('');
      self.businessSignUpEmail = ko.observable('');
      self.businessSignUpName = ko.observable('');
      self.businessSignUpPassword = ko.observable('');
      self.businessSignUpPhoneNumber = ko.observable('');
      self.businessSignUpInstagram = ko.observable('');
      self.influencerList = ko.observableArray([]);

      self.campaignInfoNotValidated = ko.observable(false);
      self.postInformationNotValidated = ko.observable(true);

      const $createCampaignSection = $('#create-campaign-section');
      const $campaignHelpContainer = $('.create-campaign-help-container');

      var influencersRef = firebase.database().ref('influencers');
      influencersRef.orderByChild("profileCompleted").equalTo(true).on("value", function(snapshot) {

        var currentSnapshot = snapshot.val();
        //console.log(currentSnapshot);
        self.influencerList([]);
        for (i in currentSnapshot) {
          self.getUsersInformation(currentSnapshot[i], i);
        }

      });

      self.getUsersInformation = function(currentInfluencer, influencerKey) {
        var storage = firebase.storage();
        var influencersPathRef = storage.ref(currentInfluencer.pictureLocation);
        influencersPathRef.getDownloadURL().then(function(url) {
          console.log(currentInfluencer.location);
          var newInfluencerToAdd = {
            image: url,
            name: currentInfluencer.name,
            location: currentInfluencer.location,
            instagramFollowers: currentInfluencer.showtReach,
            instagramFollowersText: currentInfluencer.showtReach,
            showtPrice: currentInfluencer.showtPrice.replace('$',''),
            showtPriceText: currentInfluencer.showtPrice,
            showtScore: currentInfluencer.showtScore,
            instagram: currentInfluencer.instagram,
            engagementRate: currentInfluencer.showtEngagement,
            aboutText: currentInfluencer.aboutMe,
            influencerID: influencerKey
          }

          self.influencerList.push(newInfluencerToAdd);
        }).catch(function(error) {
          // Handle any errors
          console.log(error.message);
        });
      };


      self.sampleInfluencerList = ko.observableArray([
        {
          image: '/static/img/justeen.png',
          name: 'Justeen Bell',
          location: 'Clovis, Ca',
          instagramFollowers: '4373',
          instagramFollowersText: '4.3K',
          showtPrice: '200',
          showtPriceText: '$200',
          showtScore: '6.4',
          instagram: 'justeenybell',
          engagementRate: '9%',
          aboutText: 'fdsafkjsda oifasdj asdjasdfiuadhsf iuadsfuadshadisu f hadsuiof dhsaiufhiuf adhsuifo adsiufb adsiufiufb adsuif adsuibf asduibf dsaiuf badsifu basidufb sdiufb sdaiufb sdiufb dsiufb sdaiufb asidufb asdiufb uisadb fiuasdbf iausbfd iuasbfdiu.'
        },
        {
          image: '/static/img/ashtyn.png',
          name: 'Ashtyn',
          location: 'Fresno, Ca',
          instagramFollowers: '10200',
          instagramFollowersText: '10.2K',
          showtPrice: '200',
          showtPriceText: '$200',
          showtScore: '7.1',
          instagram: 'ashtyyn',
          engagementRate: '5%',
          aboutText: 'fdsafkjsda oifasdj asdjasdfiuadhsf iuadsfuadshadisu f hadsuiof dhsaiufhiuf adhsuifo adsiufb adsiufiufb adsuif adsuibf asduibf dsaiuf badsifu basidufb sdiufb sdaiufb sdiufb dsiufb sdaiufb asidufb asdiufb uisadb fiuasdbf iausbfd iuasbfdiu.'
        },
        {
          image: '/static/img/megan.jpg',
          name: 'Megan Sullivan',
          location: 'Fresno, Ca',
          instagramFollowers: '30900',
          instagramFollowersText: '30.9K',
          showtPrice: '200',
          showtPriceText: '$200',
          showtScore: '8.4',
          instagram: 'megooozzz',
          engagementRate: '10%',
          aboutText: 'fdsafkjsda oifasdj asdjasdfiuadhsf iuadsfuadshadisu f hadsuiof dhsaiufhiuf adhsuifo adsiufb adsiufiufb adsuif adsuibf asduibf dsaiuf badsifu basidufb sdiufb sdaiufb sdiufb dsiufb sdaiufb asidufb asdiufb uisadb fiuasdbf iausbfd iuasbfdiu.'
        },
        {
          image: '/static/img/lexhammer.png',
          name: 'Alexa Hammerschmidt',
          location: 'Fresno, Ca',
          instagramFollowers: '2902',
          instagramFollowersText: '2.9K',
          showtPrice: '200',
          showtPriceText: '$200',
          showtScore: '6.2',
          instagram: 'lexaahammer',
          engagementRate: '20%',
          aboutText: 'fdsafkjsda oifasdj asdjasdfiuadhsf iuadsfuadshadisu f hadsuiof dhsaiufhiuf adhsuifo adsiufb adsiufiufb adsuif adsuibf asduibf dsaiuf badsifu basidufb sdiufb sdaiufb sdiufb dsiufb sdaiufb asidufb asdiufb uisadb fiuasdbf iausbfd iuasbfdiu.'
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
          instagram: 'jaredlumbard',
          engagementRate: '10%',
          aboutText: 'fdsafkjsda oifasdj asdjasdfiuadhsf iuadsfuadshadisu f hadsuiof dhsaiufhiuf adhsuifo adsiufb adsiufiufb adsuif adsuibf asduibf dsaiuf badsifu basidufb sdiufb sdaiufb sdiufb dsiufb sdaiufb asidufb asdiufb uisadb fiuasdbf iausbfd iuasbfdiu.'
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
        "As of right now we are only available in Fresno, Ca for in store posting. However, we are expanding to new cities very quickly so please get in contact with us to let us know where you are located!",
        "What gender are you wanting to promote your brand? You can pick one or both.",
        "Select from the region below the kind of influencers that you are looking to find. By choosing the interests below it will be much better when finding influencers to help your campaign.",
        "The Showt Score is what we at Showt use to rank influecners on how much influence they have in their markets. It is based on a bunch of factors but all you need to know is that the higher the score out of 10 the better.",
        "The campaign deadline is the exact day that you want the influencer to complete your request. This allows our influencers to plan accordingly to make sure you have the best experience possible."
      ]);

      self.addTagToList = function() {
        if (self.currentTag().length > 2) {
          self.tagsList.push({
            tagName: self.currentTag()
          });
          self.currentTag('');
        }
      };

      self.fillCheckBox = function(d,e) {
        $('.filled-check-box').removeClass('filled-check-box');
        $(e.currentTarget ).addClass('filled-check-box');
        self.postingType($(e.currentTarget).next().text());
        if (self.postingType() == "In store posting") {
          $('.target-region-input-container').slideDown();
          self.targetLocation('Fresno, Ca');
        } else {
          $('.target-region-input-container').css('display','none');
          self.targetLocation('');
        }
      };

      self.deleteTagFromTagList = function(index) {
        self.tagsList.remove(index);
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

      // Gender button clicked change function
      self.changeGender = function genderButtonClicked(d,e) {
        const currentGender = $(e.currentTarget).text();
        if (self.genderList().indexOf(currentGender) > -1) {
          self.genderList.remove(currentGender);
        } else {
          self.genderList.push(currentGender);
        }
        $(e.currentTarget).toggleClass('next-button-tapped');
      };

      self.addInterestToList = function interestItemClicked(d,e) {
        if (self.interestsAddedList().indexOf(d) > -1) {
          self.interestsAddedList.remove(d);
        } else {
          self.interestsAddedList.push(d);
        }
      };

      self.nextButtonClicked = function() {

        if (currentCampaignCreationIteration == 0) {
          if (self.campaignCheck() && self.genderCheck()) {
            if (self.isInfluencerLoggedInOrSignedUp() == false) {
              $('.business-sign-up-login-container').fadeIn(function() {
                $('body').css('overflow','hidden');
              });
            } else {
              $('.select-influencer-step-container').removeClass('select-influencer-step-container');
            }
            $('.active-create-campaign-container').fadeOut(function() {
              const $nextCampaignCreateItem = $('.active-create-campaign-container').next()
              $nextCampaignCreateItem.fadeIn();
              $('.active-create-campaign-container').removeClass('active-create-campaign-container');
              $nextCampaignCreateItem.addClass('active-create-campaign-container');
              $('#create-campaign-section').animate({
                  scrollTop: $('#create-campaign-section').offset().top
              }, 'fast');
            });
            currentCampaignCreationIteration = currentCampaignCreationIteration + 1;
            self.ageRange(self.lowerAgeRange() + ' - ' + self.upperAgeRange());
            self.campaignDeadline(self.deadlineMonth() + '-' + self.deadlineDay() + '-' + self.deadLineYear());
          } else {
            $('#create-campaign-section').animate({
                scrollTop: $('#create-campaign-section').offset().top
            }, 'fast');
          }

        } else if (currentCampaignCreationIteration == 1) {
          if (self.influencerCheck()) {
            $('.active-create-campaign-container').fadeOut(function() {
              const $nextCampaignCreateItem = $('.active-create-campaign-container').next()
              $nextCampaignCreateItem.fadeIn();
              $('.active-create-campaign-container').removeClass('active-create-campaign-container');
              $nextCampaignCreateItem.addClass('active-create-campaign-container');
              $('#create-campaign-section').animate({
                  scrollTop: $('#create-campaign-section').offset().top
              }, 'fast');
            });
            currentCampaignCreationIteration = currentCampaignCreationIteration + 1;
          }
        }



      };

      self.showCampainErrorMessage = ko.observable(false);
      self.campaignCheck = function() {
        if (self.campaignName().length < 6) {
          self.showCampainErrorMessage(true);
          return false;
        } else {
          self.showCampainErrorMessage(false);
          return true;
        }
      };

      self.showGenderErrorMessage = ko.observable(false);
      self.genderCheck = function() {
        if (self.genderList().length < 1) {
          self.showGenderErrorMessage(true);
          return false;
        } else {
          self.showGenderErrorMessage(false);
          return true;
        }
      };

      self.showInfluencerErrorMessage = ko.observable(false);
      self.influencerCheck = function() {
        if (self.influencersOrderList().length < 1) {
          self.showInfluencerErrorMessage(true);
          return false;
        } else {
          self.showInfluencerErrorMessage(false);
          return true;
        }
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
        self.selectedInfluencerName(influencerClicked.name);
        self.selectedInfluencerAboutMe(influencerClicked.aboutText);
        self.selectedInfluencerLocation(influencerClicked.location);
        self.selectedInfluencerFollowers(influencerClicked.instagramFollowersText);
        self.selectedInfluencerInstagram(influencerClicked.instagram);
        self.selectedInfluencerShowtScore(influencerClicked.showtScore);
        self.selectedInfluencerImage(influencerClicked.image);
        self.selectedInfluencerEngagementRate(influencerClicked.engagementRate);
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
          self.totalPotentialReach(parseInt(self.totalPotentialReach()) - parseInt(d.instagramFollowers.replace(',','')));
          self.totalCost(self.totalCost() - parseInt(d.showtPrice));
        } else {
          self.influencersOrderList.push(d);
          self.totalPotentialReach(parseInt(self.totalPotentialReach()) + parseInt(d.instagramFollowers.replace(',','')));
          self.totalCost(self.totalCost() + parseInt(d.showtPrice));
        }
        self.totalPotentialReach(self.addCommasInNumber(self.totalPotentialReach().toString()));
        $(e.currentTarget).toggleClass('influencer-added');
      };

      self.addCommasInNumber = function addCommasInNumber(currentNumber) {
        return currentNumber.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      };

      // Finish the campaign creation process and place the order if they are signed in.

      self.placeOrderButtonClicked = function() {
        // Show this if we don't already have the customers information
        $('.business-login-information-container').css('display','none');
        $('.business-signup-container-campaign').css('display','none');
        $('.business-credit-card-info-container').css('display','block');
        $('.business-sign-up-login-container').fadeIn(function() {
          $('body').css('overflow','hidden');
        });
      };

      // Validating both the log in and sign up forms

      self.businessLoginEmailTyping = function() {
          if (validateEmail(self.businessLoginEmail())) {
            self.showBusinessEmailErrorMessage(false);
          } else {
            self.showBusinessEmailErrorMessage(true);
          }
      };

      self.businessLoginPasswordTyping = function() {
        if (self.businessLoginPassword().length > 5) {
          self.showPasswordErrorMessage(false);
        } else {
          self.showPasswordErrorMessage(true);
        }
      };

      self.showBusinessSignUpNameErrorMessage = ko.observable(false);
      self.businessSignUpNameTyping = function() {
        if (self.businessSignUpName().length > 3) {
          self.showBusinessSignUpNameErrorMessage(false);
        } else {
          self.showBusinessSignUpNameErrorMessage(true);
        }
      };

      self.showBusinessSignUpEmailErrorMessage = ko.observable(false);
      self.businessSignUpEmailTyping = function() {
        if (validateEmail(self.businessSignUpEmail())) {
          self.showBusinessSignUpEmailErrorMessage(false);
        } else {
          self.showBusinessSignUpEmailErrorMessage(true);
        }
      };

      self.showPasswordSignUpErrorMessage = ko.observable(false);
      self.businessSignUpPasswordTyping = function() {
        if (self.businessSignUpPassword().length > 5) {
          self.showPasswordSignUpErrorMessage(false);
        } else {
          self.showPasswordSignUpErrorMessage(true);
        }
      };

      self.showBusinessPhoneErrorMessage = ko.observable(false);
      self.businessSignUpPhoneTyping = function() {
        if (validatePhoneNumber(self.businessSignUpPhoneNumber())) {
          self.showBusinessPhoneErrorMessage(false);
        } else {

          self.showBusinessPhoneErrorMessage(true);
        }
      };

      self.showBusinessInstagramErrorMessage = ko.observable(false);
      self.businessSignUpInstagramTyping = function() {
        if (self.businessSignUpInstagram().length > 1) {
          self.showBusinessInstagramErrorMessage(false);
        } else {
          self.showBusinessInstagramErrorMessage(true);
        }
      };

      self.logInBusinessFromCampaign = function businessLoginButtonClicked() {

        // Log the business in

        firebase.auth().signInWithEmailAndPassword(self.businessLoginEmail(), self.businessLoginPassword()).then(function() {
          $('.business-sign-up-login-container').fadeOut(function() {
            self.isInfluencerLoggedInOrSignedUp(true);
            $('.select-influencer-step-container').removeClass('select-influencer-step-container');
          });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          // ...
        });

      };

      self.signUpBusiness = function businessSignUpButtonClicked() {
        $('.business-login-information-container').fadeOut(function() {
          $('.business-signup-container-campaign').fadeIn();
        });
      };

      self.signUpBusinessCampaign = function signUpBusinessButtonClicked() {

        // Register the email and password for the business
        firebase.auth().createUserWithEmailAndPassword(self.businessSignUpEmail(), self.businessSignUpPassword()).then(function(user) {

          var userID = user.uid;
          // Save the data back to the database for the business ref
          firebase.database().ref('businesses/' + userID).set({
            email: self.businessSignUpEmail(),
            businessName: self.businessSignUpName(),
            usersName: '',
            phone: self.businessSignUpPhoneNumber(),
            address: '',
            interests: [],
            tags: [],
            instagram: self.businessSignUpInstagram()
          }).then(function() {
            $('.business-sign-up-login-container').fadeOut(function() {
              self.isInfluencerLoggedInOrSignedUp(true);
              $('.select-influencer-step-container').removeClass('select-influencer-step-container');
            });
          });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });

      };

      self.showLoginSectionFromSignUp = function signUpButtonOnSignUpClicked() {
        $('.business-signup-container-campaign').fadeOut(function() {
          $('.business-login-information-container').fadeIn();
        });
      };

      self.closeCreditInfoContainer = function cancelOrderButtonClicked() {
        $('.business-sign-up-login-container').fadeOut();
        $('body').css('overflow','auto');
      };

      self.placeOrder = function finalPlaceOrderButtonClicked() {
        location.href = '/business/dashboard';
      };

      self.showCreditCardHelpText = function creditCardHelpTextClicked() {
        $('.card-help-text').slideToggle();
      };

      self.saveCardInfoForFuture = function cardInfoRadioButtonClicked(d,e) {
        $(e.currentTarget).toggleClass('saveForFutureClicked');
      };

      self.showCardNumberErrorMessage = ko.observable(false);
      self.cardNumberBlur = function cardNumberDataBindBlur() {
        if (self.businessCardNumber().length != 16 || isNaN(self.businessCardNumber())) {
          self.showCardNumberErrorMessage(true);
        } else {
          self.showCardNumberErrorMessage(false);
        }
      };

      self.cardNumberTyping = function() {
        if (self.businessCardNumber().length == 16) {
          self.showCardNumberErrorMessage(false);
        }
      };

      self.showExpirationDataErrorMessage = ko.observable(false);
      self.expirationDateBlur = function expirationDateDataBindBlur() {
        if (self.businessCardExpirationDate().length != 5) {
          self.showExpirationDataErrorMessage(true);
        } else {
          self.showExpirationDataErrorMessage(false);
        }
      };

      var lastExpirationCharacter = '';
      self.expirationDateTyping = function() {

        if (self.businessCardExpirationDate().length == 2 && lastExpirationCharacter != '/') {
          self.businessCardExpirationDate( self.businessCardExpirationDate() + '/' );
        } else if (lastExpirationCharacter == '/' && self.businessCardExpirationDate().length <= 3) {
          self.businessCardExpirationDate( self.businessCardExpirationDate().slice(0, -1) );
        }

        lastExpirationCharacter = self.businessCardExpirationDate().slice(-1);
        console.log(lastExpirationCharacter);

        if (self.businessCardExpirationDate().length == 5) {
          self.showExpirationDataErrorMessage(false);
        }
      };

      self.showSecurityCodeErrorMessage = ko.observable(false);
      self.securityCodeBlur = function securityCodeDataBindBlur() {
        if (self.businessCardSecurityCode().length != 3) {
          self.showSecurityCodeErrorMessage(true);
        } else {
          self.showSecurityCodeErrorMessage(false);
        }
      };

      self.securityCodeTyping = function() {
        if (self.businessCardSecurityCode().length == 3) {
          self.showSecurityCodeErrorMessage(false);
        }
      };
  };

  const $postInformationPicContainer = $('.pic-container');
  const $interestInPicture = $('.influencer-interest-picture-container img');
  const $interestTypeInfoContainer = $('.interest-type-info-container');
  const $genderButton = $('.gender-button');

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
