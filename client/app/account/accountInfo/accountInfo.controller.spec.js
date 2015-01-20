'use strict';

describe('Controller: AccountInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('stackStoreApp'));

  var AccountInfoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountInfoCtrl = $controller('AccountInfoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
