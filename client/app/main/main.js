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
        controller: "CartCtrl"
      })
      .when("/item/:id", {
        templateUrl: "app/item/item.html",
        controller: "ItemCtrl as Item"
      })
      .when('/giftcards', {
        templateUrl: 'app/giftCards/giftCards.html',
        controller: "MainCtrl"
      });
  });
