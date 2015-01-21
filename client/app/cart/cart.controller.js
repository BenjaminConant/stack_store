'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, $http, getCart, orderItems, cartTotal, $modal) {
    $scope.message = 'Hello';
    $scope.getCart = getCart;
    $scope.orderItems = orderItems;
    $scope.cartTotal = cartTotal;

    window.Stripe.setPublishableKey('pk_test_SfHPLGrI9nwZrQOGPcFCWkzN');


    $scope.openCheckout = function () {
      console.log("Hello");
      $scope.modal = $modal.open({
        templateUrl: "../../components/modal/stripeModal.html",
        scope: $scope
      })
    }

    $scope.stripeCallback = function (code, result) {
      if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
        $scope.modal.close()
      } else {
        window.alert('success! token: ' + result.id);
        console.log($scope.orderItems.get());
        $scope.modal.close()
      }
    };



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
