'use strict';

angular.module('stackStoreApp')
	.controller('StoreCtrl', function($scope, item, $http, $modal, Auth) {
		var self = this;
		self.allItems = item.query();
		var currentItem = {};
		$scope.newItem = {quantity:1};

		this.openModal = function(item) {
			console.log(item)
			$scope.currentItem = item;
			$modal.open({
				templateUrl:'../../components/modal/itemModal.html',
				scope: $scope
			})
		};

		this.addToCart = function(item) {
			
			// create a line item on the server

			// add that line item to the cart of the current user

			//


		}

	});