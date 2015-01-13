'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when("/cart", {
        templateUrl: "app/cart/cart.html",
        controller: "MainCtrl"
      });
  });
