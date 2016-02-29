var firebaseFuncs = (function() {
    var self = {};
    // private variables
    self.ref = new Firebase("https://bg-outfitters.firebaseio.com/");
    var debugMode=true;

    self.getQuestions = function() {
      // Attach an asynchronous callback to read the data at our posts reference
      self.ref.child("/helpQuestions").on("value", function(snapshot) {
        console.log(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }

    return self;
}(window,jQuery));
