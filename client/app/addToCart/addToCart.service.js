'use strict';

angular.module('stackStoreApp')
  .factory('addToCart', ['Auth', '$http', 'orderItems', 'cartTotal', function (Auth, $http, orderItems, cartTotal) {
    return function(item, optionsObj) {
	    //find current user
	    var user = Auth.getCurrentUser();
	    //create temporary frontend object to send as req.body
	    var tempLineItem = {
	      item: item._id,
	      sender: user._id,
	      receiverName: optionsObj.receiverName,
	      receiverEmail: optionsObj.receiverEmail,
	      message: optionsObj.message,
	      quantity: optionsObj.quantity,
	      value: 20 //, //replace with actual value later
	        // themeURL: item.image
	    }


	    //if user has a cart: add to cart ONLY DO THIS IN FIRST STEP



	    //if user does not have a cart, create cart and add line item


	    // add that line item to the cart of the current user
	    //Push line item to users cart
	    //

	    $http.post('/api/lineItems/', tempLineItem)
	      .success(function(newLineItem, status) {
	        //newLineItem.item = item;
	        //$scope.orderItems.push(newLineItem);
	        orderItems.push(newLineItem);
	        //$scope.cartTotal += newLineItem.value;
	        cartTotal.adjust(newLineItem.value);
	      });
	 
	      // .error(function(data, status) {
	      //   console.log('Error Data = ' + data);
	      //   console.log('Error Status = ' + status);
	      // });
	    //$scope.modal.close(); //this works
	}
}]);