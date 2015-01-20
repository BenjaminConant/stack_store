'use strict';

angular.module('stackStoreApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/account', {
        templateUrl: 'app/account/accountInfo/accountInfo.html',
        controller: 'AccountInfoCtrl'
      });
  });
