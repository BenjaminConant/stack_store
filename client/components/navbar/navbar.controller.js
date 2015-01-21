'use strict';

angular.module('stackStoreApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, orderItems, getCart, $http, $rootScope) {
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
    
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

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
    console.log($scope.getCurrentUser() + " hey");

    $scope.logout = function() {
      Auth.logout();
      getCart.call();
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
