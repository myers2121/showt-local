(requireAuth('/login', function() {

  function BusinessInboxViewModel() {

    var self = this;

    self.conversationsList = ko.observableArray([]);
    self.currentInfluencerName = ko.observable('');
    self.currentInfluencerImageLocation = ko.observable('');
    self.currentConversationMessages = ko.observableArray([]);

    const $messagesPopUp = $('.business-inbox-messages-container');
    const $messagesContainer = $('.inbox-message-container-middle');

    var business = firebase.auth().currentUser;
    var businessID = business.uid;
    var inboxRef = firebase.database().ref('businesses/' + businessID + '/inbox');

    inboxRef.on("child_added", function(snapshot) {

      getConversationData(snapshot.key);

    });

    function getConversationData(conversationID) {
        var conversationsRef = firebase.database().ref('conversations/' + conversationID);
        conversationsRef.on('value', function(snapshot) {

          self.conversationsList.push(snapshot.val());

        });
    };

    self.influencerMessageClicked = function(currentConversation) {
      self.currentConversationMessages([]);
      self.currentInfluencerName(currentConversation.influencerName);
      self.currentInfluencerImageLocation(currentConversation.influencerImageLocation);

      for (message in currentConversation.messages) {
        var currentMessage = currentConversation.messages[message];

        if (currentMessage.sender == "influencer") {
          currentMessage["imageClass"] = "show-message-image";
          currentMessage["messageTypeClass"] = "influencer-message";
          currentMessage["textClass"] = "influencer-popup-message-container";
        } else {
          currentMessage["imageClass"] = "dont-show-message-image";
          currentMessage["messageTypeClass"] = "business-message";
          currentMessage["textClass"] = "business-message-container";
        }
        self.currentConversationMessages.push(currentMessage);
      }

      $('body').css('overflow','hidden');
      $messagesPopUp.fadeIn();
      $(".inbox-message-container-middle").animate({ scrollTop: $('.inbox-message-container-middle').prop("scrollHeight")}, 10);

    };

    self.closeInfluencerMessageContainer = function() {
      $('body').css('overflow','auto');
      $messagesPopUp.fadeOut();
    };

  };

  var businessInboxObjectVm = new BusinessInboxViewModel();
  ko.cleanNode($("#business-dashboard-inbox-container")[0]);
  ko.applyBindings(businessInboxObjectVm,$("#business-dashboard-inbox-container")[0]);

})); // End of use strict
