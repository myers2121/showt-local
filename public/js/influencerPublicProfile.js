I(function($) {

  function influencerPublicProfileViewModel() {

      var self = this;

      const $activeProfileButton = $('.active-profile-link');
      const $inactiveProfileButton = $('.inactive-profile-link');
      const $aboutInformationContainer = $('.influencer-about-information-container');
      const $workInformationContainer = $('.influencer-work-information-container');

      const userID = location.href.substr(location.href.lastIndexOf('/') + 1);

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
        location.href = '/business/dashboard/create-campaign?influencer=' + userID;
      };
  };

  var influencerPublicProfileObjectVm = new influencerPublicProfileViewModel();
  ko.cleanNode($('#influencer-public-profile-section')[0]);
  ko.applyBindings(influencerPublicProfileObjectVm,$("#influencer-public-profile-section")[0]);

})(jQuery); // End of use strict
