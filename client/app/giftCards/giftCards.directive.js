'use strict';

angular.module('stackStoreApp')
  .directive('giftCards', function () {
    return {
      templateUrl: 'app/giftCards/giftCards.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });