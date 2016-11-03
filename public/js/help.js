(function($) {

  function HelpViewModel() {

    var database = firebase.database();

    var cityRef = firebase.database().ref('citiesAvailable');
    var merchantRef = firebase.database().ref('merchants');

    var self = this;

    self.currentQuestion = ko.observable("");
    self.currentQuestionsAndAnswers = ko.observableArray("");
    self.citiesArray = ko.observableArray([]);
    self.locationsInCity = ko.observableArray([]);
    self.currentCity = ko.observable("");

    var storage = firebase.storage();

    cityRef.on('value', function(snapshot) {
      for (var i = 0; i < snapshot.val().length; i++) {
        var currentCity = self.citiesArray()[i];
        self.addCity(snapshot.val()[i]);
      }
    });

    self.addCity = function(snapshotAtIndex) {
      var gsReference = storage.refFromURL(snapshotAtIndex.cityImageLocation);
      gsReference.getDownloadURL().then(function(url) {
        // Get the download URL for 'images/stars.jpg'
        // This can be inserted into an <img> tag
        // This can also be downloaded directly
        var city = {city:snapshotAtIndex.city, state:snapshotAtIndex.state, image:url};
        self.citiesArray().push(city);
        self.citiesArray.valueHasMutated();
      }).catch(function(error) {
        // Handle any errors
      });
    }

    self.locationClicked = function(index,data) {
      self.locationsInCity([]);
      $('body').css('overflow-y','hidden');
        $('#locations-popup').fadeIn();
        self.currentCity(index.city + ", " + index.state);
        var merchants = merchantRef.orderByChild("city").equalTo(((index.city).toLowerCase()).replace(/\s/g, ''));
        merchants.on('child_added', function(snapshot) {
          var key = snapshot.key;
          self.locationsInCity().push(snapshot.val());
          self.locationsInCity.valueHasMutated();
          console.log(self.locationsInCity());
          // load the song by its key
        });
    };

    self.exitLocationPopup = function() {
      $('#locations-popup').fadeOut();
      $('body').css('overflow-y','scroll');
    };

    self.helpObjects = ko.observableArray([
      {
        questionType: 'General information',
        questions: ["What is Passenger?", "How many cities are you in?", "Do you have any online partners?"],
        answers: ["Passenger is a mobile phone application that rewards its users for not texting and driving and giving them discounts at their favorite local businesses.",
         "We are currently in Fresno, Clovis, and Kingsburg. However, we are going to be expanding to Sacramento and Visalia in California soon. If you want to become a rep in your city contact us!",
          "At the moment we are not partnered with any online store. But, we are actively pursuing and in constant negotiation with online retailers."]
      },
      {
        questionType: 'Account information',
        questions: ["Is there a way for me to see how many points I have on the website?",
        "I am a business owner. Am I able to see my business account online?",
        "As a business, how do we sign up to have an account and offer discounts on Passenger?"],
        answers: ["As of right now the ability to see your account on the Passenger website is not available. However, we are actively working on building a dashboard that will allow our users to see their profile online.",
        "Again, just like the personal accounts, we do not currently have a dashboard for our partners either. But, our users and our partners come first. This is why we are currently building out a dashboard for our partners to see their account information whenever they want it.",
        "To get in contact with us click the merchants link in the navigation bar at the top of the webpage and fill out the contact form. One of our sales representatives will be in contact with you within 24 hours."]
      },
      {
        questionType: 'Discounts',
        questions: ["What type of discounts do you offer?",
        "Where can we find the locations for your discounts?",
        "When are you going to be coming to my city?"],
        answers: ["Currently, most of the discounts that we offer are at local businesses around the cities that we are in. However, we are working every single day to expand our discounts to online and larger chain stores in your city. If you have any businesses to recommend feel free to contact us!",
        "You can see the locations that we have both in on the Passenger Mobile website & on the app itself.",
        "We are working every single day to expand our discounts reach to other cities. If you want the app in your city then please let us know by filling out our contact form. Keep coming back to the Passenger website to see if we have arrived in your city!"]
      },
      {
        questionType: 'Mobile Application',
        questions: ["Are you guys going to be putting the Passenger app on Android?",
        "Does the app cost anything?"],
        answers: ["As of right now the app is only on iOS but we are currently building the Android version of the app to bring our friends on Android the wonderful experience of Passenger. We are expecting a January 1st launch date."
        , "No. The app is free for our users, forever. We believe that helping you live a less distracted life should not cost you a dime."]
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
  ko.applyBindings(helpObjectVm,$("#locations")[0]);
  ko.applyBindings(helpObjectVm,$("#locations-popup")[0]);

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
