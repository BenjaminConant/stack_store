'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function($scope, $http, $window, Auth, getCart, orderItems, cartTotal, $modal) {
    $scope.message = 'Hello';
    $scope.getCart = getCart;
    $scope.orderItems = orderItems;
    $scope.cartTotal = cartTotal;

    window.Stripe.setPublishableKey('pk_test_SfHPLGrI9nwZrQOGPcFCWkzN');


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
        //window.alert('it failed! error: ' + result.error.message);
      } else {
        //window.alert('success! token: ' + result.id);

        $http.put('/api/orders/' + user.cart + '/checkout', user).success(function(order) {
          console.log('I checked out?', order);
          Auth.updateUser(user);
          $scope.getCart.call();
          $window.location.href = '/account';
        })



        if (user.stripeToken) {
          $http.put('/api/users/' + user._id + '/stripetoken', {
            stripeToken: result.id
          }).success(function(user) {
            console.log(user);
          });
        }

      }
      $scope.modal.close()
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