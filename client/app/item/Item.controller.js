'use strict';

angular.module('stackStoreApp')

  .controller('ItemCtrl', function ($scope, $routeParams, $http, item, orderItems, cartTotal, addToCart, $window, Auth) {
    //$scope.message = 'Hello';
    var self = this;
    
    self.user = Auth.getCurrentUser();

    self.currentItem = {};
    self.newItem = {
      quantity: 1
    };

    item.get({
      id: $routeParams.id
    }, function(currItem) {
      self.currentItem = currItem;
      console.log("currItem: ", currItem);
      $http.get('/api/items/' + currItem._id + '/reviews').success(function(reviews) {
      $scope.reviews = reviews;
      $scope.averageStars = 0;
      $scope.numReviews = 0;
      reviews.forEach(function(rev) {
        $scope.averageStars += rev.stars;
        $scope.numReviews++;
      })
      $scope.averageStars /= $scope.numReviews;
    })
    });

    


    this.add2Cart = function(item, optionsObj) {
      //debugger;
      addToCart(item, optionsObj);
      //$window.location.href = '/cart';
    }

  });
