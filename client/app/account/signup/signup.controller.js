'use strict';

angular.module('stackStoreApp')
  .controller('SignupCtrl', function ($scope, $cookieStore, addToCart, $http, Auth, $location, $window, orderItems) {
    $scope.user = {};
    $scope.errors = {};

    var sctrl = this;
    sctrl.orderItems = orderItems;

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        var oldItemsIds = [];
        var oldItems = sctrl.orderItems.get();

        for (var item in oldItems) {
          oldItemsIds.push(oldItems[item]._id);
        }

        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          
            var newUser = Auth.getCurrentUser();
            var oldCart = $cookieStore.get('ccookie');
            $cookieStore.remove('ccookie');
            if (newUser.$promise) {
              newUser.$promise
                .then(function(user) {
                  //debugger;
                  addToCart(oldItemsIds, [], user);
                  $http.delete('/api/orders/' + oldCart);
                  $location.path('/');
                });
            } else {
              addToCart(oldItemsIds, [], newUser);
              $http.delete('/api/orders/' + oldCart);
              $location.path('/');
            }

          //$location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
