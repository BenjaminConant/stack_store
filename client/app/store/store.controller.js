'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope, item, $http) {
    var self = this;
    self.allItems = item.query();

  });
