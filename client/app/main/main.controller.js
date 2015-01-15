'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.orderItems = [];
    $scope.showCartDropdown = false;


    // $http.get('/api/things').success(function(awesomeThings, index) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    $scope.getCart = function() {
      var user = Auth.getCurrentUser();

      if (user.$promise) {
        user.$promise.then(function(currentUser) {
          cartServerCall(currentUser);
          // $http.get('/api/orders/' + currentUser.cart)
          //   .success(function(data) {
          //     var lineItems = data.orderItems;
          //     $scope.orderItems = lineItems;
          //     $scope.cartTotal = 0;
          //     lineItems.forEach(function(lineItem) {
          //       $scope.cartTotal += lineItem.value;
          //     });
          //   });
        });
      } else {
        cartServerCall(user);
        // $http.get('/api/orders/' + user.cart)
        //   .success(function(data) {
        //     var lineItems = data.orderItems;
        //     $scope.orderItems = lineItems;
        //     $scope.cartTotal = 0;
        //     lineItems.forEach(function(lineItem) {
        //       $scope.cartTotal += lineItem.value;
        //     });
        //   });

      }
    };
    $scope.getCart();

    function cartServerCall(user) {
      $http.get('/api/orders/' + user.cart)
          .success(function(data) {
            console.log('This is the order from the server', data);
            var lineItems = data.orderItems;
            $scope.orderItems = lineItems;
            $scope.cartTotal = 0;
            lineItems.forEach(function(lineItem) {
              $scope.cartTotal += lineItem.value;
            });
          });
    }

    // $scope.getLineItems = function() {
    // $http.get('/api/lineItems').success(function(lineItems) {
    //   $scope.orderItems = lineItems;
    //   $scope.cartTotal = 0;
    //   lineItems.forEach(function(lineItem) {
    //     $scope.cartTotal += lineItem.value;
    //   });
    // });


    //$scope.getLineItems();

    $scope.deleteLineItem = function(lineItem) {
      $http.delete('/api/lineItems/' + lineItem._id);
      $scope.getLineItems();
    };

    $scope.updateLineItemQuantity = function(lineItem) {
      console.log(lineItem);
      $http.put('/api/lineItems/' + lineItem._id, lineItem);
    }

    $scope.editLineItem = function(lineItem) {
      console.log(lineItem);
    }


    $scope.toggleShowCartDropdown = function() {
      $scope.showCartDropdown = !$scope.showCartDropdown;
    }


    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: $scope.newThing
      });
      $scope.newThing = '';
    };



    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  });