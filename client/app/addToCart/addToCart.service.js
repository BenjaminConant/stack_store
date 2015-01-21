'use strict';

angular.module('stackStoreApp')
  .factory('addToCart', ['Auth', '$http', 'orderItems', 'cartTotal', '$cookieStore', function (Auth, $http, orderItems, cartTotal, $cookieStore) {
    return function(item, optionsObj, newUser) {

      if(newUser)
	    {
        $http.put('/api/orders/'+newUser.cart, item)
	    		.success(function(newCart){
	    			return;
	    		})
	    		.error(function(){
	    		});

	    	return;
	    }

	  var user = Auth.getCurrentUser();
	    //create temporary frontend object to send as req.body
      var cookie;
      if(!user._id){
        cookie = $cookieStore.get('ccookie');
      }

	    var tempLineItem = {
	      item: item._id,
	      sender: user._id || null,
	      senderName: user.name || optionsObj.senderName,
	      senderEmail: user.email || optionsObj.senderEmail,
	      receiverName: optionsObj.receiverName,
	      receiverEmail: optionsObj.receiverEmail,
	      message: optionsObj.message,
          cartId: user.cart || cookie || 'noCartZone',
	      quantity: optionsObj.quantity,
	      value: 20 //, //replace with actual value later
	        // themeURL: item.image
	    }

	    $http.post('/api/lineItems/', tempLineItem)
	      .success(function(returnedObj, status) {
          	if(!tempLineItem.sender && !cookie) {
            	$cookieStore.put('ccookie', returnedObj.orderId);
          	}

		    orderItems.push(returnedObj.lineItem);
	        cartTotal.adjust(returnedObj.lineItem.value * returnedObj.lineItem.quantity);
	      });

	}
}]);
