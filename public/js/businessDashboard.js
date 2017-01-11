(function($) {

  function BusinessDashboardViewModel() {

      var self = this;

      self.currentCampaigns = ko.observableArray(["1","1","1"]);
      self.previousCampaigns = ko.observableArray(["1","1","1"]);
      self.businessTagList = ko.observableArray([])

      const $createLink = $('.create-campaign-link');
      const $createCampaignSection = $('#create-campaign-section');
      const $businessDropdownContainer = $('.business-dropdown-container');
      const $editBusinessInformationSection = $('#edit-business-info-section');
      const $businessAccountInformationContainer = $('.business-edit-account-info');
      const $businessFurtherInformationContainer = $('.business-edit-business-information');
      const $businessInfluencerInfoContainer = $('.business-campaign-influencers-container');
      const $businessCampaignMoneySpentContainer = $('.business-campaign-money-spent-container');

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

      self.showCreateCampaignContainer = function() {
        location.href = '/hire-influencers';
      };

      self.sendHome = function() {
        location.href = '/';
      };

      self.sendToHelpPage = function() {
        location.href = '/help';
      };

      self.showBusinessDropDown = function() {
        $('.business-dropdown-container').slideToggle();
      };

      self.showEditBusinessInformationContainer = function() {
        $businessDropdownContainer.fadeOut();
        $editBusinessInformationSection.fadeIn();
        $('body').css('overflow','hidden');
      };

      self.signOutBusinessUser = function() {
        location.href = '/business/login';
      };

      self.showBusinessFurtherInfoContainer = function continueButtonClicked() {
        $('#edit-business-info-section').scrollTop(0);
        $businessAccountInformationContainer.fadeOut(function() {
          $businessFurtherInformationContainer.fadeIn();

        });
      };

      self.hideEditBusinessInformationSection = function(d,e) {
        const currentTarget = e.toElement;
        const currentTargetId = $(currentTarget).attr('id');
        if (currentTargetId == 'edit-business-info-section') {
          $editBusinessInformationSection.fadeOut();
          $('body').css('overflow','scroll');
        }
      };

      self.showInterestCheckLayer = function interestTypeClicked(d,e) {
        const currentTarget = e.currentTarget;
        const currentItem = currentTarget.children[2];
        $(currentItem).toggleClass('interest-checked-layer-show');
      };

      self.addInterestTypeToList = function interestTypeClicked() {

      };

      self.addBusinessTag = function addTagButtonClicked() {

      };

      self.saveBusinessInformation = function saveButtonClicked() {

      };

      self.showInfluencerCountContainer = function() {
        $businessInfluencerInfoContainer.fadeIn();
        $('body').css('overflow','hidden');
      };

      self.showAmountSpentContainer = function() {
        $businessCampaignMoneySpentContainer.fadeIn();
        $('body').css('overflow','hidden');
      };

      self.exitInfluencersPopUp = function exitInfluencersPopUpButtonClicked() {
        $businessInfluencerInfoContainer.fadeOut(function() {
          $('body').css('overflow','scroll');
        });
      };

      self.exitCampaignSpentPopUp = function() {
        $businessCampaignMoneySpentContainer.fadeOut(function() {
          $('body').css('overflow','scroll');
        });
      };
  };

  var businessDashboardObjectVm = new BusinessDashboardViewModel();
  ko.applyBindings(businessDashboardObjectVm,$("#business-dashboard-home-section")[0]);
  ko.applyBindings(businessDashboardObjectVm,$("#edit-business-info-section")[0]);

})(jQuery); // End of use strict
