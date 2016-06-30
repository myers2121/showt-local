(function($) {

  function PreScreenViewModel() {

    var self = this;

    self.currentQuote = ko.observable("");
    self.currentAuthor = ko.observableArray("");

    self.textingQuotes = ko.observableArray([
      {
        quote: '\"In a split second you could ruin your future, injure or kill others, and tear a hole in the heart of everyone that loves you.\"',
        author: "- Sharon Heit, Mother of texting and driving victim"
      },
      {
        quote: '\"You are four times more likely to have a road accident when on your phone.\"',
        author: ""
      },
      {
        quote: '\"A mere five letters can change someone\'s life forever\"',
        author: "- Travis Burhart"
      }
    ]);

    // self.currentQuote(self.textingQuotes()[0].quote);
    // self.currentAuthor(self.textingQuotes()[0].author);
    // $('html, body').animate({ scrollTop: 0 }, 'slow', function () {
    //   $('body').css('overflow','hidden');
    // });
    //
    // setTimeout(function(){
    //   $('.quote-container').fadeOut(function() {
    //     self.currentQuote(self.textingQuotes()[1].quote);
    //     self.currentAuthor(self.textingQuotes()[1].author);
    //     $('.quote-container').fadeIn();
    //   });
    // }, 5000);
    //
    // setTimeout(function(){
    //   $('.quote-container').fadeOut(function() {
    //     self.currentQuote(self.textingQuotes()[2].quote);
    //     self.currentAuthor(self.textingQuotes()[2].author);
    //     $('.quote-container').fadeIn();
    //   });
    // }, 10000);
    //
    // setTimeout(function(){
    //   $('.pre-screen-section').fadeOut(function() {
    //     $('#home').fadeIn();
    //     $('body').css('overflow','auto');
    //     $('#mainNav').addClass('affix-top');
    //     $('#mainNav').css('display','block');
    //   });
    // }, 15000);

  };

  var preScreenObjectVm = new PreScreenViewModel();
  ko.applyBindings(preScreenObjectVm,$("#page-top")[0]);

})(jQuery); // End of use strict
