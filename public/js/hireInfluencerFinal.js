(function($) {

  function influencerFinalViewModel() {

        var self = this;

        // Check if the user is logged in to the site

        self.isBusinessLoggedInOrSignedUp = ko.observable(false);
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var userID = user.uid;
            var businessRef = firebase.database().ref('businesses/' + userID);
            businessRef.on("value", function(snapshot) {
              var loggedInBusiness = snapshot.val();
              self.businessName(loggedInBusiness.businessName);
            });
            self.isBusinessLoggedInOrSignedUp(true);
          } else {
            // No user is signed in.
            self.isBusinessLoggedInOrSignedUp(false);
          }
        });

        var monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        var d = new Date();
        const currentDate = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

        // Variables for the influencers profile page

        self.influencerEmail         = ko.observable('');
        self.influencerLocation      = ko.observable('');
        self.influencerName          = ko.observable('');
        self.influencerFirstName     = ko.observable('');
        self.influencerLastName      = ko.observable('');
        self.influencerPassword      = ko.observable('');
        self.influencerPhoneNumber   = ko.observable('');
        self.influencerDescription   = ko.observable('');
        self.influencerInstagramName = ko.observable('');
        self.influencerTagList       = ko.observableArray([]);
        self.influencerInterestList  = ko.observableArray([]);
        self.influencerGender        = ko.observable('');
        self.influencerShowtReach    = ko.observable('');
        self.influencerShowtEngagement = ko.observable('');
        self.influencerShowtScore    = ko.observable('');
        self.influencerShowtPrice    = ko.observable('');
        self.currentTag              = ko.observable('');
        self.profileImage = ko.observable('');
        self.isProfileFinished       = ko.observable(false);
        self.influencerProfileImageLocation = ko.observable('');

        self.businessName = ko.observable('');
        self.postingType = ko.observable('');
        self.targetLocation = ko.observable('');
        self.contentNeededFromInfluencer = ko.observable('');
        self.campaignDeadlineMonth    = ko.observable('');
        self.campaignDeadlineDay      = ko.observable('');
        self.campaignDeadlineYear     = ko.observable('');
        self.campaignFullDeadLine     = ko.observable('');

        // Login & Sign up variables

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
        self.showAddProfilePicText = ko.observable(false);
        self.showProfileSavedButton = ko.observable(false);

        self.tempNewJobs = ko.observableArray([]);

        self.newJobs       = ko.observableArray([]);

        self.currentJobs       = ko.observableArray([]);

        self.previousJobs       = ko.observableArray([]);

        var userID;

        // Query in all of the users information
        const instagramID = location.href.substr(location.href.lastIndexOf('/') + 1);

        var influencersRef = firebase.database().ref('influencers');
        var campaignRef = firebase.database().ref('campaigns');
        influencersRef.orderByChild("instagram").equalTo(instagramID).once("child_added", function(snapshot) {

          self.influencerTagList([]);
          self.influencerInterestList([]);

          const currentUser = snapshot.val();
          userID = snapshot.key;

          self.influencerEmail(currentUser.email);
          self.isProfileFinished(!(currentUser.profileCompleted));
          self.influencerName(currentUser.name);
          self.influencerPhoneNumber(currentUser.phone);
          self.influencerTagList(currentUser.tags);
          self.influencerInstagramName(currentUser.instagram);
          self.influencerGender(currentUser.gender);
          self.influencerShowtReach(currentUser.showtReach);
          self.influencerShowtEngagement(currentUser.showtEngagement);
          self.influencerShowtScore(currentUser.showtScore);
          self.influencerShowtPrice(currentUser.showtPrice);
          self.influencerLocation(currentUser.location);
          self.influencerDescription(currentUser.aboutMe);
          self.influencerProfileImageLocation(currentUser.pictureLocation);

          if (self.influencerTagList() == undefined) {
            self.influencerTagList([]);
          }

          if (self.influencerInterestList() == undefined) {
            self.influencerInterestList([]);
          }

          if (self.influencerProfileImageLocation() == "") {
            self.profileImage('/static/img/profile-add-camera.png');
            self.showAddProfilePicText(true);
            self.queryCampaigns();
          } else {
            // Perform the login to take down the image from firebase
            var storage = firebase.storage();
            var influencersPathRef = storage.ref('influencers/' + snapshot.key);
            influencersPathRef.getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            self.profileImage(url);
            // Or inserted into an <img> element:
            // var img = document.getElementById('myimg');
            // img.src = url;
            self.showAddProfilePicText(false);
            self.queryCampaigns();
          }).catch(function(error) {
            // Handle any errors
          });

          }

          for (var i = 0; i < currentUser["interests"].length; i++) {
            const currentInterestText = currentUser.interests[i];
            var editedCurrentInterestText = currentInterestText.replace(/ /g,'');
            editedCurrentInterestText = editedCurrentInterestText.replace(/,/g,'');
            editedCurrentInterestText = editedCurrentInterestText.replace(/&/g, '');

            const interest = {
              interestText: currentInterestText,
              interestClass: editedCurrentInterestText.toLowerCase(),
            };

            self.influencerInterestList.push(interest);
          };
        });

        self.queryCampaigns = function() {
          console.log("?");
          // Load in the campaigns
          campaignRef.orderByChild("influencers/" + userID + '/activeInfluencer').equalTo(true).once("value", function(snapshot) {
            var currentNewJobArray = [];
            var currentActiveJobArray = [];
            var currentPreviousJobArray = [];
            var iterator = 0;
            for (campaign in snapshot.val()) {
              const currentCampaign = snapshot.val()[campaign];
              var influencerCost = currentCampaign["influencers"][userID]["cost"];
              var campaignActive = currentCampaign["influencers"][userID]["active"];
              var campaignFinished = currentCampaign["influencers"][userID]["finished"];

              var campaignToAdd = {
                active: currentCampaign.active,
                business: currentCampaign.business,
                businessName: currentCampaign.businessName,
                campaignName: currentCampaign.campaignName,
                deadline: currentCampaign.deadline,
                finished: currentCampaign.finished,
                location: currentCampaign.location,
                campaignID: campaign,
                postingRequirement: currentCampaign.postingRequirement,
                visualProof: currentCampaign.visualProof,
                price: '$' + influencerCost
              };

              if (campaignActive == false && campaignFinished == false) {
                currentNewJobArray.push(campaignToAdd);
                if (currentNewJobArray.length % 3 == 0) {
                  self.newJobs.push({array: currentNewJobArray});
                  currentNewJobArray = [];
                }
              } else if (campaignActive == true) {
                currentActiveJobArray.push(campaignToAdd);
                if (currentActiveJobArray.length % 3 == 0) {
                  self.currentJobs.push({array: currentActiveJobArray});
                  currentActiveJobArray = [];
                }
              } else {
                currentPreviousJobArray.push(campaignToAdd);
                if (currentPreviousJobArray.length % 3 == 0) {
                  self.previousJobs.push({array: currentPreviousJobArray});
                  currentPreviousJobArray = [];
                }
              }
              if (iterator == Object.keys(snapshot.val()).length - 1) {
                self.newJobs.push({array: currentNewJobArray});
                self.currentJobs.push({array: currentActiveJobArray});
                self.previousJobs.push({array: currentPreviousJobArray});
              }
              iterator = iterator + 1;
              console.log('HEre');
            };
            self.hideLoadingScreen();

          });


        };

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
        const $profileLoadingScreen  = $('.influencer-loading-screen');

        self.hideLoadingScreen = function() {
          $profileLoadingScreen.fadeOut();
        };

        // Set the height of the profile image to the width

        var imageWidth = $('.influencer-profile-image-container img').width();
        $('.influencer-profile-image-container img').css({'height':imageWidth+'px'});

        self.daysOptionsList = ko.observableArray([]);
        self.yearOptionsList = ko.observableArray([]);

        for(var i = 1; i < 32; i++) {
          self.daysOptionsList.push({dayNumber: i});
        }

        for(var i = 2017; i > 1900; i--) {
          self.yearOptionsList.push({yearNumber: i});
        }

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

        self.isPostingInfoFinished = ko.observable(false);
        self.requestInfluencer = function() {
          self.campaignFullDeadLine(self.campaignDeadlineMonth() + ' ' + self.campaignDeadlineDay() + ', ' + self.campaignDeadlineYear());
          if (self.isBusinessLoggedInOrSignedUp()) {
            // Handle credit card information
            if (self.postingType() != '' && self.campaignFullDeadLine() != '' && self.contentNeededFromInfluencer()) {
              $('.business-credit-card-info-container').css('display','block');
              $('.business-signup-container-campaign').css('display','none');
              $('.business-sign-up-login-container').fadeIn(function() {
                $('body').css('overflow','hidden');
              });
              self.isPostingInfoFinished(false);
            } else {
              self.isPostingInfoFinished(true);
            }
          } else {
            // Log them in or sign them up
            if (self.postingType() != '' && self.campaignFullDeadLine() != '' && self.contentNeededFromInfluencer()) {
              $('.business-sign-up-login-container').fadeIn(function() {
                $('body').css('overflow','hidden');
              });
              self.isPostingInfoFinished(false);
            } else {
              self.isPostingInfoFinished(true);
            }
          }
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

        self.placeOrder = function finalPlaceOrderButtonClicked() {
          var business = firebase.auth().currentUser;
          var businessID = business.uid;
          var influencer = {};
          influencer[userID] = {
            activeInfluencer: true,
            active: false,
            finished: false,
            cost: self.influencerShowtPrice().replace('$',''),
            name: self.influencerName()
          };
          // Save the campaign back to the database
          var newCampaign = {
            postingRequirement: self.postingType(),
            deadline: self.campaignFullDeadLine(),
            location: self.targetLocation(),
            influencers: influencer,
            business: businessID,
            businessName: self.businessName(),
            active: false,
            finished: false,
            denied: false,
            deniedText: '',
            visualProof: '',
            contentInfo: self.contentNeededFromInfluencer(),
            cancelled: false,
            orderAccepted: false,
            orderDelivered: false,
            orderDate: currentDate
          };

          firebase.database().ref('campaigns/').push(newCampaign).then(function() {
            // Navigate to the business' dashboard
            location.href = '/business/orders';
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

          firebase.auth().signInWithEmailAndPassword(self.businessLoginEmail(), self.businessLoginPassword()).then(function(user) {
            var userID = user.uid;
            var businessRef = firebase.database().ref('businesses/' + userID);
            businessRef.on("value", function(snapshot) {
              var loggedInBusiness = snapshot.val();
              self.businessSignUpName(loggedInBusiness.businessName);
            });
            $('.business-login-information-container').fadeOut(function() {
              self.isBusinessLoggedInOrSignedUp(true);
              $('.business-credit-card-info-container').fadeIn();
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
                self.isBusinessLoggedInOrSignedUp(true);
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

    };

  var influencerFinalObjectVm = new influencerFinalViewModel();
  ko.cleanNode($('#hire-influencer-section')[0]);
  ko.applyBindings(influencerFinalObjectVm,$("#hire-influencer-section")[0]);

})(jQuery); // End of use strict
