(function($) {

  function BusinessDashboardViewModel() {

      var self = this;

      self.currentCampaigns = ko.observableArray(["1","1","1"]);
      self.previousCampaigns = ko.observableArray(["1","1","1"]);

      const $homeLink = $('.home-link');
      const $helpLink = $('.help-page-link');
      const $createLink = $('.create-campaign-link');
      const $createCampaignSection = $('#create-campaign-section');

      self.showCreateCampaignContainer = function() {
        console.log('hello');
        $createCampaignSection.fadeIn();
        $('body').css('overflow','hidden');
      };

      self.showBusinessDropDown = function() {
        $('.business-dropdown-container').slideToggle();
      };

      self.showEditBusinessInformationContainer = function() {
        console.log("Edit");
      };

      self.signOutBusinessUser = function() {
        location.href = '/business/login';
      };
  };

  var businessDashboardObjectVm = new BusinessDashboardViewModel();
  ko.applyBindings(businessDashboardObjectVm,$("#business-dashboard-home-section")[0]);

})(jQuery); // End of use strict
