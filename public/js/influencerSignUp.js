(function($) {

  function InfluencerSignUpViewModel() {

      var self = this;
      self.influencerEmail = ko.observable('');
      self.influencerFirstName = ko.observable('');
      self.influencerLastName = ko.observable('');
      self.influencerPassword = ko.observable('');
      self.influencerPhoneNumber = ko.observable('');
      self.influencerBirthMonth = ko.observable('');
      self.influencerBirthDay = ko.observable('');
      self.influencerBirthYear = ko.observable('');
      self.influencerInstagramName = ko.observable('');
      self.influencerTagList = ko.observableArray([]);
      self.influencerInterestList = ko.observableArray([]);
      self.currentTag = ko.observable('');
      self.gender = ko.observable('');

      self.daysOptionsList = ko.observableArray([]);
      self.yearOptionsList = ko.observableArray([]);

      for(var i = 1; i < 32; i++) {
        self.daysOptionsList.push({dayNumber: i});
      }

      for(var i = 2017; i > 1900; i--) {
        self.yearOptionsList.push({yearNumber: i});
      }

      self.interests = ko.observableArray([
        {
          interestTitle: "Animals",
          interestImage: "url(/static/img/animals-interest.png)"
        },
        {
          interestTitle: "Automotive",
          interestImage: "url(/static/img/automotive-interest.png)"
        },
        {
          interestTitle: "Beauty & Personal Care",
          interestImage: "url(/static/img/beauty-interest.png)"
        },
        {
          interestTitle: "Children & Family",
          interestImage: "url(/static/img/family-interest.png)"
        },
        {
          interestTitle: "Education & Books",
          interestImage: "url(/static/img/books-interest.png)"
        },
        {
          interestTitle: "Entertainment & Events",
          interestImage: "url(/static/img/events-interest.png)"
        },
        {
          interestTitle: "Fashion",
          interestImage: "url(/static/img/fashion-interest.png)"
        },
        {
          interestTitle: "Food & Drink",
          interestImage: "url(/static/img/food-interest.png)"
        },
        {
          interestTitle: "Health, Fitness & Sport",
          interestImage: "url(/static/img/health-interest.png)"
        },
        {
          interestTitle: "Home & Garden",
          interestImage: "url(/static/img/garden-interest.png)"
        },
        {
          interestTitle: "Photography, Art & Design",
          interestImage: "url(/static/img/art-interest.png)"
        },
        {
          interestTitle: "Restaurants, Bars & hotels",
          interestImage: "url(/static/img/bars-interest.png)"
        },
        {
          interestTitle: "Social-Enterprise and Not-For-Profit",
          interestImage: "url(/static/img/non-profit-interest.png)"
        },
        {
          interestTitle: "Social media, Web & Tech",
          interestImage: "url(/static/img/tech-interest.png)"
        },
        {
          interestTitle: "Travel & Destinations",
          interestImage: "url(/static/img/travel-interest.png)"
        }
      ]);

      const $createAccountForm = $('.influencer-account-form-container');
      const $influencerInformationForm = $('.influencer-information-sign-up-form-container');
      const $maleButton = $('.male-button');
      const $femaleButton = $('.female-button');
      const $backToWebsiteButton = $('.back-to-website-button');

      $backToWebsiteButton.click(function() {
        $('#influencer-sign-up-section').fadeOut();
        $('body').css('overflow','auto');
      });

      self.signUpUserButtonClicked = function() {
        if (self.checkUserEntries()) {
          $createAccountForm.fadeOut(function() {
            $influencerInformationForm.fadeIn();
          });
        }
      };

      $maleButton.click(function() {
        $(this).addClass('gender-button-clicked');
        $femaleButton.removeClass('gender-button-clicked');
        self.gender('Male');
      });

      $femaleButton.click(function() {
        $(this).addClass('gender-button-clicked');
        $maleButton.removeClass('gender-button-clicked');
        self.gender('Female');
      });

      $('body').on('click', '.interest-wrapper',function() {
        var currentItem = $(this).children()[2];
        $(currentItem).toggleClass('interest-checked-layer-show');
      });

      self.addInfluencerTag = function addTagToInfluencerList() {
        self.influencerTagList.push({interestTitle: self.currentTag()});
        self.currentTag('');
      };

      self.deleteTagFromList = function deleteTagFromInfluencerList(index) {
        self.influencerTagList.remove(self.influencerTagList()[index]);
      };

      self.addInterestTypeToList = function addInterestToInfluencerList(index) {
        var indexToRemove = 0;
        if (self.influencerInterestList().length > 0) {
          // self.influencerInterestList.push({interestTitle: self.interests()[index].interestTitle});
          for (var i = 0; i < self.influencerInterestList().length; i++) {
            if (self.influencerInterestList()[i].interestTitle == self.interests()[index].interestTitle) {
              var indexToRemove = i;
            }
          }
          if (indexToRemove > 0) {
            self.influencerInterestList.remove(self.influencerInterestList()[indexToRemove]);
          } else {
            self.influencerInterestList.push({interestTitle: self.interests()[index].interestTitle});
          }
        } else {
          self.influencerInterestList.push({interestTitle: self.interests()[index].interestTitle});
        }
      };

      self.registerInfluencerEmailNotValidated = ko.observable(false);
      self.influencerEmailValidated = ko.observable(false);
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
      self.firstNameValidated = ko.observable(false);
      self.influencerFirstNameTyping = function() {
        if (self.influencerFirstName().length > 1) {
          self.firstNameNotValidated(false);
          self.firstNameValidated(true);
        } else {
          self.firstNameNotValidated(true);
        }
      };

      self.lastNameNotValidated = ko.observable(false);
      self.lastNameValidated = ko.observable(false);
      self.influencerLastNameTyping = function() {
        if (self.influencerLastName().length > 1) {
          self.lastNameNotValidated(false);
          self.lastNameValidated(true);
        } else {
          self.lastNameNotValidated(true);
        }
      };

      self.passwordNotValidated = ko.observable(false);
      self.passwordValidated = ko.observable(false);
      self.influencerPasswordTyping = function() {
        if (self.influencerPassword().length > 5) {
          self.passwordNotValidated(false);
          self.passwordValidated(true);
        } else {
          self.passwordNotValidated(true);
        }
      };

      self.phoneNumberNotValidated = ko.observable(false);
      self.phoneNumberValidated = ko.observable(false);
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

      self.accountCreationFormNotValidated = ko.observable(false);

      self.checkUserEntries = function() {
        if (self.influencerEmailValidated() && self.firstNameValidated() && self.lastNameValidated() && self.passwordValidated() && self.phoneNumberValidated() && self.influencerBirthMonth() != '' && self.influencerBirthDay() != '' && self.influencerBirthYear() != '') {
          self.accountCreationFormNotValidated(false);
          return true;
        } else {
          self.accountCreationFormNotValidated(true);
        }
      }

      self.accountInfoNotValidated = ko.observable(false);
      self.saveInformationUserButtonClicked = function() {
        if (self.gender() != '' && self.influencerInstagramName() != '') {
          $('.influencer-information-sign-up-form-container').fadeOut(function() {
            $('.influencer-finish-sign-up-form-container').fadeIn();
          });
          self.accountInfoNotValidated(false);
        } else {
          self.accountInfoNotValidated(true);
        }
      };


  };

  var influencerSignUpObjectVm = new InfluencerSignUpViewModel();
  ko.cleanNode(document.getElementById("influencer-sign-up-section"))
  ko.applyBindings(influencerSignUpObjectVm,document.getElementById("influencer-sign-up-section"));

  $('#influencer-sign-up-section').on('click', function(e) {
    if (e.target == this)
      $('#influencer-sign-up-section').fadeOut();
      $('body').css('overflow','auto');
  });

})(jQuery); // End of use strict
