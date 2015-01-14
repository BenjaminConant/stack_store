'use strict';

angular.module('stackStoreApp')
	.controller('StoreCtrl', function($scope, item, $http, $modal, Auth) {
		var self = this;
		self.allItems = item.query();
		var currentItem = {};
		$scope.newItem = {quantity:1};

		this.openModal = function(item) {
			$scope.currentItem = item;
			$scope.modal = $modal.open({
				templateUrl:'../../components/modal/itemModal.html',
				scope: $scope
			})
		};

		this.addToCart = function(item, optionsObj) {
			//find current user
			var user = Auth.getCurrentUser();
			//create temporary frontend object to send as req.body
			var tempLineItem = {
				item: [item._id],
				sender: [user._id],
				receiverName: optionsObj.receiverName,
				receiverEmail: optionsObj.receiverEmail,
				message: optionsObj.message,
				quantity: optionsObj.quantity,
				value: 20, //replace with actual value later
				themeURL: item.image
			}
			// create a line item on the server
			$http.post('/api/lineItems/', tempLineItem).
				success(function(data, status){
				}).
				error(function(data, status){
					console.log('Error Data = ' + data);
					console.log('Error Status = ' + status);
				});


			//if user has a cart: add to cart ONLY DO THIS IN FIRST STEP



			//if user does not have a cart, create cart and add line item


			// add that line item to the cart of the current user
			//Push line item to users cart
			//

			$scope.modal.close(); //this works
		}

	});
