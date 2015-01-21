'use strict';

angular.module('stackStoreApp')
  .controller('LoginCtrl', function($scope, $q, Auth, $http, $cookieStore, $location, $window, orderItems, getCart, addToCart) {
    $scope.user = {};
    $scope.errors = {};

    var lctrl = this;
    lctrl.orderItems = orderItems;
    lctrl.getCart = getCart;

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {

        var oldItemsIds = [];
        var oldItems = lctrl.orderItems.get();

        //console.log(oldItems);

        for (var item in oldItems) {
          oldItemsIds.push(oldItems[item]._id);
        }

        Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then(function() {
            // Logged in, redirect to home
            // var user = Auth.getCurrentUser();
            //debugger;
            // if(user.$promise){
            //   user.$promise.then(function(currentUser){
            //     addToCart(oldItems, [], currentUser);
            //     $location.path('/');
            //   });
            // } else {
            //   addToCart(oldItems, [], user);
            //   $location.path('/');
            // }

            // function asyncGetCart() {
            //   return $q(function(resolve, reject){
            //     getCart.call(function(user){
            //       if(user)
            //       {
            //         resolve(user);
            //       }
            //     })
            //   });
            // }

            //debugger;

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

            // getCart.call(function(user){
            //   debugger;
            //   addToCart(oldItemsIds, [], user);
            //   $location.path('/');
            // })
            // var promise = $q(function(resolve, reject)
            // {
            //   var user = getCart.call(function(user)
            //   {
            //     if(user)
            //     {
            //       resolve(user);
            //     }
            //   });
            // });

            // var promise = asyncGetCart();

            // promise.then(function(user){
            //   addToCart(oldItemsIds, [], user);
            //   $location.path('/');
            // })

            //getCart.call()


            // .then(function(user){
            //   addToCart(oldItemsIds, [], user);
            //   $location.path('/');
            // })
            /*
            Merge Cart
            */
            // lctrl.getCart.call()
            //   .then(function(){
            //     if(oldItems)
            //     {
            //       for item in oldItems
            //       {
            //         lctrl.orderItems.push(item);
            //       }
            //     }
            //   });
          })
          .catch(function(err) {
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });