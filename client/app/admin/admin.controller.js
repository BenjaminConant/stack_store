'use strict';

angular.module('stackStoreApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    $http.get("/api/categorys").success(function(cat) {
      $scope.cat = cat;
    })

    filepicker.setKey("ACZTMJqmFR7K1eeuAVsurz");



    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.title = "";
    $scope.image = false;
    $scope.description = "";
    $scope.message = "";
    $scope.categories = [];

    $scope.toggleCat = function(cat) {
      if ($scope.categories.indexOf(cat._id) === -1) {
        $scope.categories.push(cat._id)
      } else {
        var index = $scope.categories.indexOf(cat);
        $scope.categories.splice(index, 1)
      }
    }

    $scope.pickFile = function () {
      filepicker.pick(
        function(Blob){
          $scope.image = Blob.url;
          console.log($scope.image);
          $scope.$apply();
        }
      );
    }

    $scope.submitItem = function() {
      $http.post('api/items', {
        title: $scope.title,
        image: $scope.image,
        description: $scope.description,
        defaultMessage: $scope.message,
        categories: $scope.categories
      }).success(function(err, item) {
        if (err) console.log(err);
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
