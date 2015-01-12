'use strict';

angular.module('stackStoreApp')
  .directive('itemThumbnail', function () {
    return {
      templateUrl: 'app/itemThumbnail/itemThumbnail.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });