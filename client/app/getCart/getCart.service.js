'use strict';

angular.module('stackStoreApp')
  .factory('getCart', function (Auth, $http, orderItems, cartTotal) {
    // Service logic
    // ...
    function cartServerCall(user) {
      $http.get('/api/orders/' + user.cart)
        .success(function(data){
          //debugger;
          var lineItems = data.orderItems;
          orderItems.set(lineItems);
          cartTotal.set(0);
          lineItems.forEach(function(lineItem){
            cartTotal.adjust(lineItem.value * lineItem.quantity);
          });
        });
    }

    // Public API here
    return {
      call: function () {
        var user = Auth.getCurrentUser();
        if(user.$promise){
          user.$promise.then(function(currentUser){
            cartServerCall(currentUser);
          });
        } else {
          cartServerCall(user);
        }
      }
    };
  });
