'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function($scope, $http, $window, Auth, getCart, orderItems, cartTotal, $modal) {
    $scope.message = 'Hello';
    $scope.getCart = getCart;
    $scope.orderItems = orderItems;
    $scope.cartTotal = cartTotal;

    window.Stripe.setPublishableKey('pk_test_SfHPLGrI9nwZrQOGPcFCWkzN');

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 1000; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }

    $scope.openCheckout = function() {
      console.log("Hello");
      $scope.modal = $modal.open({
        templateUrl: "../../components/modal/stripeModal.html",
        scope: $scope
      })
    }

    $scope.stripeCallback = function(code, result) {
      var user = Auth.getCurrentUser();
      if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
      } else {
        window.alert('success! token: ' + result.id);

        $http.put('/api/orders/' + user.cart + '/checkout', user).success(function(order) {
          Auth.updateUser(user);
          $scope.getCart.call();
          $window.location.href = '/account';
        })

        if (user.stripeToken) {
          $http.put('/api/users/' + user._id + '/stripetoken', {
            stripeToken: result.id
          }).success(function(user) {
          });
        }

        //This is where we want to send email
        $http.post('/api/giftcards', {value: $scope.cartTotal.get(), code: makeid()}).success(function(giftcard) {
          $http.post('/api/giftcards/email', {code: giftcard.code, lineItems: $scope.orderItems.get()})

        })



      }
    };



    $scope.deleteLineItem = function(lineItem) {
      $http.delete('/api/lineItems/' + lineItem._id)
        .success(function() {
          $scope.getCart.call();
        });
    };

    $scope.updateLineItemQuantity = function(lineItem) {
      console.log(lineItem);
      $http.put('/api/lineItems/' + lineItem._id, lineItem);
    }

    $scope.editLineItem = function(lineItem) {
      console.log(lineItem);
    }

    $scope.getCart.call();
  });
