'use strict';

angular.module('stackStoreApp')
  .directive('cart', function () {
    return {
      templateUrl: 'app/cart/cart.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });