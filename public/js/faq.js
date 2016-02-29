$(document).ready(function() {
  var FAQViewModel = function() {

    var self = this;

    self.questionsArray = ko.observableArray("");
    self.answersArray = ko.observableArray("");
    self.currentAnswer = ko.observable("");
    self.currentQuestion = ko.observable("");

    self.questionTypeClicked = function(questionType) {
      self.questionsArray(questionType.expandedQuestions);
      $('.question-container').fadeOut(250,function(){
          $(".expanded-questions-container").fadeIn(250);
          $('.back-button-questions-container').css('display','block');
      });
      console.log(self.questionsArray());
    };

    self.backButtonClicked = function() {
      $(".expanded-questions-container").fadeOut(250, function() {
        $('.back-button-questions-container').css('display','none');
        $('.question-container').fadeIn(250);
      });
    };

    self.questionClicked = function(currentQuestion) {
      self.currentQuestion(currentQuestion.questionExpanded);
      self.currentAnswer(currentQuestion.answer);
      $("#answer-section").fadeIn();
    };

    self.faqQuestions = [
      {
        question: 'Waterfowl',
        expandedQuestions: [
          {
            questionExpanded: 'Question #1 Waterfowl',
            answer: 'ANswer #1'
          },
          {
            questionExpanded: 'Question #2',
            answer: 'Answer #2'
          },
          {
            questionExpanded: 'Question #3',
            answer: 'Answer #3'
          }
        ]
      },
      {
        question: 'Boar',
        expandedQuestions: [
          {
            questionExpanded: 'Question #1 Boar',
            answer: 'ANswer #1'
          },
          {
            questionExpanded: 'Question #2',
            answer: 'Answer #2'
          },
          {
            questionExpanded: 'Question #3',
            answer: 'Answer #3'
          }
        ]
      },
      {
        question: 'Deer',
        expandedQuestions: [
          {
            questionExpanded: 'Question #1 Deer',
            answer: 'ANswer #1'
          },
          {
            questionExpanded: 'Question #2',
            answer: 'Answer #2'
          },
          {
            questionExpanded: 'Question #3',
            answer: 'Answer #3'
          }
        ]
      },
      {
        question: 'Registration',
        expandedQuestions: [
          {
            questionExpanded: 'Question #1 Registration',
            answer: 'ANswer #1'
          },
          {
            questionExpanded: 'Question #2',
            answer: 'Answer #2'
          },
          {
            questionExpanded: 'Question #3',
            answer: 'Answer #3'
          }
        ]
      },
      {
        question: 'Other',
        expandedQuestions: [
          {
            questionExpanded: 'Question #1 Other',
            answer: 'ANswer #1'
          },
          {
            questionExpanded: 'Question #2',
            answer: 'Answer #2'
          },
          {
            questionExpanded: 'Question #3',
            answer: 'Answer #3'
          }
        ]
      }
    ];

    // firebaseFuncs.ref.child("/helpQuestions").on("value", function(snapshot) {
    //   var faqQuestions = snapshot.val();
    //   $.each(faqQuestions, function(index,value) {
    //     self.questionsArray.push({question: value.question});
    //     self.answersArray.push({answer: value.answer});
    //   });
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });


  };

  $('.faq-selector').click(function() {
    location.href = '/faq';
  });

  $('.exit-question-expanded').click(function() {
    $("#answer-section").fadeOut();
  });

  var faqObjectVm = new FAQViewModel();
  ko.applyBindings(faqObjectVm,$("#faq")[0]);

});
