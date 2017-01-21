(requireAuth('/login', function() {

  function influencerPrivateProfileViewModel() {

        var self = this;

        // Variables for the influencers profile page

        self.influencerEmail         = ko.observable('');
        self.influencerLocation      = ko.observable('');
        self.influencerName          = ko.observable('');
        self.influencerFirstName     = ko.observable('');
        self.influencerLastName      = ko.observable('');
        self.influencerPassword      = ko.observable('');
        self.influencerPhoneNumber   = ko.observable('');
        self.influencerDescription   = ko.observable('');
        self.influencerBirthMonth    = ko.observable('');
        self.influencerBirthDay      = ko.observable('');
        self.influencerBirthYear     = ko.observable('');
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

        self.currentOpenCampaignID = ko.observable('');
        self.currentOpenBusinessID = ko.observable('');
        self.currentOpenOrderDeadline = ko.observable('');
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

        // Query in all of the users information
        var user = firebase.auth().currentUser;
        var userID = user.uid;
        var influencersRef = firebase.database().ref('influencers/' + userID);
        var campaignRef = firebase.database().ref('campaigns/');
        influencersRef.on('value', function(snapshot) {

          self.influencerTagList([]);
          self.influencerInterestList([]);

          const currentUser = snapshot.val();
          self.influencerEmail(currentUser.email);
          self.isProfileFinished(!(currentUser.profileCompleted));
          self.influencerName(currentUser.name);
          self.influencerFirstName(currentUser.name.split(' ')[0]);
          self.influencerLastName(currentUser.name.split(' ')[1]);
          self.influencerPhoneNumber(currentUser.phone);
          self.influencerTagList(currentUser.tags);
          self.influencerInstagramName(currentUser.instagram);
          self.influencerGender(currentUser.gender);
          self.influencerShowtReach(currentUser.showtReach);
          self.influencerShowtEngagement(currentUser.showtEngagement);
          self.influencerShowtScore(currentUser.showtScore);
          self.influencerShowtPrice(currentUser.showtPrice);
          self.influencerBirthMonth(currentUser.birthday.split(' ')[0]);
          self.influencerBirthDay(currentUser.birthday.split(' ')[1].replace(',',''));
          self.influencerBirthYear(currentUser.birthday.split(' ')[2]);
          self.influencerLocation(currentUser.location);
          self.influencerDescription(currentUser.aboutMe);
          self.influencerProfileImageLocation(currentUser.pictureLocation);
          self.profileImage(currentUser.pictureLocation);

          if (self.influencerTagList() == undefined) {
            self.influencerTagList([]);
          }

          if (self.influencerInterestList() == undefined) {
            self.influencerInterestList([]);
          }

          if (self.influencerProfileImageLocation() == "") {
            self.profileImage('/static/img/profile-add-camera.png');
            self.showAddProfilePicText(true);
          }

          self.queryCampaigns();

          if (self.influencerGender() == 'male') {
            $maleButton.addClass('active');
          } else {
            $femalButton.addClass('active');
          }

          for (var i = 0; i < currentUser.interests.length; i++) {
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

          self.setUpEditProfileInterests();
        });

        self.queryCampaigns = function() {

          // Load in the campaigns
          campaignRef.orderByChild("influencers/" + userID + '/activeInfluencer').equalTo(true).once("value", function(snapshot) {
            var currentNewJobArray = [];
            var currentActiveJobArray = [];
            var currentPreviousJobArray = [];
            var iterator = 0;
            console.log(snapshot.val());
            for (campaign in snapshot.val()) {
              const currentCampaign = snapshot.val()[campaign];
              var influencerCost = currentCampaign["influencers"][userID]["cost"];
              var campaignActive = currentCampaign["influencers"][userID]["active"];
              var campaignFinished = currentCampaign["influencers"][userID]["finished"];

              console.log(campaignActive);

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
                price: '$' + influencerCost,
                contentInfo: currentCampaign.contentInfo
              };

              console.log(campaignToAdd.active);

              if (campaignActive == false && campaignFinished == false) {
                currentNewJobArray.push(campaignToAdd);
                if (currentNewJobArray.length % 3 == 0) {
                  self.newJobs.push({array: currentNewJobArray});
                  currentNewJobArray = [];
                }
              } else if (campaignActive == true) {
                console.log('Why am I here?');
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
            };
            self.hideLoadingScreen();
          });

            // hide the loading screen

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

        self.interests = ko.observableArray([
          {
            interestTitle: "Animals",
            interestImage: "url(/static/img/animals-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Automotive",
            interestImage: "url(/static/img/automotive-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Beauty & Personal Care",
            interestImage: "url(/static/img/beauty-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Children & Family",
            interestImage: "url(/static/img/family-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Education & Books",
            interestImage: "url(/static/img/books-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Entertainment & Events",
            interestImage: "url(/static/img/events-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Fashion",
            interestImage: "url(/static/img/fashion-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Food & Drink",
            interestImage: "url(/static/img/food-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Health, Fitness & Sport",
            interestImage: "url(/static/img/health-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Home & Garden",
            interestImage: "url(/static/img/garden-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Photography, Art & Design",
            interestImage: "url(/static/img/art-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Restaurants, Bars & Hotels",
            interestImage: "url(/static/img/bars-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Social-Enterprise and Not-For-Profit",
            interestImage: "url(/static/img/non-profit-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Social media, Web & Tech",
            interestImage: "url(/static/img/tech-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          },
          {
            interestTitle: "Travel & Destinations",
            interestImage: "url(/static/img/travel-interest.png)",
            classInterestName: ko.observable("interest-checked-layer")
          }
        ]);

        self.setUpEditProfileInterests = function() {
          for (var i = 0; i < self.interests().length; i++) {
            for (var j = 0; j < self.influencerInterestList().length; j++) {
              if (self.influencerInterestList()[j].interestText == self.interests()[i].interestTitle) {
                self.interests()[i].classInterestName('interest-checked-layer-show');
              } else {
              }
            }
          };
        };

        self.hideLoadingScreen = function() {
          $profileLoadingScreen.fadeOut();
        };

  // Set up the view with the data from the database

        // Set the height of the profile image to the width

        var imageWidth = $('.influencer-profile-image-container img').width();
        $('.influencer-profile-image-container img').css({'height':imageWidth+'px'});

        // Handle the accept / deny buttons and pop up
        self.showAcceptDenyButtons = ko.observable(false);
        self.showUploadProofButton = ko.observable(false);
        self.showCloseDeatilsButton = ko.observable(false);

        var currentOpenOrderIndex;

        self.openNewOrder = function acceptDenyButtonClicked(index, currentOrder) {
          currentOpenOrderIndex = index;

          self.currentOpenBrandName(currentOrder.businessName);
          self.currentOpenConentFromInfluencer(currentOrder.contentInfo);
          self.currentOpenCampaignPrice(currentOrder.price);
          self.currentOpenPostingType(currentOrder.postingRequirement);
          self.currentOpenConentFromInfluencer(currentOrder.contentInfo);
          self.currentOpenBusinessID(currentOrder.business);
          self.currentOpenOrderDeadline(currentOrder.deadline);
          self.currentOpenCampaignID(currentOrder.campaignID);

          $currentOrderContainer.fadeIn();
          $('body').css('overflow','hidden');

          self.showAcceptDenyButtons(true);
          self.showUploadProofButton(false);
          self.showCloseDeatilsButton(false);

        };

        self.openCurrentOrder = function detailsButtonClicked(index, currentOrder) {

          self.currentOpenBrandName(currentOrder.businessName);
          self.currentOpenConentFromInfluencer(currentOrder.contentInfo);
          self.currentOpenCampaignPrice(currentOrder.price);
          self.currentOpenPostingType(currentOrder.postingRequirement);
          self.currentOpenConentFromInfluencer(currentOrder.contentInfo);
          self.currentOpenBusinessID(currentOrder.business);
          self.currentOpenOrderDeadline(currentOrder.deadline);
          self.currentOpenCampaignID(currentOrder.campaignID);

          $currentOrderContainer.fadeIn();
          $('body').css('overflow','hidden');
          self.showAcceptDenyButtons(false);
          self.showUploadProofButton(true);
          self.showCloseDeatilsButton(false);
        };

        self.openPreviousOrder = function previousOrderClicked(index, currentOrder) {
          self.currentOpenBrandName(currentOrder.businessName);
          self.currentOpenConentFromInfluencer(currentOrder.contentInfo);
          self.currentOpenCampaignPrice(currentOrder.price);
          self.currentOpenPostingType(currentOrder.postingRequirement);
          self.currentOpenConentFromInfluencer(currentOrder.contentInfo);
          self.currentOpenBusinessID(currentOrder.business);
          self.currentOpenOrderDeadline(currentOrder.deadline);
          self.currentOpenCampaignID(currentOrder.campaignID);

          $currentOrderContainer.fadeIn();
          $('body').css('overflow','hidden');
          self.showAcceptDenyButtons(false);
          self.showUploadProofButton(false);
          self.showCloseDeatilsButton(true);
        };

        self.completeCurrentOrder = function() {
          $('.influencer-profile-orders-container').animate({
             scrollTop: 0
          }, function(){
            $currentOrderContainer.fadeOut();
            $('body').css('overflow','scroll');
          });
        };

        self.closeCurrentOrder = function closeButtonClicked() {
          $('.influencer-profile-orders-container').animate({
             scrollTop: 0
          }, function(){
            $currentOrderContainer.fadeOut();
            $('body').css('overflow','scroll');
          });
        };

        var denyIterator = 0;
        self.denyOrderText = ko.observable('');
        self.showDenyOrderError = ko.observable(false);
        self.denyOrder = function denyButtonClicked() {
          if (denyIterator == 0) {
            // Slide down the text area
            $('.accept-deny-buttons-container').css('display','none');
            $('.deny-text-container').slideDown();
            denyIterator = denyIterator + 1;
          } else if (self.denyOrderText() != '' && denyIterator == 1) {
            // Save the information back to firebase
            firebase.database().ref('campaigns/' + self.currentOpenCampaignID()).update({denied: true, deniedText: self.denyOrderText()});
            firebase.database().ref('campaigns/' + self.currentOpenCampaignID() + "/influencers/" + userID).update({active: false, activeInfluencer: false});
            location.reload();
            denyIterator = denyIterator + 1;
          } else {
            self.showDenyOrderError(true);
          }

        };

        self.cancelDenyOrder = function cancelDenyButtonClicked() {
          $('.deny-text-container').slideUp();
          $('.accept-deny-buttons-container').css('display','block');
          denyIterator = 0;
        };

        self.approveOrder = function approveOrderButtonClicked() {
          firebase.database().ref('campaigns/' + self.currentOpenCampaignID()).update({active: true});
          firebase.database().ref('campaigns/' + self.currentOpenCampaignID() + "/influencers/" + userID).update({active: true});

          location.reload();
          // $('.influencer-profile-orders-container').animate({
          //    scrollTop: 0
          // }, function(){
          //   $currentOrderContainer.fadeOut();
          //   $('body').css('overflow','scroll');
          // });

        };

        // Operations once the view has been populated with the data

        self.showFileInputWindow = function() {
          $profileImageFileInput.click();
        };

        self.uploadProfileImage = function(image) {
          readProfileImageURL(image);
        };

        // Load the image from the invisible file input for the profile image
        var newProfileImageString = '';
        function readProfileImageURL(image) {
          var reader = new FileReader();

          reader.onload = function (e) {
            self.profileImage(e.target.result);
            newProfileImageString = e.target.result.replace('data:image/jpeg;base64,','');
            newProfileImageString = newProfileImageString.replace('data:image/png;base64,','');

            self.showAddProfilePicText(false);
            self.showProfileSavedButton(true);
          }

          reader.readAsDataURL(image);

          var imageWidth = $('.influencer-profile-image-container img').width();
          $('.influencer-profile-image-container img').css({'height':imageWidth+'px'});
        }

        self.saveProfileImageBackToFirebase = function saveProfileImageButtonClicked() {
          var storageRef = firebase.storage().ref();
          var influencersRef = storageRef.child('influencers/' + userID);
          influencersRef.putString(newProfileImageString, 'base64').then(function(snapshot) {
            console.log(snapshot.downloadURL);
            self.showProfileSavedButton(false);
            var isUserInformationComplete = false;
            if (self.influencerDescription() != '' && self.influencerLocation() != '') {
              isUserInformationComplete = true;
            }
            if ( self.influencerProfileImageLocation() == '' ) {
              var profilePictureUpdates = {
                pictureLocation: snapshot.downloadURL,
                profileCompleted: isUserInformationComplete
              }
              firebase.database().ref('influencers/' + userID).update(profilePictureUpdates);
            } else {
              var profilePictureUpdates = {
                pictureLocation: snapshot.downloadURL
              }
              firebase.database().ref('influencers/' + userID).update(profilePictureUpdates);
            }
          });
        };

        self.checkIfUserProfileIsFinished = function() {

        };

        self.daysOptionsList = ko.observableArray([]);
        self.yearOptionsList = ko.observableArray([]);

        for(var i = 1; i < 32; i++) {
          self.daysOptionsList.push({dayNumber: i});
        }

        for(var i = 2017; i > 1900; i--) {
          self.yearOptionsList.push({yearNumber: i});
        }

        self.registerInfluencerEmailNotValidated = ko.observable(false);
        self.influencerEmailValidated            = ko.observable(true);

        self.influencerEmailTyping = function() {
            if (validateEmail(self.influencerEmail())) {
              self.registerInfluencerEmailNotValidated(false);
              self.influencerEmailValidated(true);
            } else {
              self.registerInfluencerEmailNotValidated(true);
              self.influencerEmailValidated(false);
            }
        };

        self.firstNameNotValidated = ko.observable(false);
        self.firstNameValidated    = ko.observable(true);

        self.influencerFirstNameTyping = function() {
          if (self.influencerFirstName().length > 1) {
            self.firstNameNotValidated(false);
            self.firstNameValidated(true);
          } else {
            self.firstNameNotValidated(true);
            self.firstNameValidated(false);
          }
        };

        self.lastNameNotValidated = ko.observable(false);
        self.lastNameValidated    = ko.observable(true);

        self.influencerLastNameTyping = function() {
          if (self.influencerLastName().length > 1) {
            self.lastNameNotValidated(false);
            self.lastNameValidated(true);
          } else {
            self.lastNameNotValidated(true);
            self.lastNameValidated(false);
          }
        };

        self.passwordNotValidated = ko.observable(false);
        self.passwordValidated    = ko.observable(true);

        self.influencerPasswordTyping = function() {
          if (self.influencerPassword().length > 5) {
            self.passwordNotValidated(false);
            self.passwordValidated(true);
          } else {
            self.passwordNotValidated(true);
            self.passwordValidated(false);
          }
        };

        self.phoneNumberNotValidated = ko.observable(false);
        self.phoneNumberValidated    = ko.observable(true);

        self.influencerPhoneTyping = function() {
            if (validatePhoneNumber(self.influencerPhoneNumber())) {
              self.phoneNumberNotValidated(false);
              self.phoneNumberValidated(true);
            } else {

              self.phoneNumberNotValidated(true);
              self.phoneNumberValidated(false);
            }
        };

        self.showLocationErrorMessage = ko.observable(false);
        self.influencerLocationBlur = function() {
          if (self.influencerLocation().length < 5) {
            self.showLocationErrorMessage(true);
          } else {
            self.showLocationErrorMessage(false);
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
          if (self.influencerEmailValidated() && self.firstNameValidated() && self.lastNameValidated() && self.phoneNumberValidated() && self.influencerBirthMonth() != '' && self.influencerBirthDay() != '' && self.influencerBirthYear() != '' && !(self.showLocationErrorMessage()) && !(self.influencerDescriptionNotValidated())) {
            self.accountCreationFormNotValidated(false);
            return true;
          } else {
            self.accountCreationFormNotValidated(true);
          }
        };

        self.selectInterest = function interestClickedOn( d, e ) {

          let $target = $( e.target );

          let inArray = $target.hasClass('interest-checked-layer-show');

          $target.toggleClass('interest-checked-layer-show');

          if ( !inArray ) {
            const currentInterestText = d.interestTitle;
            var editedCurrentInterestText = currentInterestText.replace(/ /g,'');
            editedCurrentInterestText = editedCurrentInterestText.replace(/,/g,'');
            editedCurrentInterestText = editedCurrentInterestText.replace(/&/g, '');

            const interest = {
              interestText: currentInterestText,
              interestClass: editedCurrentInterestText.toLowerCase()
            };
            self.influencerInterestList.push( interest );
          }

          if ( inArray ) {
            $target.addClass('interest-checked-layer');
            const currentInterestText = d.interestTitle;

            for (var i = 0; i < self.influencerInterestList().length; i++) {
              if (self.influencerInterestList()[i].interestText == currentInterestText) {
                self.influencerInterestList.splice(i, 1);
              }
            };

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
          if (self.checkUserEntries()) {
            $influencerAccountInformationContainer.fadeOut(function() {
              $influencerFurtherInformationContainer.fadeIn();
              $influencerSignUpSection.scrollTop('fast');
            });
          }
        };;

        self.finishSavingInfluencerInformation = function() {

          // Set the influencer interest list back to the database format
          var influencerTextList = [];
          for (var i = 0; i < self.influencerInterestList().length; i++) {
            influencerTextList.push(self.influencerInterestList()[i].interestText);
          };

          // Check to see if the influecners data is good to go or not

          var isUserInformationComplete = false;

          if (self.influencerProfileImageLocation().length > 0) {
            isUserInformationComplete = true;
          };

          // Save back the data for the influencer

          firebase.database().ref('influencers/' + userID).set({
            email: self.influencerEmail(),
            name: self.influencerFirstName() + ' ' + self.influencerLastName(),
            phone: self.influencerPhoneNumber(),
            location: self.influencerLocation(),
            aboutMe: self.influencerDescription(),
            birthday: self.influencerBirthMonth() + ' ' + self.influencerBirthDay() + ', ' + self.influencerBirthYear(),
            gender: self.influencerGender(),
            interests: influencerTextList,
            tags: self.influencerTagList(),
            profileCompleted: isUserInformationComplete,
            instagram: self.influencerInstagramName(),
            pictureLocation: self.influencerProfileImageLocation(),
            profileReviewed: true,
            showtPrice: self.influencerShowtPrice(),
            showtReach: self.influencerShowtReach(),
            showtScore: self.influencerShowtScore(),
            showtEngagement: self.influencerShowtEngagement()
          }).then(function() {

            // Update the email for the user
            user.updateEmail(self.influencerEmail()).then(function() {
              // Update successful.
              $influencerFurtherInformationContainer.fadeOut(function() {
                $influencerInformationSavedContainer.fadeIn();
              });
            }, function(error) {
              // An error happened.
              $influencerFurtherInformationContainer.fadeOut(function() {
                $influencerInformationSavedContainer.fadeIn();
              });
            });
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

})); // End of use strict
