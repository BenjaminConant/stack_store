'use strict';

angular.module('stackStoreApp')
  .factory('item', ['$resource', function ($resource) {

    var Item = $resource('http:localhost:3000/api/items')
    // Public API here
    return Item;
  }]);
