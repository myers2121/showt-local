$(document).ready(function(){

  var ref = new Firebase("https://passenger-app.firebaseio.com/");
  var authData = ref.getAuth();
  var loggedInMerchantEmail = authData.auth.token.email;

  function DashboardViewModel() {

    var self = this;

    self.currentMerchantName = ko.observable("");
    self.currentMerchantCrossStreets = ko.observable("");
    self.currentCompanyDescription = ko.observable("");
    self.currentMerchantImage = ko.observable("");

    self.currentMerchantRewardOfferings = ko.observableArray("");

    self.rewardName = ko.observable("");
    self.rewardDescription = ko.observable("");
    self.rewardPrice = ko.observable("");
    self.rewardImage = ko.observable("");

    self.editRewardName = ko.observable("");
    self.editRewardDescription = ko.observable("");
    self.editRewardPrice = ko.observable("");
    self.editRewardImage = ko.observable("");

    self.editRewardButtonClicked = function(data) {
      self.editRewardName(data.rewardsName);
      self.editRewardDescription(data.rewardDescription);
      self.editRewardPrice(data.rewardPrice);
      self.editRewardImage(data.rewardImage);

      $('#edit-reward-container').fadeIn();
    };

    self.chooseImageButtonClicked = function() {
      console.log("Image button clicked");
    };

    self.cancelRewardButtonClicked = function() {
      $('#create-reward-container').fadeOut();
      self.rewardName("");
      self.rewardDescription("");
      self.rewardPrice("");
    };

    self.saveRewardButtonClicked = function() {
      console.log("Save button clicked");
    };

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
    ];

    var rewardsRef = new Firebase("https://passenger-app.firebaseio.com/rewards");
    var currentMerchant;

    rewardsRef.orderByChild("email").equalTo(loggedInMerchantEmail).on("value", function(snapshot) {
      currentMerchant = snapshot.val();
      var rewards = currentMerchant[0].rewards;

      self.currentMerchantName(currentMerchant[0].companyName);
      self.currentMerchantCrossStreets(currentMerchant[0].crossStreets);
      var imageSrc = 'data:image/png;base64,' + currentMerchant[0].companyImage;
      self.currentMerchantImage(imageSrc);

      for (var i = 0; i < rewards.length; i++) {
        var src = 'data:image/png;base64,' + rewards[i].rewardImage;

        var currentReward = {
          "imgSrc": src,
          "pointCost": rewards[i].pointCost,
          "rewardDescription": rewards[i].rewardDescription,
          "rewardsName": rewards[i].rewardsName,
          "rewardPrice": rewards[i].rewardPrice
        }

        self.currentMerchantRewardOfferings.push(currentReward);

      }

      $('html').css('overflow-y','auto');
      $('#loading-section').fadeOut();

    });

  };

  var dashboardObjectVM = new DashboardViewModel();
  ko.applyBindings(dashboardObjectVM,$("#edit-reward-container")[0]);
  ko.applyBindings(dashboardObjectVM,$("#create-reward-container")[0]);
  ko.applyBindings(dashboardObjectVM,$("#home-section")[0]);
  ko.applyBindings(dashboardObjectVM,$("#rewards-section")[0]);
  ko.applyBindings(dashboardObjectVM,$("#pay-section")[0]);


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

  $('.edit-information-button').click(function() {
    $('#home-feedback-section').fadeIn();
  });

  $('.add-reward-button-container').click(function() {
    $('#create-reward-container').fadeIn();
  });

});
