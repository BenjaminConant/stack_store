'use strict';

angular.module('stackStoreApp')
  .factory('item', ['$resource', function ($resource) {
    return $resource('/api/items/:id', {id : '@id'});
  }]);
