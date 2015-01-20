'use strict';

angular.module('stackStoreApp')

.controller('StoreCtrl', function($scope, items, orderItems, cartTotal, addToCart, $http, $modal, Auth, $window) {
  var self = this;
  self.allItems = items.query();
  self.available = {available:true};
  self.cats = "all"
  self.liveSearch = "";
  $scope.$on('selectedCatsChange', function(event, mass) { 
    self.cats = mass;
  });

  $scope.$on('liveSearchChange', function(event, mass) { 
    self.liveSearch = mass;
  });



  //var user = Auth.getCurrentUser();

  // if (user.$promise) {
  // 	console.log('User has a promise!');
  // 	user.$promise.then(function(currentUser){

  // 			$http.get('/api/orders/' + currentUser.cart)
  // 			.success(function(data){
  // 				self.cart = data.orderItems;
  // 			});
  // 	});
  // } else {
  // 	console.log("User doesn't have a promise")
  // 	$http.get('/api/orders/' + user.cart)
  // 	.success(function(data){
  // 		self.cart = data.orderItems;
  // 	});
  // }

  //console.log(user);
  //console.log(user.cart);

  var currentItem = {};
  $scope.newItem = {
    quantity: 1
  };

  this.openModal = function(item) {
    $scope.currentItem = item;
    $scope.user = Auth.getCurrentUser();
    $scope.modal = $modal.open({
      templateUrl: '../../components/modal/itemModal.html',
      scope: $scope
    })
  };



  this.add2Cart = function(item, optionsObj)
  {
    addToCart(item, optionsObj);
    $scope.modal.close();
  }

  self.productView = function()
  {
    //$window.location.href = '/item/' + $scope.currentItem._id;
    $scope.modal.close();
  }

  // this.addToCart = function(item, optionsObj) {
  //   //find current user
  //   var user = Auth.getCurrentUser();
  //   //create temporary frontend object to send as req.body
  //   var tempLineItem = {
  //     item: item._id,
  //     sender: user._id,
  //     receiverName: optionsObj.receiverName,
  //     receiverEmail: optionsObj.receiverEmail,
  //     message: optionsObj.message,
  //     quantity: optionsObj.quantity,
  //     value: 20 //, //replace with actual value later
  //       // themeURL: item.image
  //   }


  //   //if user has a cart: add to cart ONLY DO THIS IN FIRST STEP



  //   //if user does not have a cart, create cart and add line item


  //   // add that line item to the cart of the current user
  //   //Push line item to users cart
  //   //

  //   $http.post('/api/lineItems/', tempLineItem)
  //     .success(function(newLineItem, status) {
  //       //newLineItem.item = item;
  //       //$scope.orderItems.push(newLineItem);
  //       orderItems.push(newLineItem);
  //       //$scope.cartTotal += newLineItem.value;
  //       cartTotal.adjust(newLineItem.value);
  //     });

  //     // .error(function(data, status) {
  //     //   console.log('Error Data = ' + data);
  //     //   console.log('Error Status = ' + status);
  //     // });
  //   $scope.modal.close(); //this works
  // }

});
