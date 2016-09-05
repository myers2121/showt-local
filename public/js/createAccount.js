$(document).ready(function(){

  var ref = new Firebase("https://passenger-app.firebaseio.com/");
  var merchantsRef = new Firebase("https://passenger-app.firebaseio.com/rewards");

  function CreateAccountViewModel() {

    var self = this;

    self.businessCode = ko.observable("");
    self.businessName = ko.observable("");
    self.businessCrossStreets = ko.observable("");
    self.businessAddress = ko.observable("");
    self.businessDescription = ko.observable("");

    self.currentRewardName = ko.observable("");
    self.currentRewardCost = ko.observable("");
    self.currentRewardOffering = ko.observable("");
    self.currentRewardAmountSaved = ko.observable("");

    self.progressIconClicked = function(d,e) {

      var progressIconClass = e.currentTarget.classList[1];

      progressIconClass = progressIconClass + '-section';
      $('.active-create-container').fadeOut(function() {
        $('.active-create-container').removeClass('active-create-container');
        $('.'+progressIconClass).fadeIn();
        $('.'+progressIconClass).addClass('active-create-container');
      });

    };

    self.businessCodeSubmitted = function() {
      console.log(self.businessCode());
      $('.enter-code-container').fadeOut(function() {
        $('.enter-code-container').removeClass('active-create-container');
        $('.terms-container').fadeIn();
        $('.terms-container').addClass('active-create-container');
        $('.enter-code-image').attr('src','/static/img/green-check.png');
      })
    };

    self.checkBoxContainerClicked = function() {
      $('.check-box-container').css('background','#aaa');
    };

    self.termsNextButtonClicked = function() {
      $('.terms-container').fadeOut(function() {
        $('.terms-container').removeClass('active-create-container');
        $('.create-information-container').fadeIn();
        $('.create-information-container').addClass('active-create-container');
        $('.agreement-image').attr('src','/static/img/green-check.png');
      });
    };

    self.businessInformationEntered = function() {
      $('.create-information-container').fadeOut(function() {
        $('.create-information-container').removeClass('active-create-container');
        $('.rewards-container').fadeIn();
        $('.rewards-container').addClass('active-create-container');
        $('.enter-info-image').attr('src','/static/img/green-check.png');
      });
    };

    self.chooseImageButtonClickedCreate = function() {
      $('.reward-image-file').click();
    };

    self.createARewardNextButtonClicked = function() {
      $('.rewards-container').fadeOut(function() {
        $('.rewards-container').removeClass('active-create-container');
        $('.finish-container').fadeIn();
        $('.finish-container').addClass('active-create-container');
        $('.rewards-image').attr('src','/static/img/green-check.png');
      });
    };
  };

  var createAccountObjectVM = new CreateAccountViewModel();
  ko.applyBindings(createAccountObjectVM,$(".create-account-navigation")[0]);
  ko.applyBindings(createAccountObjectVM,$(".create-account-container")[0]);

});
