'use strict';

angular.module('stackStoreApp')
  .factory('items', ['$resource', function ($resource) {

    return $resource('/api/items/')

  }]);
