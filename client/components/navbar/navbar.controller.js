'use strict';

angular.module('stackStoreApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, orderItems, getCart, $http, $rootScope, cartTotal) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.selectedCats= "all";
    $scope.liveSearch = "";

    getCart.call();

    $scope.changeLiveSearch = function (liveSearch) {
      $rootScope.$broadcast('liveSearchChange', liveSearch);
    }

    $scope.addRemoveCat = function (thing) {
      if ($scope.selectedCats === "all") {
        $scope.selectedCats = [thing];
      } else {
        if ($scope.selectedCats.indexOf(thing) !== -1) {
          $scope.selectedCats.splice($scope.selectedCats.indexOf(thing), 1);
          if($scope.selectedCats.length === 0) {
            $scope.selectedCats = "all";
          }
        } else {
          $scope.selectedCats.push(thing);
        }
      }
      $rootScope.$broadcast('selectedCatsChange', $scope.selectedCats)
    }


    $scope.cats = [1,2,3];

    var getCategories = function () {
      $http.get('api/categorys').success(function(cats) {
        $scope.cats = cats;
      });
    };
    getCategories();

    $scope.giftCardValue;



    $scope.buyGiftCard = function () {
      console.log($scope.giftCardValue);
      var code = makeid();
      alert("you have purcahsed a new gift card for " + $scope.giftCardValue + ". Your redeem code is "+ code +".");
    }

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.showCartDropdown = false;
    $scope.orderItems = orderItems;

    $scope.logout = function() {
      Auth.logout();
      orderItems.set([]);
      cartTotal.set(0);
      $location.path('/login');
    };

    $scope.adminChecker = function(){
      return Auth.isAdmin();
    }


    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleShowCartDropdown = function() {
      $scope.showCartDropdown = !$scope.showCartDropdown;
    }



  });
