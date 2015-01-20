'use strict';

angular.module('stackStoreApp')
  .controller('AccountInfoCtrl', function ($scope, Auth, $http) {

    $scope.currentUser = Auth.getCurrentUser();
    $scope.orders = [];

    $scope.getOrders = function() {
      $http.get('/api/users/'+$scope.currentUser._id + '/orders').success(function(orders) {
        orders.forEach(function(order) {
          if (order.status !== "cart") {
            order.total = 0;
            order.orderItems.forEach(function(item) {
              order.total += item.value * item.quantity;
            });
            $scope.orders.push(order);
          }
        });
      })
    }
    $scope.getOrders();

    // $scope.orders = [];
    //
    // $scope.getData = function() {
    //   $http.get("/api/categorys").success(function(cat) {
    //     $http.get("/api/items").success(function(items) {
    //       $http.get("/api/orders").success(function(orders){
    //         $scope.orders = [];
    //         orders.forEach(function(order) {
    //           if (order.status !== "pending") {
    //             order.total = 0;
    //             order.orderItems.forEach(function(item) {
    //               order.total += item.value;
    //             });
    //             $scope.orders.push(order);
    //           }
    //         });
    //         $scope.items = items;
    //         $scope.cat = cat;
    //         console.log(orders);
    //       })
    //     })
    //   })
    // }
    // $scope.getData();






  });
