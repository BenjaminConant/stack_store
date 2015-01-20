'use strict';

angular.module('stackStoreApp')
  .controller('AccountInfoCtrl', function ($scope, Auth, $http, $modal) {

    $scope.currentUser = Auth.getCurrentUser();
    $scope.currentItem;
    $scope.review = {};


    $scope.getOrders = function() {
      $http.get('/api/users/'+$scope.currentUser._id + '/orders').success(function(orders) {
        $scope.orders = [];
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

    $scope.openModal = function(item) {
      $scope.currentItem = item;
      $scope.modal = $modal.open({
        templateUrl: '../../components/modal/reviewModal.html',
        scope: $scope
      })
    };

    $scope.submitReview = function() {
      console.log("getting called");
      $scope.review.author = $scope.currentUser._id;
      $scope.review.item = $scope.currentItem._id;
      $http.post('/api/reviews', $scope.review).success(function(review) {
        $scope.review.stars = '';
        $scope.review.text = '';
        alert("Successfully added to database!")
        console.log(review);
      })
      $scope.modal.close();
    }

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
