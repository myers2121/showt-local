$(document).ready(function(){

  var ref = new Firebase("https://passenger-app.firebaseio.com/");
  var merchantsRef = new Firebase("https://passenger-app.firebaseio.com/rewards");
  var authData = ref.getAuth();
  var currentMerchantRef;
  var currentMerchantRewardsRef;

  const merchantImageRatio = 1.6578947368;
  const rewardImageRatio = 1;

  if (authData == null) {
    location.href = '/merchants/login';
  }

  var loggedInMerchantEmail = authData.auth.token.email;

  function DashboardViewModel() {

    var self = this;

    self.currentMerchantName = ko.observable("");
    self.currentMerchantCrossStreets = ko.observable("");
    self.currentCompanyDescription = ko.observable("");
    self.currentCompanyDescriptionEdited = ko.observable("");
    self.currentMerchantImage = ko.observable("");
    self.currentMerchantNameEdited = ko.observable("");
    self.currentMerchantCrossStreetsEdited = ko.observable("");
    self.currentMerchantMonthlyTransactions = ko.observableArray("");
    self.rewardsRedeemed = ko.observable("");
    self.averageRedeemCost = ko.observable("");
    self.totalAmountOwed = ko.observable("");

    self.currentMerchantRewardOfferings = ko.observableArray();

    self.rewardName = ko.observable("");
    self.rewardDescription = ko.observable("");
    self.rewardPrice = ko.observable();
    self.rewardAmountSaved = ko.observable();
    self.rewardImage = ko.observable("");

    self.editRewardName = ko.observable("");
    self.editRewardDescription = ko.observable("");
    self.editRewardPrice = ko.observable();
    self.editRewardImage = ko.observable("");
    self.editRewardAmountSaved = ko.observable();

    self.saveMerchantDetails = function() {

      currentMerchantRef.update({
        "companyName": self.currentMerchantNameEdited(),
        "crossStreets": self.currentMerchantCrossStreetsEdited(),
        "companyDescription": self.currentCompanyDescriptionEdited()
      });
      self.currentMerchantName(self.currentMerchantNameEdited());

      self.currentMerchantCrossStreets(self.currentMerchantCrossStreetsEdited());
      self.currentCompanyDescription(self.currentCompanyDescriptionEdited());
      $('#home-feedback-section').fadeOut();
    };

    var rewardIndexToChange;

    self.editRewardButtonClicked = function(index,data) {
      self.editRewardName(data.rewardsName);
      self.editRewardDescription(data.rewardDescription);
      self.editRewardPrice(data.rewardPrice);
      self.editRewardImage(data.rewardImage);
      self.editRewardAmountSaved(data.rewardAmountSaved);

      console.log(data);

      rewardIndexToChange = index;

      $('#edit-reward-container').fadeIn();
    };

    self.chooseImageButtonClickedEdit = function() {
      $('#edit-reward-image-file').click();
    };

    self.saveEditRewardButtonClicked = function() {
      var input = document.getElementById('edit-reward-image-file');
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          var fileType = input.files[0].type;
          reader.onload = function (e) {

            var base64RewardImage = e.target.result;
            base64RewardImage = base64RewardImage.replace('data:image/png;base64,', '');
            base64RewardImage = base64RewardImage.replace('data:image/jpeg;base64,', '');

            var newRewardPrice = parseFloat(self.editRewardPrice().toString().replace('$', ''));
            newRewardPrice = parseFloat(newRewardPrice.toFixed(2));

            var newRewardAmountSaved = parseFloat(self.editRewardAmountSaved().toString().replace('$', ''));
            newRewardAmountSaved = parseFloat(newRewardAmountSaved.toFixed(2));

            // Calculate the point cost based off the price of the item

            var pointCost = 75 * (Math.pow(newRewardAmountSaved, 0.75));
            pointCost = parseInt(pointCost.toFixed(0));

            var newReward = {
              companyName: self.currentMerchantName(),
              pointCost: pointCost,
              rewardDescription: self.editRewardDescription(),
              rewardImage: base64RewardImage,
              rewardPrice: parseFloat(newRewardPrice),
              rewardAmountSaved: parseFloat(newRewardAmountSaved),
              rewardsName: self.editRewardName()
            };

            var rewardsList = self.currentMerchantRewardOfferings();
            rewardsList[rewardIndexToChange] = newReward;

            for (i in self.currentMerchantRewardOfferings()) {
              rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/png;base64,', '');
              rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/jpeg;base64,', '');
              rewardsList[i].rewardAmountSaved = parseFloat(rewardsList[i].rewardAmountSaved);
            }

            currentMerchantRewardsRef.set(rewardsList);
            $('#edit-reward-container').fadeOut();

          }
          var fileType = input.files[0].type;

          if (fileType == 'image/png' || fileType == 'image/jpg' || fileType == 'image/jpeg') {
            reader.readAsDataURL(input.files[0]);
          } else {
            // The user has uploaded the wrong file type.

          }

      } else {

        // The user didn't select to change the image use the current image

        var newRewardPrice = parseFloat(self.editRewardPrice().toString().replace('$', ''));
        newRewardPrice = parseFloat(newRewardPrice.toFixed(2));

        var newRewardAmountSaved = parseFloat(self.editRewardAmountSaved().toString().replace('$', ''));
        newRewardAmountSaved = parseFloat(newRewardAmountSaved.toFixed(2));

        // Calculate the point cost based off the price of the item

        var pointCost = 75 * (Math.pow(newRewardAmountSaved, 0.75));
        pointCost = parseInt(pointCost.toFixed(0));

        var newReward = {
          companyName: self.currentMerchantName(),
          pointCost: pointCost,
          rewardDescription: self.editRewardDescription(),
          rewardImage: self.editRewardImage(),
          rewardPrice: parseFloat(newRewardPrice),
          rewardAmountSaved: parseFloat(newRewardAmountSaved),
          rewardsName: self.editRewardName()
        };
        var rewardsList = self.currentMerchantRewardOfferings();
        rewardsList[rewardIndexToChange] = newReward;

        for (i in self.currentMerchantRewardOfferings()) {
          rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/png;base64,', '');
          rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/jpeg;base64,', '');
          rewardsList[i].rewardAmountSaved = parseFloat(rewardsList[i].rewardAmountSaved);
        }

        currentMerchantRewardsRef.set(rewardsList);
        $('#edit-reward-container').fadeOut();

      }

    };

    self.deleteRewardButtonClicked = function() {
      self.currentMerchantRewardOfferings.splice(rewardIndexToChange,1);
      var rewardsList = self.currentMerchantRewardOfferings();
      for (var i = 0; i < self.currentMerchantRewardOfferings().length; i++) {

        rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/png;base64,', '');
        rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/jpeg;base64,', '');

      }
      //currentMerchantRewardsRef.set(self.currentMerchantRewardOfferings());
      $('#edit-reward-container').fadeOut();
    };

    self.chooseImageButtonClicked = function() {
      $('#reward-image-file').click();
    };

    self.cancelRewardButtonClicked = function() {
      $('#create-reward-container').fadeOut();
      self.rewardName("");
      self.rewardDescription("");
      self.rewardPrice("");
    };

    self.createRewardButtonClicked = function() {
      var input = document.getElementById('reward-image-file');
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          var fileType = input.files[0].type;
          reader.onload = function (e) {
            var base64RewardImage = e.target.result;

            // Change the price into a number
            var newRewardPrice = parseFloat(self.rewardPrice().replace('$', ''));
            newRewardPrice = parseFloat(newRewardPrice.toFixed(2));

            var newRewardAmountSaved = parseFloat(self.rewardAmountSaved().replace('$', ''));
            newRewardAmountSaved = parseFloat(newRewardAmountSaved.toFixed(2));

            // Calculate the point cost based off the price of the item

            var pointCost = 75 * (Math.pow(newRewardAmountSaved, 0.75));
            pointCost = parseInt(pointCost.toFixed(0));

            var newReward = {
              companyName: self.currentMerchantName(),
              pointCost: pointCost,
              rewardDescription: self.rewardName(),
              rewardImage: base64RewardImage,
              rewardPrice: newRewardPrice,
              rewardAmountSaved: newRewardAmountSaved,
              rewardsName: self.rewardDescription()
            };

            self.currentMerchantRewardOfferings().push(newReward);

            var rewardsList = self.currentMerchantRewardOfferings();
            for (var i = 0; i < self.currentMerchantRewardOfferings().length; i++) {

              rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/png;base64,', '');
              rewardsList[i].rewardImage = rewardsList[i].rewardImage.replace('data:image/jpeg;base64,', '');

            }

            currentMerchantRewardsRef.set(self.currentMerchantRewardOfferings());
            $('#create-reward-container').fadeOut();
            self.rewardName("");
            self.rewardDescription("");
            self.rewardPrice("");
            self.rewardAmountSaved("");

          }
          var fileType = input.files[0].type;

          if (fileType == 'image/png' || fileType == 'image/jpg' || fileType == 'image/jpeg') {
            reader.readAsDataURL(input.files[0]);
          } else {
            // The user has uploaded the wrong file type.
          }

      }

      if (self.rewardName() != null && self.rewardDescription() != null && self.rewardPrice() != null) {

      } else {
        console.log("Please make sure all of the fields are filled out.");
      }
    };

    self.cancelEditRewardButtonClicked = function() {
      $('#edit-reward-container').fadeOut();
    };

    var rewardsRef = new Firebase("https://passenger-app.firebaseio.com/rewards");
    var currentMerchant;

    rewardsRef.orderByChild("email").equalTo(loggedInMerchantEmail).on("value", function(snapshot) {
      currentMerchant = snapshot.val();
      var rewards = currentMerchant[0].rewards;

      self.currentMerchantRewardOfferings([]);
      self.currentMerchantMonthlyTransactions([]);

      currentMerchantRef = merchantsRef.child(Object.keys(currentMerchant)[0]);
      currentMerchantRewardsRef = currentMerchantRef.child("rewards");

      self.currentMerchantName(currentMerchant[0].companyName);
      self.currentMerchantCrossStreets(currentMerchant[0].crossStreets);
      self.currentCompanyDescription(currentMerchant[0].companyDescription);
      self.currentCompanyDescriptionEdited(currentMerchant[0].companyDescription);
      self.currentMerchantNameEdited(currentMerchant[0].companyName);
      self.currentMerchantCrossStreetsEdited(currentMerchant[0].crossStreets);
      var imageSrc = 'data:image/png;base64,' + currentMerchant[0].companyImage;
      self.currentMerchantImage(imageSrc);

      var newTransaction = [];
      var currentTotalAmount = 0;

      self.rewardsRedeemed(currentMerchant[0].monthlyTransactions.length);

      for (var i = 0; i < currentMerchant[0].monthlyTransactions.length; i++) {
        var transaction = {
          "dateRecorded": currentMerchant[0].monthlyTransactions[i].dateRecorded,
          "rewardText": currentMerchant[0].monthlyTransactions[i].rewardItem+ " " + currentMerchant[0].monthlyTransactions[i].rewardDescription,
          "rewardPriceText": calculatePrice(i),
          "userEmail": currentMerchant[0].monthlyTransactions[i].userEmail
        };

        self.currentMerchantMonthlyTransactions.push(transaction);
      }

      function calculatePrice(i) {
        var price = currentMerchant[0].monthlyTransactions[i].rewardPrice;
        if (price == 100000) {
          price = 0.25;
        } else {
          price = currentMerchant[0].monthlyTransactions[i].rewardPrice * 0.02;
        }

        currentTotalAmount = currentTotalAmount + price;

        var rewardPriceText = "$" + price.toFixed(2);
        return rewardPriceText;
      };

      self.averageRedeemCost("$" + ((currentTotalAmount/currentMerchant[0].monthlyTransactions.length).toFixed(2)));

      self.totalAmountOwed("$" + currentTotalAmount.toFixed(2));

      for (var i = 0; i < rewards.length; i++) {
        var src = 'data:image/png;base64,' + rewards[i].rewardImage;

        var currentReward = {
          "companyName": rewards[i].companyName,
          "rewardImage": src,
          "pointCost": rewards[i].pointCost,
          "rewardDescription": rewards[i].rewardDescription,
          "rewardsName": rewards[i].rewardsName,
          "rewardPrice": rewards[i].rewardPrice,
          "rewardAmountSaved": rewards[i].rewardAmountSaved.toString()
        }

        self.currentMerchantRewardOfferings.push(currentReward);

      }

      $('html').css('overflow-y','auto');
      $('#loading-section').fadeOut();

    });

    self.currentDate = ko.observable("");

    var now = new Date();
    if (now.getMonth() == 11) {
        var current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
        var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    var today = (current.getMonth() + 1) + "-1-" + current.getFullYear();
    self.currentDate(today);

    self.logoutCurrentMerchant = function() {
      ref.unauth();
      location.href = '/merchants/login';
    };

    self.currentQuestion = ko.observable("");
    self.currentAnswer = ko.observable("");

    self.helpArray =
      [
        {
          title: "Frequently asked questions",
          questionsAndAnswers: [
            {
              question: "Question 1",
              answer: "Answer 1"
            },
            {
              question: "Question 2",
              answer: "Answer 2"
            },
            {
              question: "Question 3",
              answer: "Answer 3"
            },
            {
              question: "Question 4",
              answer: "Answer 4"
            }
          ]
        },
        {
          title: "Recent changes & updates",
          questionsAndAnswers: [
            {
              question: "Update or change 1",
              answer: "Answer 1"
            },
            {
              question: "Update or change 2",
              answer: "Answer 2"
            }
          ]
        },
        {
          title: "Contact support",
          questionsAndAnswers: [
            {
              question: "Contact merchant dashboard team",
              answer: "Answer 1"
            },
            {
              question: "Contact advertising team",
              answer: "Answer 2"
            },
            {
              question: "Contact accounting",
              answer: "Answer 3"
            },
            {
              question: "Contact sales",
              answer: "Answer 4"
            }
          ]
        },
        {
          title: "Merchant dashboard tutorials",
          questionsAndAnswers: [
            {
              question: "Tutorial 1",
              answer: "Answer 1"
            },
            {
              question: "Turorial 2",
              answer: "Answer 2"
            },
            {
              question: "Tutorial 3",
              answer: "Answer 3"
            },
            {
              question: "Turorial 4",
              answer: "Answer 4"
            }
          ]
        }
    ];

    self.helpQuestionClicked = function(d,e) {
      self.currentQuestion(d.question);
      self.currentAnswer(d.answer);
    };

  };

  var dashboardObjectVM = new DashboardViewModel();
  ko.applyBindings(dashboardObjectVM,$("#sign-out-section")[0]);
  ko.applyBindings(dashboardObjectVM,$("#support-section")[0]);
  ko.applyBindings(dashboardObjectVM,$("#pay-now-section")[0]);
  ko.applyBindings(dashboardObjectVM,$("#view-transactions-section")[0]);
  ko.applyBindings(dashboardObjectVM,$(".dashboard-nav")[0]);
  ko.applyBindings(dashboardObjectVM,$("#home-feedback-section")[0]);
  ko.applyBindings(dashboardObjectVM,$("#edit-reward-container")[0]);
  ko.applyBindings(dashboardObjectVM,$("#create-reward-container")[0]);
  ko.applyBindings(dashboardObjectVM,$("#home-section")[0]);
  ko.applyBindings(dashboardObjectVM,$("#rewards-section")[0]);


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

  $('.logged-in-user-container').click(function() {
    $('#sign-out-section').fadeIn();
  });

  $('.dashboard-site-container').click(function() {
    $('#sign-out-section').fadeOut();
  });

  $('.feedback-button').click(function() {
    $('#give-feedback-section').fadeIn();
  });

  $('.cancel-button-feedback').click(function() {
    $('#give-feedback-section').fadeOut();
  });

  $('.transactions-button').click(function() {
    $('#view-transactions-section').fadeIn();
    $('html').css("overflow-y",'none');
  });

  $('.exit-transactions').click(function() {
    $('#view-transactions-section').fadeOut();
    $('html').css("overflow-y",'auto');
  });

  $('.cancel-pay-button').click(function() {
    $('#pay-now-section').fadeOut();
  });

  $('#home-section .pay-button').click(function() {
    $('#pay-now-section').fadeIn();
  });

  $('.question').click(function() {
    $('.question').css('background','none');
    $('.question').css('color','#aaa');
    $(this).css('background','#FFF');
    $(this).css('color','#5699e6');
  });

});
