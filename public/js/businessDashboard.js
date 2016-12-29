(function($) {

  function BusinessDashboardViewModel() {

      var self = this;

      self.currentCampaigns = ko.observableArray(["1","1","1"]);
      self.previousCampaigns = ko.observableArray(["1","1","1"]);
  };


  var businessDashboardObjectVm = new BusinessDashboardViewModel();
  var element = $('#business-dashboard-home-section')[0]; 
  ko.cleanNode(element);
  ko.applyBindings(businessDashboardObjectVm,$("#business-dashboard-home-section")[0]);

})(jQuery); // End of use strict
