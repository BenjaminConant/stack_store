'use strict';

angular.module('stackStoreApp')
  .controller('ItemCtrl', function ($scope, $routeParams, item, orderItems, cartTotal, addToCart, $window, Auth) {
    //$scope.message = 'Hello';
    var self = this;
    
    self.user = Auth.getCurrentUser();

    self.currentItem = {};
  	self.newItem = {
    	quantity: 1
  	};    

    item.get({id:$routeParams.id}, function(currItem){
    	self.currentItem = currItem;
    });

  	this.add2Cart = function(item, optionsObj)
  	{
      //debugger;
    	addToCart(item, optionsObj);
    	//$window.location.href = '/cart';
    }    

  });
