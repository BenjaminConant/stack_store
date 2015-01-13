'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.orderItems = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });


    $scope.getLineItems = function () {
    $http.get('/api/lineItems').success(function(lineItems){
      $scope.orderItems = lineItems;
      $scope.cartTotal = 0;
      lineItems.forEach(function(lineItem) {
        $scope.cartTotal += lineItem.value;
      });
      console.log(lineItems);
    });
    }
    $scope.getLineItems();



    $scope.deleteLineItem = function(lineItem) {
      $http.delete('/api/lineItems/' + lineItem._id);
      $scope.getLineItems();
    };



    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };



    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
