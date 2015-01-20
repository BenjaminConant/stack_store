'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, $http, getCart, orderItems, cartTotal) {
    $scope.message = 'Hello';
    $scope.getCart = getCart;
    $scope.orderItems = orderItems;
    $scope.cartTotal = cartTotal;

    $scope.deleteLineItem = function(lineItem) {
      $http.delete('/api/lineItems/' + lineItem._id)
        .success(function(){
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
