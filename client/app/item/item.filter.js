'use strict';

angular.module('stackStoreApp')
  .filter('item', function () {
  	return function (items, filterInputs) {
  		var catArray = filterInputs.catArray;
  		var liveSearch = filterInputs.liveSearch.toLowerCase();
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
  					var itemPushed = false;
  					var itemCats = [];
  					item.categories.forEach(function(cat){
  						itemCats.push(cat.name);
  					});
  					var pushItem = true;
  					catArray.forEach(function(cat){
  						if (itemCats.indexOf(cat) === -1) {
  							pushItem = false;
  						}
  					})
  					if (pushItem) {
  						outputArray.push(item);
  					}
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
