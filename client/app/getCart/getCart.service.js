'use strict';

angular.module('stackStoreApp')
  .factory('getCart', function(Auth, $http, orderItems, cartTotal, $cookieStore) {
    // Service logic
    // ...
    function cartServerCall(cart) {
      $http.get('/api/orders/' + cart)
        .success(function(data) {
          var lineItems = data.orderItems;
          orderItems.set(lineItems);
          cartTotal.set(0);
          lineItems.forEach(function(lineItem) {
            cartTotal.adjust(lineItem.value * lineItem.quantity);
          });
          //  return user;
        })
        .error(function(err) {
          if (Auth.getCurrentUser() == {}) {
            cartTotal.set(0);
            orderItems.set([]);
          }
        });
    }

    // Public API here
    return {
      call: function(cb) {
        var user = Auth.getCurrentUser();
        if (user.$promise) {
          user.$promise.then(function(currentUser) {
            return cartServerCall(currentUser.cart);
          });
        } else {
          if (!user._id) {
            var cookie = $cookieStore.get('ccookie');
            cookie = cookie || 'noCartZone';
            console.log('COokie ', cookie);
            return cartServerCall(cookie);
          }
          return cartServerCall(user.cart);
        }
      }
    };
  });