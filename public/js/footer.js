(function($) {

  function copyrightViewModel() {

      var self = this;

      self.currentDate = ko.observable("");

      var date = new Date();
      var year = date.getFullYear();

      self.currentDate(year);

  };


  var copyrightObjectVm = new copyrightViewModel();
  ko.applyBindings(copyrightObjectVm,$(".copy-right-footer")[0]);


})(jQuery); // End of use strict
