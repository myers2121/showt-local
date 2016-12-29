(function($) {

  function footerViewModel() {

      var self = this;

      self.footerEmailClicked = function(data,event) {

        var linkText = $(event.target).text();
        linkText = linkText.replace(/\s+/g, '-').toLowerCase();
        location.href = '/' + linkText;
        
      };
  };


  var footerObjectVm = new footerViewModel();
  ko.applyBindings(footerObjectVm,$("#footer-section")[0]);

})(jQuery); // End of use strict
