'use strict';

angular.module('stackStoreApp')
  .factory('getCart', function (Auth, $http, orderItems, cartTotal, $cookieStore, $cookies) {
    // Service logic
    // ...
    function cartServerCall(cart) {
      $http.get('/api/orders/' + cart)
        .success(function(data){
          var lineItems = data.orderItems;
          orderItems.set(lineItems);
          cartTotal.set(0);
          lineItems.forEach(function(lineItem){
            cartTotal.adjust(lineItem.value * lineItem.quantity);
          });
        //  return user;
        })
        .error(function(err){
          //debugger;
          // orderItems.set([]);
          // cartTotal.set(0);
        //  return user;
        });
    }

    // Public API here
    return {
      call: function (cb) {
        //debugger;
        var user = Auth.getCurrentUser();
        if(user.$promise){
          user.$promise.then(function(currentUser){
            //debugger;
            // if(cb)
            // {
            //   //debugger;
            //   return cb(cartServerCall(currentUser));
            // }
            // else
            // {
              return cartServerCall(currentUser.cart);
            //}
          });
        } else {
          // //debugger;
          // if(cb)
          // {
          //   //debugger;
          //   return cb(cartServerCall(currentUser));
          // }
          // else
          // {
            if(!user._id){
              var cookie = $cookies.cartCookie || 'noCartZone';
              console.log('COokie ', cookie);
              return cartServerCall(cookie);
            }
            return cartServerCall(user.cart);
          // }
        }
      }
    };
  });
