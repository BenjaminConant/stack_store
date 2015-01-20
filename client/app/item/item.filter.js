'use strict';

angular.module('stackStoreApp')
  .filter('item', function () {
  	return function (items, filterInputs) {
  		var catArray = filterInputs.catArray;
  		var liveSearch = filterInputs.liveSearch.toLowerCase();
  		console.log(liveSearch);
  		var outputArray = [];
  		
  		// handel categories first
  		if (catArray === "all") {
  			items.forEach(function(item){
  				if (item.available) {
  					outputArray.push(item);
  				}
  			});
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
  		}
  		// now handel live search
  		if (liveSearch === "") {
  			return outputArray;
  		} else {
	  		var returnArray = []
	  		outputArray.forEach(function(item, index){
	  			var itemTitle = item.title.toLowerCase();
	  			if (itemTitle.indexOf(liveSearch) !== -1) {
	  				returnArray.push(item);
	  			}
	  		});
	  		return returnArray;
  		}
  	};
  });
