(requireAuth('/login', function() {

  function BusinessOrdersViewModel() {

    var self = this;

    self.visibleOrdersList = ko.observableArray([]);
    self.ordersInReview = ko.observableArray([]);
    self.activeOrders = ko.observableArray([]);
    self.ordersNeedingApproval = ko.observableArray([]);
    self.ordersDelivered = ko.observableArray([]);
    self.ordersCompleted = ko.observableArray([]);
    self.ordersCancelled = ko.observableArray([]);

    const orderType = location.href.substr(location.href.lastIndexOf('/') + 1);

    // Set up all of the data for the orders view

    var business = firebase.auth().currentUser;
    var businessID = business.uid;
    var campaignsRef = firebase.database().ref('campaigns');

    campaignsRef.orderByChild("business").equalTo(businessID).once("value", function(snapshot) {

      var ordersList = snapshot.val();

      for (order in ordersList) {
        self.loadInfluencerOrderPictures(order, ordersList);
      }

    });

    self.loadInfluencerOrderPictures = function(order, ordersList) {
      var orderToAdd = {};
      var influencerKey;
      for (key in ordersList[order].influencers) {
        orderToAdd["cost"] = ordersList[order].influencers[key].cost;
        orderToAdd["influencerName"] = ordersList[order].influencers[key].name;
        orderToAdd["influencerID"] = key;
        influencerKey = key;
      }

      var storage = firebase.storage();
      var influencersPathRef = storage.ref('influencers/' + influencerKey);
      influencersPathRef.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        orderToAdd["order"] = ordersList[order];
        orderToAdd["orderID"] = order;

        if (ordersList[order].cancelled) {
          // This order was cancelled
          orderToAdd["status"] = "Cancelled";
          orderToAdd["statusClass"] = "red-out"
          self.ordersCancelled.push(orderToAdd);
        } else if (ordersList[order].orderDelivered) {
          // The order has been approved by the business
          orderToAdd["status"] = "Needs Approval";
          orderToAdd["statusClass"] = "orange-button";
          self.ordersNeedingApproval.push(orderToAdd);
        } else if (ordersList[order].orderAccepted) {
          // The order has been submitted by the business
          orderToAdd["status"] = "Delivered";
          orderToAdd["statusClass"] = "greyed-out";
          self.ordersDelivered.push(orderToAdd);
        } else if (!ordersList[order].active && ordersList[order].finished) {
          // The order is finished
          orderToAdd["status"] = "Order Again";
          orderToAdd["statusClass"] = "order-again";
          self.ordersCompleted.push(orderToAdd);
        } else if (!ordersList[order].active && !ordersList[order].finished) {
          // The order is in review
          orderToAdd["status"] = "In Review";
          orderToAdd["statusClass"] = "greyed-out";
          self.ordersInReview.push(orderToAdd);
        } else if (ordersList[order].active && !ordersList[order].finished){
          // The order is active
          orderToAdd["status"] = "Active";
          orderToAdd["statusClass"] = "greyed-out";
          self.activeOrders.push(orderToAdd);
        }
        // This can be downloaded directly:
        orderToAdd["influencerImage"] = url;

        self.visibleOrdersList(self.ordersInReview());
        orderToAdd = {};
      }).catch(function(error) {
        // Handle any errors
      });
    };

    self.showSpecificOrderInformation = function orderClicked(order) {
      console.log(order);
      location.href = '/business/order?order=' + order.orderID + '&influencer=' + order.influencerID + '&orderStatus=' + order.status;
    };

    self.changeOrderList = function orderLinkClicked(d,e) {
      const orderLinkText = $(e.currentTarget).text();
      $('.active-order-type').removeClass('active-order-type');
      $(e.currentTarget).addClass('active-order-type');
      if (orderLinkText == "In Review") {
        self.visibleOrdersList(self.ordersInReview());
      } else if (orderLinkText == "Active") {
        self.visibleOrdersList(self.activeOrders());
      } else if (orderLinkText == "Needs Approval") {
        self.visibleOrdersList(self.ordersNeedingApproval());
      } else if (orderLinkText == "Delivered") {
        self.visibleOrdersList(self.ordersDelivered());
      } else if (orderLinkText == "Completed") {
        self.visibleOrdersList(self.ordersCompleted());
      } else {
        self.visibleOrdersList(self.ordersCancelled());
      }
    };

  };

  var businessOrdersObjectVm = new BusinessOrdersViewModel();
  ko.cleanNode($("#business-dashboard-orders-container")[0]);
  ko.applyBindings(businessOrdersObjectVm,$("#business-dashboard-orders-container")[0]);

})); // End of use strict
