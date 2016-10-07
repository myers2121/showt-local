$(document).ready(function(){

  var ref = new Firebase("https://passenger-app.firebaseio.com/");
  var adminRef = new Firebase("https://passenger-app.firebaseio.com/admin");
  function AdminLoginViewModel() {

    var self = this;

    self.adminLoginEmail = ko.observable("");
    self.adminLoginPassword = ko.observable("");
    self.adminLoginErrorString = ko.observable("");

    self.loginAdminButtonClicked = function() {
      ref.authWithPassword({
        email    : self.adminLoginEmail(),
        password : self.adminLoginPassword()
      }, authHandler);
    };

    function authHandler(error, authData) {
      if (error) {
        var n = String(error).includes("user");
        if (n) {
          self.adminLoginErrorString("Make sure you have entered in the right email.");
        } else {
          self.adminLoginErrorString("Make sure you have entered in the right password.");
        }
      } else {
        var loggedInPersonEmail = authData.auth.token.email;
        console.log("Authenticated successfully with payload:", loggedInPersonEmail);
        adminRef.orderByChild("email").equalTo(loggedInPersonEmail).on("value", function(snapshot) {
          //location.href = '/merchants/dashboard';
          var a = snapshot.exists();
          if (a) {
            location.href = '/admin';
          } else {
            // The user does not have access to the admin section of the site
            self.adminLoginErrorString("You do not have the credentials to access the admin section of the Passenger website.")
          }
        });
      }
    };

  };

  var adminLoginObjectVM = new AdminLoginViewModel();
  ko.applyBindings(adminLoginObjectVM,$("#login-section-admin")[0]);

});
