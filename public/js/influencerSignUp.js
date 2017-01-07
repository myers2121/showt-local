(function($) {

  function InfluencerSignUpViewModel() {

      const self = this;

      let _DB          = firebase.database().ref();
      let _INFLUENCERS = _DB.child('influencers');

    /* DECLARATIONS */

      self.influencerEmail         = ko.observable('timalanfarrow@gmail.com');
      self.influencerFirstName     = ko.observable('Tim');
      self.influencerLastName      = ko.observable('Farrow');
      self.influencerPassword      = ko.observable('password');
      self.influencerPhoneNumber   = ko.observable('(559)274-8657');
      self.influencerBirthMonth    = ko.observable('April');
      self.influencerBirthDay      = ko.observable('9');
      self.influencerBirthYear     = ko.observable('1997');
      self.influencerInstagramName = ko.observable('farrowtim');
      self.influencerTagList       = ko.observableArray([]);
      self.influencerInterestList  = ko.observableArray([]);
      self.influencerGender        = ko.observable('');
      self.currentTag              = ko.observable('');

      self.USER                    = ko.observable();

    /* INITIALIZATION */

      self.daysOptionsList = ko.observableArray([]);
      self.yearOptionsList = ko.observableArray([]);

      for(var i = 1; i < 32; i++) {
        self.daysOptionsList.push({dayNumber: i});
      }

      for(var i = 2017; i > 1900; i--) {
        self.yearOptionsList.push({yearNumber: i});
      }

      self.interests = ko.observableArray([
        {
          interestTitle: "Animals",
          interestImage: "url(/static/img/animals-interest.png)"
        },
        {
          interestTitle: "Automotive",
          interestImage: "url(/static/img/automotive-interest.png)"
        },
        {
          interestTitle: "Beauty & Personal Care",
          interestImage: "url(/static/img/beauty-interest.png)"
        },
        {
          interestTitle: "Children & Family",
          interestImage: "url(/static/img/family-interest.png)"
        },
        {
          interestTitle: "Education & Books",
          interestImage: "url(/static/img/books-interest.png)"
        },
        {
          interestTitle: "Entertainment & Events",
          interestImage: "url(/static/img/events-interest.png)"
        },
        {
          interestTitle: "Fashion",
          interestImage: "url(/static/img/fashion-interest.png)"
        },
        {
          interestTitle: "Food & Drink",
          interestImage: "url(/static/img/food-interest.png)"
        },
        {
          interestTitle: "Health, Fitness & Sport",
          interestImage: "url(/static/img/health-interest.png)"
        },
        {
          interestTitle: "Home & Garden",
          interestImage: "url(/static/img/garden-interest.png)"
        },
        {
          interestTitle: "Photography, Art & Design",
          interestImage: "url(/static/img/art-interest.png)"
        },
        {
          interestTitle: "Restaurants, Bars & hotels",
          interestImage: "url(/static/img/bars-interest.png)"
        },
        {
          interestTitle: "Social-Enterprise and Not-For-Profit",
          interestImage: "url(/static/img/non-profit-interest.png)"
        },
        {
          interestTitle: "Social media, Web & Tech",
          interestImage: "url(/static/img/tech-interest.png)"
        },
        {
          interestTitle: "Travel & Destinations",
          interestImage: "url(/static/img/travel-interest.png)"
        }
      ]);

      const $createAccountForm         = $('.influencer-account-form-container');
      const $influencerInformationForm = $('.influencer-information-sign-up-form-container');
      const $maleButton                = $('.male-button');
      const $femaleButton              = $('.female-button');
      const $backToWebsiteButton       = $('.back-to-website-button');

      $backToWebsiteButton.click(function() {
        $('#influencer-sign-up-section').fadeOut();
        $('body').css('overflow','auto');
      });

    /* ECO SYSTEM */

      firebase.auth().onAuthStateChanged(( user ) => {

        self.USER( user );

      })

      self.influencerGender.subscribe(( d ) => {

        console.log( d );

      })

      self.influencerInterestList.subscribe(( d ) => {

        console.log( d );

      })

    /* VIEW ACTIONS */

      self.signUpUser = function userSignUpButtonClicked( d, e ) {

        let data = getFormData('#account-form');

        firebase.auth().createUserWithEmailAndPassword( data.email, data.password ).then(( user ) => {

          delete data.password;

          let userData = {
            name     : data.firstName + ' ' + data.lastName,
            birthday : data.birthMonth + ' ' + data.birthDay + ', ' + data.birthYear,
            phone    : data.phone,
            email    : data.email
          };

          _INFLUENCERS.child( user.uid ).update( userData ).then(() => {

            // NEXT!
            $('.influencer-account-form-container').hide();
            $('.influencer-information-sign-up-form-container').show();

          });

        }).catch(( error ) => {

          return console.error( error );

        });

      };

      self.setGender = function accountGenderSelected( d, e ) {

        let $target = $( e.target );

        if ( !$target.hasClass('gender-button') )
          $target = $target.closest('gender-button');

        let gender = $target[0].dataset.gender;

        self.influencerGender( gender );
        $('.gender-button.active').removeClass('active');
        $target.addClass('active');

      }

      self.selectInterest = function interestClickedOn( d, e ) {

        let $target = $( e.target );

        $target.toggleClass('interest-checked-layer-show');

        let inArray = !$target.hasClass('interest-checked-layer-show');

        if ( !inArray )
          self.influencerInterestList.push( d.interestTitle );

        if ( inArray ) {

          self.influencerInterestList.remove(( interest ) => {
            return interest == d.interestTitle;
          })

        }

      }

      self.addInfluencerTag = function addTagToInfluencerList( d, e ) {

        let tag = $("#tag-input").val();

        if ( tag == null || tag == '' )
          return;

        self.influencerTagList.push( tag );
        $('#tag-input').val('');

      };

      self.removeInfluencerTag = function deleteTagFromInfluencerList( d, e ) {

        self.influencerTagList.remove(( tag ) => {
          return tag == d;
        });

      };

      self.exitSignUpPopUp = function clickReturnToMainPageButton( d, e ) {
        $("#influencer-sign-up-section").fadeOut();
      }

      self.registerInfluencerEmailNotValidated = ko.observable(false);
      self.influencerEmailValidated            = ko.observable(false);

      self.influencerEmailTyping = function() {
        if (self.influencerEmail().length > 0) {
          if (validateEmail(self.influencerEmail())) {
            self.registerInfluencerEmailNotValidated(false);
            self.influencerEmailValidated(true);
          } else {
            self.registerInfluencerEmailNotValidated(true);
          }
        }
      };

      self.firstNameNotValidated = ko.observable(false);
      self.firstNameValidated    = ko.observable(false);

      self.influencerFirstNameTyping = function() {
        if (self.influencerFirstName().length > 1) {
          self.firstNameNotValidated(false);
          self.firstNameValidated(true);
        } else {
          self.firstNameNotValidated(true);
        }
      };

      self.lastNameNotValidated = ko.observable(false);
      self.lastNameValidated    = ko.observable(false);

      self.influencerLastNameTyping = function() {
        if (self.influencerLastName().length > 1) {
          self.lastNameNotValidated(false);
          self.lastNameValidated(true);
        } else {
          self.lastNameNotValidated(true);
        }
      };

      self.passwordNotValidated = ko.observable(false);
      self.passwordValidated    = ko.observable(false);

      self.influencerPasswordTyping = function() {
        if (self.influencerPassword().length > 5) {
          self.passwordNotValidated(false);
          self.passwordValidated(true);
        } else {
          self.passwordNotValidated(true);
        }
      };

      self.phoneNumberNotValidated = ko.observable(false);
      self.phoneNumberValidated    = ko.observable(false);

      self.influencerPhoneTyping = function() {
        if (self.influencerPhoneNumber().length > 0) {
          if (validatePhoneNumber(self.influencerPhoneNumber())) {
            self.phoneNumberNotValidated(false);
            self.phoneNumberValidated(true);
          } else {

            self.phoneNumberNotValidated(true);
          }
        } else {
          self.phoneNumberNotValidated(true)
        }
      };

      self.accountCreationFormNotValidated = ko.observable(false);

      self.checkUserEntries = function() {
        if (self.influencerEmailValidated() && self.firstNameValidated() && self.lastNameValidated() && self.passwordValidated() && self.phoneNumberValidated() && self.influencerBirthMonth() != '' && self.influencerBirthDay() != '' && self.influencerBirthYear() != '') {
          self.accountCreationFormNotValidated(false);
          return true;
        } else {
          self.accountCreationFormNotValidated(true);
        }
      }

      self.accountInfoNotValidated = ko.observable(false);
      self.finishCreatingAccount = function saveInformationUserButtonClicked( d, e ) {

        // reference
        let gender        = self.influencerGender();
        let instagramName = self.influencerInstagramName();
        let interests     = self.influencerInterestList();
        let tags          = self.influencerTagList();

        if ( gender != '' && instagramName != '') {

          let user = self.USER();

          _INFLUENCERS.child( user.uid ).update({
            gender    : gender,
            instagram : instagramName,
            interests : interests,
            tags      : tags
          }).then(() => {

            $('.influencer-information-sign-up-form-container').fadeOut(function() {
              $('.influencer-finish-sign-up-form-container').fadeIn();
            });

          })

        } else {

          self.accountInfoNotValidated(true);

        }

      };


  };

  var influencerSignUpObjectVm = new InfluencerSignUpViewModel();
  ko.cleanNode(document.getElementById("influencer-sign-up-section"))
  ko.applyBindings(influencerSignUpObjectVm,document.getElementById("influencer-sign-up-section"));

  $('#influencer-sign-up-section').on('click', function(e) {
    if (e.target == this) {
      $('#influencer-sign-up-section').fadeOut();
      $('body').css('overflow','auto');
    }
  });

})(jQuery); // End of use strict
