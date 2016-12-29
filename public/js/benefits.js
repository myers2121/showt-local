(function($) {

  function BusinessViewModel() {

      var self = this;
  };


  var businessObjectVm = new BusinessViewModel();
  ko.applyBindings(businessObjectVm,$("#business-section")[0]);

})(jQuery); // End of use strict
