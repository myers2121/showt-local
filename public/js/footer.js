(function($) {

  function footerViewModel() {

      var self = this;

  };


  var footerObjectVm = new footerViewModel();
  ko.applyBindings(footerObjectVm,$("#footer")[0]);

})(jQuery); // End of use strict
