'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function($scope, $http, socket, Auth, orderItems, cartTotal, getCart, $modal) {

    $scope.awesomeThings = [];
    $scope.getCart = getCart;
    $scope.getCart.call();
    $scope.orderItems = orderItems;
    $scope.cartTotal = cartTotal;

    
    //$scope.showCartDropdown = false;


    // $http.get('/api/things').success(function(awesomeThings, index) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    //$scope.getCart();

    // $scope.getCart = function() {
    //   var user = Auth.getCurrentUser();

    //   if (user.$promise) {
    //     user.$promise.then(function(currentUser) {
    //       cartServerCall(currentUser);
    //       // $http.get('/api/orders/' + currentUser.cart)
    //       //   .success(function(data) {
    //       //     var lineItems = data.orderItems;
    //       //     $scope.orderItems = lineItems;
    //       //     $scope.cartTotal = 0;
    //       //     lineItems.forEach(function(lineItem) {
    //       //       $scope.cartTotal += lineItem.value;
    //       //     });
    //       //   });
    //     });
    //   } else {
    //     cartServerCall(user);
    //     // $http.get('/api/orders/' + user.cart)
    //     //   .success(function(data) {
    //     //     var lineItems = data.orderItems;
    //     //     $scope.orderItems = lineItems;
    //     //     $scope.cartTotal = 0;
    //     //     lineItems.forEach(function(lineItem) {
    //     //       $scope.cartTotal += lineItem.value;
    //     //     });
    //     //   });

    //   }
    // };

    // function cartServerCall(user) {
    //   $http.get('/api/orders/' + user.cart)
    //       .success(function(data) {
    //         console.log('This is the order from the server', data);
    //         var lineItems = data.orderItems;
    //         //$scope.orderItems = lineItems;
    //         $scope.orderItems.set(lineItems);
    //         //$scope.cartTotal = 0;
    //         $scope.cartTotal.set(0);
    //         lineItems.forEach(function(lineItem) {
    //           //$scope.cartTotal += lineItem.value;
    //           $scope.cartTotal.adjust(lineItem.value);
    //         });
    //       });
    // }

    // $scope.getLineItems = function() {
    // $http.get('/api/lineItems').success(function(lineItems) {
    //   $scope.orderItems = lineItems;
    //   $scope.cartTotal = 0;
    //   lineItems.forEach(function(lineItem) {
    //     $scope.cartTotal += lineItem.value;
    //   });
    // });


    //$scope.getLineItems();


    // $scope.toggleShowCartDropdown = function() {
    //   $scope.showCartDropdown = !$scope.showCartDropdown;
    // }


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
