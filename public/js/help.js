(function($) {

  function HelpViewModel() {

    var self = this;

    self.currentQuestion = ko.observable("");
    self.currentQuestionsAndAnswers = ko.observableArray("");

    self.helpObjects = ko.observableArray([
      {
        questionType: 'General information',
        questions: ["What is Passenger?", "How many cities are you in?", "Do you have any online partners?"],
        answers: ["Passenger is a mobile phone application that rewards its users for not texting and driving and giving them discounts at their favorite local businesses.",
         "We are currently only in Fresno, CA. However, we are rapidly expanding to cities and states nearby.",
          "At the moment we are not partnered with any online store. But, we are actively pursuing and in constant negotiation with online retailers."]
      },
      {
        questionType: 'Account information',
        questions: ["Is there a way for me to see how many points I have on the website?",
        "I am a business owner. Am I able to see my business account online?",
        "As a business, how do we sign up to have an account and offer discounts on Passenger?"],
        answers: ["As of right now the ability to see your account on the Passenger website is not available. However, we are actively working on building a dashboard that will allow our users to see their profile online.",
        "Again, just like the personal accounts, we do not currently have a dashboard for our partners either. But, our users and our partners come first. This is why we are currently building out a dashboard for our partners to see their account information whenever they want it.",
        "In the coming months we are going to be releasing our partners dashboard which will allow them to sign up for an account and see all of the information that they could ever want for their account. But, for now, just by simply emailing us we will respond to you in less than 24 hours with a phone call to get going with creating you an account on Passenger."]
      },
      {
        questionType: 'Discounts',
        questions: ["What type of discounts do you offer?",
        "Where can we find the locations for your discounts?",
        "When are you going to be in another city?"],
        answers: ["Currently, most of the discounts that we offer are at local businesses around the city of Fresno that are typically small or family owned businesses. However, we are working every single day to expand our discounts to online and larger chain stores.",
        "To see a list of the businesses that we currently have on the app you are going to log on to the Passenger app. When you open the app, click on the rewards section of the home screen. This will give you a look at all of the discounts that we currently offer in your city.",
        "We are working every single day to expand our discounts reach to other cities nearby Fresno, California. Eventually, we would like to be in every single city in the United States. Keep coming back to the Passenger website to see if we have arrived in your city!"]
      },
      {
        questionType: 'Mobile Application',
        questions: ["Are you guys going to be putting the Passenger app on Android?",
        "Does the app cost anything?",
        "I can't download the app on my iPhone 5"],
        answers: ["As of right now the app is only on iOS but we are currently building the Android version of the app to bring our friends on Android the wonderful experience of Passenger."
        , "No. The app is free for our users, forever. We believe that helping you live a less distracted life should not cost you a dime.",
        "Due to the needs of the Passenger app, the iPhone 5 is not capable of running the app. We want to make sure that all of our users have a delighted experience on the app and did't want to compromise anything."]
      }
    ]);

    for (var i = 0; i < self.helpObjects()[0].questions.length; i++) {
      var currentCombo = {
        question: self.helpObjects()[0].questions[i],
        answer: self.helpObjects()[0].answers[i]
      };
      self.currentQuestionsAndAnswers.push(currentCombo);
    };

    self.questionClicked = function(data,event) {
      self.currentQuestion(data.questionType);
      self.currentQuestionsAndAnswers([]);
      for (var i = 0; i < data.questions.length; i++) {
        var currentCombo = {
          question: data.questions[i],
          answer: data.answers[i]
        };
        self.currentQuestionsAndAnswers.push(currentCombo);
      };
      $('.help-expanded-container').fadeIn();
    };

    self.questionClickedDesktop = function(data,event) {
      self.currentQuestion(data.questionType);
      $('.help-desktop .question-type-container .question-type-header').css('color', '#7a7a7a');
      $(this).css('display','#FFF');
      self.currentQuestionsAndAnswers([]);
      for (var i = 0; i < data.questions.length; i++) {
        var currentCombo = {
          question: data.questions[i],
          answer: data.answers[i]
        };
        self.currentQuestionsAndAnswers.push(currentCombo);
      };
    };

  };

  var helpObjectVm = new HelpViewModel();
  ko.applyBindings(helpObjectVm,$("#help")[0]);

  $('.exit-help').click(function() {
    $('.help-expanded-container').fadeOut();
  });

  $('.contact-support-button').click(function() {
    location.href = '/support/contact-support';
  });

  $('.get-support-button').click(function() {
    location.href = '/support';
  });

})(jQuery); // End of use strict
