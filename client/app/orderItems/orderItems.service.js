'use strict';

angular.module('stackStoreApp')
  .service('orderItems', function () {
  	var items = [];

  	return {
  		push: function(item)
  		{
  			items.push(item);
  		},
  		get: function()
  		{
  			return items;
  		},
  		set: function(oItems)
  		{
  			items = oItems;
  		}
  	}
  });
