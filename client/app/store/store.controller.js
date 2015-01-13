'use strict';

angular.module('stackStoreApp')
	.controller('StoreCtrl', function($scope, item, $http, $modal) {
		var self = this;
		self.allItems = item.query();
		var currentItem = {};

		this.openModal = function(item) {
			console.log(item)
			$scope.currentItem = item;
			$modal.open({
				templateUrl:'../../components/modal/itemModal.html',
				scope: $scope
			})
		}
	});