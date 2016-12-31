(function($) {

  function BusinessSignUpViewModel() {

      var self = this;

      const $businessAccountFormContainer = $('.business-information-account-creation-container');
      const $businessAccountInfoFormContainer = $('.influencer-information-sign-up-form-container');

      // Form validation observables

      self.influencerInstagramName = ko.observable('');

      self.businessSignUpEmail = ko.observable('');
      self.businessSignUpEmailNotValidated = ko.observable(false);
      self.businessSignUpEmailValidated = ko.observable(false);
      self.businessSignUpEmailTyping = function() {
        if (self.businessSignUpEmail().length > 0) {
          if (validateEmail(self.businessSignUpEmail())) {
            self.businessSignUpEmailNotValidated(false);
            self.businessSignUpEmailValidated(true);
          } else {
            self.businessSignUpEmailNotValidated(true);
          }
        }
      };

      self.businessSignUpFirstName = ko.observable('');
      self.businessSignUpNameNotValidated = ko.observable(false);
      self.businessSignUpNameValidated = ko.observable(false);
      self.businessSignUpFirstNameTyping = function() {
        if (self.businessSignUpFirstName().length > 1) {
          self.businessSignUpNameNotValidated(false);
          self.businessSignUpNameValidated(true);
        } else {
          self.businessSignUpNameNotValidated(true);
        }
      };

      self.businessSignUpLastName = ko.observable('');
      self.businessSignUpLastNameNotValidated = ko.observable(false);
      self.businessSignUpLastNameValidated = ko.observable(false);
      self.businessSignUpLastNameTyping = function() {
        if (self.businessSignUpLastName().length > 1) {
          self.businessSignUpLastNameNotValidated(false);
          self.businessSignUpLastNameValidated(true);
        } else {
          self.businessSignUpLastNameNotValidated(true);
        }
      };

      self.businessSignUpPassword = ko.observable('');
      self.businessSignUpPasswordNotValidated = ko.observable(false);
      self.businessSignUpPasswordValidated = ko.observable(false);
      self.businessSignUpPasswordTyping = function() {
        if (self.businessSignUpPassword().length > 5) {
          self.businessSignUpPasswordNotValidated(false);
          self.businessSignUpPasswordValidated(true);
        } else {
          self.businessSignUpPasswordNotValidated(true);
        }
      };

      self.businessSignUpBusinessName = ko.observable('');
      self.businesSignUpBusinessnameNotValidated = ko.observable(false);
      self.businesSignUpBusinessNameValidated = ko.observable(false);
      self.businessSignUpBusinessNameTyping = function() {
        if (self.businessSignUpBusinessName().length > 3) {
          self.businesSignUpBusinessnameNotValidated(false);
          self.businesSignUpBusinessNameValidated(true);
        } else {
          self.businesSignUpBusinessnameNotValidated(true);
        }
      };

      self.businessSignUpPhoneNumber = ko.observable('');
      self.businessSignUpPhoneNumberNotValidated = ko.observable(false);
      self.businessSignUpPhoneNumberValidated = ko.observable(false);
      self.businessSignUpPhoneTyping = function() {
        if (self.businessSignUpPhoneNumber().length > 0) {
          if (validatePhoneNumber(self.businessSignUpPhoneNumber())) {
            self.businessSignUpPhoneNumberNotValidated(false);
            self.businessSignUpPhoneNumberValidated(true);
          } else {

            self.businessSignUpPhoneNumberNotValidated(true);
          }
        } else {
          self.businessSignUpPhoneNumberNotValidated(true)
        }
      };

      self.influencerTagList = ko.observableArray([]);
      self.influencerInterestList = ko.observableArray([]);
      self.currentTag = ko.observable('');

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

      self.addInfluencerTag = function addTagToInfluencerList() {
        self.influencerTagList.push({interestTitle: self.currentTag()});
        self.currentTag('');
      };

      self.deleteTagFromList = function deleteTagFromInfluencerList(index) {
        self.influencerTagList.remove(self.influencerTagList()[index]);
      };

      self.accountInfoNotValidated = ko.observable(false);

      self.businessAccountCreationFormNotValidated = ko.observable(false);
      self.businessSignUpButtonClicked = function() {
        if (self.businessSignUpEmailValidated() && self.businessSignUpNameValidated() && self.businessSignUpLastNameValidated() && self.businessSignUpPasswordValidated() && self.businesSignUpBusinessNameValidated() && self.businessSignUpPhoneNumberValidated()) {
          $('#business-sign-up-business-section').scrollTop();
          $businessAccountFormContainer.fadeOut(function() {
            $businessAccountInfoFormContainer.fadeIn();
          });
        } else {
          self.businessAccountCreationFormNotValidated(true);
        }

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

      $('body').on('click', '.interest-wrapper',function() {
        var currentItem = $(this).children()[2];
        $(currentItem).toggleClass('interest-checked-layer-show');
      });

      self.saveInformationUserButtonClicked = function() {
        if (self.influencerInstagramName() != '') {
          location.href = '/business/dashboard';
          self.accountInfoNotValidated(false);
        } else {
          self.accountInfoNotValidated(true);
        }
      };

  };

  var businessSignUpObjectVm = new BusinessSignUpViewModel();
  ko.cleanNode($('#business-sign-up-business-section')[0]);
  ko.applyBindings(businessSignUpObjectVm,$("#business-sign-up-business-section")[0]);

})(jQuery); // End of use strict
