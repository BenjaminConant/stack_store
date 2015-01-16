'use strict';

angular.module('stackStoreApp')
  .service('cartTotal', function () {
  	var total = 0;

  	return {
  		adjust : function(amount)
  		{
  			total += amount;
  		},
  		get : function()
  		{
  			return total;
  		},
  		set : function(amount)
  		{
  			total = amount;
  		}
  	}
  });
