'use strict';

angular.module('stackStoreApp')
  .filter('item', function () {
  	return function (items, catArray) {
  		var outputArray = [];
  		if (catArray === "all") {
  			items.forEach(function(item){
  				if (item.available) {
  					outputArray.push(item);
  				}
  			});
  			return outputArray;
  		} else {
  			items.forEach(function(item){
  				if (item.available) {
  					var itemPushed = false
  					item.categories.forEach(function(cat){
  						if ((catArray.indexOf(cat.name) !== -1) && !itemPushed) {
  							outputArray.push(item);
  							itemPushed = true;
  						}
  					});
  				}
  			});
  			return outputArray;
  		}
  	};
  });
