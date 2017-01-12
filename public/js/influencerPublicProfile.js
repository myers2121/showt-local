(function($) {

  function InfluencerPublicProfileViewModel() {

      var self = this;

      const instagramID = location.href.substr(location.href.lastIndexOf('/') + 1);

      console.log(instagramID);

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

      const $activeProfileButton = $('.active-profile-link');
      const $inactiveProfileButton = $('.inactive-profile-link');
      const $aboutInformationContainer = $('.influencer-about-information-container');
      const $workInformationContainer = $('.influencer-work-information-container');
      const $profileLoadingScreen  = $('.influencer-loading-screen');

      // Query in all of the users information
      var influencersRef = firebase.database().ref('influencers');
      influencersRef.orderByChild("instagram").equalTo(instagramID).on("child_added", function(snapshot) {

          var userID = snapshot.key;


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

          if (self.influencerProfileImageLocation() == "") {
            self.profileImage('/static/img/profile-add-camera.png');
            self.showAddProfilePicText(true);
            self.hideLoadingScreen();
          } else {
            // Perform the login to take down the image from firebase
            var storage = firebase.storage();
            var influencersPathRef = storage.ref('influencers/' + userID);
            influencersPathRef.getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            self.profileImage(url);
            // Or inserted into an <img> element:
            // var img = document.getElementById('myimg');
            // img.src = url;
            self.showAddProfilePicText(false);
            self.hideLoadingScreen();
          }).catch(function(error) {
            // Handle any errors
            self.hideLoadingScreen();
          });

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

      });

      self.hideLoadingScreen = function() {
        $profileLoadingScreen.fadeOut();
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

      self.hireMeButtonClicked = function() {
        location.href = '/hire-influencers?influencer=' + instagramID;
      };
  };

  var influencerPublicProfileObjectVm = new InfluencerPublicProfileViewModel();
  ko.cleanNode($('#influencer-public-profile-section')[0]);
  ko.applyBindings(influencerPublicProfileObjectVm,$("#influencer-public-profile-section")[0]);

})(jQuery); // End of use strict
