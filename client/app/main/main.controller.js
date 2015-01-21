'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function($scope, $http, socket, Auth, orderItems, cartTotal, getCart, $cookieStore) {

    $scope.awesomeThings = [];
    $scope.getCart = getCart;
    $scope.getCart.call();
    $scope.orderItems = orderItems;
    $scope.cartTotal = cartTotal;
    $scope.giftCardAmount = 0;
    $scope.giftCardShow = false;

    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };
    // "G7jzP"

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    $scope.giftCardCode = "";
    //
    // $scope.$watch('giftCardCode', function() {
    //   console.log($scope.giftCardCode);
    // })

    $scope.submitGiftCard = function() {
      $http.get('/api/giftcards/verify/' + $scope.giftCardCode).success(function(code) {
        if (code) {
          $scope.giftCardAmount = code.value;
          $scope.giftCardShow = true;
        } else {
          alert("Not a valid code!")
        }

      })
    }

    /**
    * This file controls the page logic
    *
    * depends on jQuery>=1.7
    */

      /**
      * Returns true if this browser supports canvas
      *
      * From http://diveintohtml5.info/
      */

})
