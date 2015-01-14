'use strict';

angular.module('stackStoreApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    $http.get("/api/categorys").success(function(categories) {
      $scope.categories = categories;
    })


    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.title = "";
    $scope.image = "";
    $scope.description = "";
    $scope.message = "";

    $scope.submitItem = function() {
      $http.post('api/items', {
        title: $scope.title,
        image: $scope.image,
        description: $scope.description,
        defaultMessage: $scope.message,
        categories: $scope.categories
      }).success(function(err, item) {
        if (err) console.log(err);
        console.log(item);
      })
    }

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
