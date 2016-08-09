$(document).ready(function(){

  function DashboardViewModel() {

    var self = this;

    self.currentMerchantStats = [
      {
        imgSrc: "/static/img/medal.png",
        stat: 312,
        statText: "Rewards Redeemed"
      },
      {
        imgSrc: "/static/img/eye.png",
        stat: 2009,
        statText: "Rewards Viewed"
      },
      {
        imgSrc: "/static/img/user.png",
        stat: 51,
        statText: "New Customers"
      }
    ]

  };

  var dashboardObjectVM = new DashboardViewModel();
  ko.applyBindings(dashboardObjectVM,$("#home-section")[0]);

  $( ".inner-home-container" ).hover(
    function() {
      $('.edit-home-information-image').css('display','block');
    }, function() {
      $('.edit-home-information-image').css('display','none');
    }
  );

  $('.cancel-button').click(function() {
    $('#home-feedback-section').fadeOut();
  });

  $('.edit-home-information-image').click(function() {
    $('#home-feedback-section').fadeIn();
  });

});
