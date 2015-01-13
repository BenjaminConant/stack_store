'use strict';

angular.module('stackStoreApp')
  .controller('StoreCtrl', function ($scope, item) {
    var self = this;
    self.allItems = item.query();

  });
