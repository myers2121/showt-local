(function($) {

  function MerchantsViewModel() {

    var self = this;

    self.startSections = [
      {
        "myClass": "start-for-free",
        "title": "Start for free",
        "text": "Passenger is free for businesses to get started up with. There are no upfront costs.",
        "styleColumn": "left-column"
      },
      {
        "myClass": "give-discounts",
        "title": "Give discounts",
        "text": "Lure customers to your store by offering great discounts that are designed by our team.",
        "styleColumn": "right-column"
      },
      {
        "myClass": "we-bring-customers",
        "title": "Only pay for customers we bring you",
        "text": "The beauty of Passenger is that you only pay for a paying customer that we bring you.",
        "styleColumn": "left-column"
      },
      {
        "myClass": "grow-your-business",
        "title": "Grow your business",
        "text": "Passenger is an excellent opportunity to reach out to and engage your customers while supporting a good cause at the same time.",
        "styleColumn": "right-column"
      }
    ];


    var date = new Date();
    var year = date.getFullYear();

    self.currentDate = ko.observable("");
    self.currentDate(year);

  };

  var merchantsObjectVm = new MerchantsViewModel();
  ko.cleanNode($("#start-up-section")[0]);
  ko.applyBindings(merchantsObjectVm,$("#start-up-section")[0]);

  $('.get-started-button').click(function() {
    location.href = '/merchants/signup';
  });

  $('.contact-sales').click(function() {
    location.href = '/support/contact-support';
  });

})(jQuery); // End of use strict
