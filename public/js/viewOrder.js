(requireAuth('/login', function() {

  function ViewOrderViewModel() {

      var self = this;

      self.orderInfluencerImage = ko.observable('');
      self.influencerName = ko.observable('');
      self.orderPlaced = ko.observable('');
      self.postingType = ko.observable('');
      self.deadline = ko.observable('');
      self.contentFromInfluencers = ko.observable('');
      self.orderCost = ko.observable('');
      self.orderStatusText = ko.observable('');
      self.orderStatusTextClass = ko.observable('');
      self.orderStatusClass = ko.observable('');
      self.timeUntilDeadline = ko.observable('');

      const campaignID = getQueryVariable('order');
      const influencerID = getQueryVariable('influencer');
      self.orderStatusText(getQueryVariable('orderStatus').replace('%20',' '));

      function getQueryVariable(variable) {
         var query = window.location.search.substring(1);
         var vars = query.split("&");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == variable){return pair[1];}
         }
         return(false);
      }

      var campaignsRef = firebase.database().ref('campaigns/' + campaignID);
      campaignsRef.once("value", function(snapshot) {

        var currentOrder = snapshot.val();

        self.influencerName(currentOrder.influencers[influencerID].name);
        self.orderCost('$' + currentOrder.influencers[influencerID].cost)
        self.orderPlaced(currentOrder.orderDate);
        self.postingType(currentOrder.postingRequirement);
        self.deadline(currentOrder.deadline);
        self.contentFromInfluencers(currentOrder.contentInfo);

        if (self.orderStatusText() == 'Cancelled') {
          self.orderStatusClass('cancelled');
          self.orderStatusTextClass('cancelled-text');
        } else if (self.orderStatusText() == 'Needs Approval') {
          self.orderStatusClass('needs-approval');
          self.orderStatusTextClass('needs-approval-text');
        } else if (self.orderStatusText() == 'Order Again') {
          self.orderStatusText('Completed');
          self.orderStatusTextClass('greyed-out-text');
          self.orderStatusClass('greyed-out');
        } else {
          self.orderStatusClass('greyed-out');
          self.orderStatusTextClass('greyed-out-text');
        }

      });

      var storage = firebase.storage();
      var influencersPathRef = storage.ref('influencers/' + influencerID);
      influencersPathRef.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        self.orderInfluencerImage(url);

      }).catch(function(error) {
        // Handle any errors
      });

  };

    var viewOrderObjectVm = new ViewOrderViewModel();
    ko.cleanNode($("#business-dashboard-view-order-container")[0]);
    ko.applyBindings(viewOrderObjectVm,$("#business-dashboard-view-order-container")[0]);


})); // End of use strict
