(function($) {

  function HelpViewModel() {

      var self = this;

      self.questionTypes = ko.observableArray([
        {
          questionTypeTitle: 'Getting started'
        },
        {
          questionTypeTitle: 'Account & profile'
        },
        {
          questionTypeTitle: 'For businesses'
        },
        {
          questionTypeTitle: 'What\'s coming?'
        }
      ]);

      self.currentQuestionType = ko.observable('Frequently Asked Questions')
      self.currentQuestionsAndAnswers = ko.observableArray([
        {
          question: 'What is Shout local',
          answer: 'Shout local is a product that brings together businesses and influencers that have a large following on social media to help businesses promote their products and to help these influencers make money from the hard work they put in to growing their audience. Businesses create campaigns to find the right people to promote their product and influencers find the right businesses for them. Businesses see the powers of influencer marketing and watch their business grow like it never has before. We are here to give everyone a voice by allowing any business and anybody on social media the opportunity to follow their dreams.'
        },
        {
          question: 'How can I create an influencer account',
          answer: 'To start earning some extra money from Shout local you must create an account. To do this, go to our homepage, click the earn extra money button, and fill out all of the information so you can create yourself an account and begin your journey with us here at Shout local.'
        },
        {
          question: 'How can I create a business account',
          answer: 'Creating a business account is the first step in your journey with Shout local. To do this, go to our homepage, click on the grow your busines button, and follow the steps to creating an account for your business.'
        },
        {
          question: 'What cities is Shout local in currently',
          answer: 'Shout local is currently only operating within cities in California. However, we are working very hard to create an expansion team that will take our product to the entire country so that anybody can have access to the wonderful features that Shout local can provide for companies and ifluencers alike.'
        },
        {
          question: 'When will Shout local be coming to my city',
          answer: 'Shout local is expanding rapidly to many cities all across the country. If we are not currently in your city, first off, we apologize. We are working tirelessly to bring our product to every city in the country to help businesses and influencers achieve their dreams through Shout local. So, please be patient and fill out our contact form to let us know where you are, we promise to respond and get to your city as soon as possible!'
        },
        {
          question: 'How can I work at Shout local',
          answer: 'We at Shout local are always looking for intelligent, entrepreneurial, and focused individuals to become a part of our company. If you think you have what it takes to be a part of our amazing team then do not hesitate to get into contact with us. Once we receive your submission of our hiring managers will be in contact with you very shortly. Our CEO Connor Myers always says, "Remember, providing a ton of value to someone is an amazing way to get noticed and will drastically increase your chances of getting hired."'
        }
      ]);

      self.questionsAndAnswersContainer = ko.observableArray([
        {
          questions: [
            {
              question: "What is an influencer"
            },
            {
              question: "How can businesses use Shout local to get more customers"
            },
            {
              question: "How can I find my first gig as an influencer"
            },
            {
              question: "How can I create my first campaign as a business"
            }
          ],
          answers: [
            {
              answer: "An influencer is anybody that has an account on some form of social media. This could be instagram, twitter, facebook, etc. The more followers and impact that you have the more influential that you can become."
            },
            {
              answer: "Influencer marketing is the #1 way for businesses to market in 2017. It is a proven fact that people value product recommendations from people that they know over celebrities and ads. This is where Shout local comes in. You leverage our influencer marketing network that is in your community to grow your business and your brand."
            },
            {
              answer: "After you have created a Shout local influencer account, our team will vet your account to make sure that you have the right following and are an accoun that we would like to work with. From here we will be in contact with you when a campaign comes across our desk. Our influencer specialist will be in contact with you to help you run a campaign and earn some extra money on the side."
            },
            {
              answer: "Once you have created an account as a business, log in to the business dashboard. Click on the link in the navigation bar that says create. This will take you to a page that will have further instructions to walk you through the entire process of creating a campaign on Shout local. Once you have created your campaign our team will hand select the best influencers to promote your business. If you have any further questions please do not hesitate to get in contact with us through our contact form."
            }
          ]
        },
        {
          questions: [
            {
              question: "How can I edit my business information"
            },
            {
              question: "Can I edit my information as an influencer"
            }
          ],
          answers: [
            {
              answer: "Log in to your business dashboard and click on your business name in the navigation bar in the top right hand corner of the page. Then click the link that says edit info. This will show you a pop up with all of your information that you can edit."
            },
            {
              answer: "As of right now there is no way to edit your information unless you contact us at Shout Local. However, we are actively working on building out the Shout Local mobile phone app which is where you are going to be able to edit all of your information so stay tuned, the app is coming soon and you are going to like it!"
            }
          ]
        },
        {
          questions: [
            {
              question: "What is influencer marketing"
            },
            {
              question: "Why does my business need influencer marketing"
            },
            {
              question: "How can Shout Local help me"
            },
            {
              question: "How much does it cost"
            }
          ],
          answers: [
            {
              answer: "Influencer marketing is a form of marketing in which focus is placed on specific key individuals rather than the target market as a whole. This allows marketeres and advertisers to get more creative and push their products to people in a more effective way."
            },
            {
              answer: "The traditional methods of marketing are no longer profitable. Radio, Television, Google & Facebook ads, and other forms of traditional advertising are no longer as effective as they use to be. So, how can influencer marketing help my business? 90% of people believe in product recommendations from their friends. This is why influencer marketing is so successful. On social media, people follow others that they are close with or follow closely. Also, 70% of people that get a referral on social media are going to make a purchase from this business. Influencer marketing does both of these. It brings people that are on social networks to refer your product using word of mouth to their followers."
            },
            {
              answer: "The main problem with influencer marketing is it is extremely hard for companies and influencers to get in contact with each other. Shout Local solves this problem. We find the influencers for you. We understand that you need to focus on running your business and can't spend time trying to find people to promote your products. We take all of the hastle out of running, managing, and growing your influencer marketing campaigns."
            },
            {
              answer: "The beauty of Shout Local is that you only pay for the amount of reach that you want. If you have a smaller budget then that is okay. It doesn't matter how big your business is, you have the opportunity to participate in Shout Local's influencer marketing platform."
            }
          ]
        },
        {
          questions: [
            {
              question: "The Shout Local mobile phone app for both influencers and businesses"
            },
            {
              question: "Data analytics for businesses"
            },
            {
              question: "Campaign help for businesses"
            },
            {
              question: "Social media advice and help for influencers"
            },
            {
              question: "Shout local influencer rating score"
            }
          ],
          answers: [
            {
              answer: "In the coming few months, the team at Shout Local is going to be releasing its iPhone and Android mobile phone applications. This will allow influencers to browse, apply, perform, and review all current and previous gigs. It is also going to allow businesses to successfully create, run, edit, update, and review all current and previous campaigns from the palm of their hand on the go. The mobile app is going to be providing deep data analytics to help businesses run more successful campaigns and to help influencers increase their social media presence. In essence, this mobile app is going to be epic."
            },
            {
              answer: "When running a business, we understand that data is everything. We are actively building out the software necessary so that the businesses on Shout Local can see exactly how successful their campaign is with respect to the amount of money that they are spending. When we say these analytics are going to be beautiful, we truly mean it. You are going to be getting insights into your campaigns that you never have been able to have in the past."
            },
            {
              answer: "For many businesses that come on the Shout Local it is their first time performing an influencer marketing campaign. We are working on what we are calling Shout Local University. This is a series of videos that are going to help educate marketers and business owners that are new to influencer marketing on the power of influencer marketing as well how to create a campaign so that they can have the most success possible."
            },
            {
              answer: "We at Shout local like to think of social media and all of these new emerging platforms as the new TV, we may have stole that one from Gary Vaynerchuk, but, we believe that people that have large followings on social media are one day going to have the same clout as television stars. This means that influencers are going to start taking a more professional role in managing their accounts. We want to be there for our influencers as well. By having a Shout Local account you are going to get access to the Shout Local University. A video course on how you can have more success on your social accounts, how to take advantage of Shout Local to make the most money, and our predictions on what the emerging platforms are that we believe you should take advantage of."
            },
            {
              answer: "One of the main parts of influencer marketing is being able to accurately evaluate how influential someone is on social media. We are building out the Shout Local influencer score. This will allow influencers to see how influential there are and will show them what they need to work on and it will show businesses who the best influencers are in their communities."
            }
          ]
        }
      ]);

      const $helpQuestionContainer = $('.question-container');
      const $helpAnswerContainer = $('.answer-container');

      self.questionClicked = function(d,e) {
        var currentItem = e.currentTarget;
        $(currentItem).next('.answer-container').children('.answer-text').slideToggle();
        $('.dropdown-question-container:before').css('transform','rotate(90deg)');
      };

      self.questionTypeClicked = function questionTypeClickedFunction(index,data) {
        self.currentQuestionType(self.questionTypes()[index].questionTypeTitle);
        self.currentQuestionsAndAnswers([]);
        var currentQuestions = self.questionsAndAnswersContainer()[index].questions;
        var currentAnswers = self.questionsAndAnswersContainer()[index].answers;

        for (var i = 0; i < currentQuestions.length; i++) {
          self.currentQuestionsAndAnswers.push({
            question: currentQuestions[i].question,
            answer: currentAnswers[i].answer
          });
        }
      };

  };

  var helpObjectVm = new HelpViewModel();
  ko.cleanNode($("#help-section")[0]);
  ko.applyBindings(helpObjectVm,$("#help-section")[0]);

  $('.home-link').click(function() {
    location.href = '/';
  });

  $('.showt-out-icon-container img').click(function() {
    location.href = '/';
  });

})(jQuery); // End of use strict
