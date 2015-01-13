'use strict';

angular.module('stackStoreApp')
  .directive('cartDropdown', function () {
    return {
      templateUrl: 'app/cartDropdown/cartDropdown.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });