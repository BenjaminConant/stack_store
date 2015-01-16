'use strict';

describe('Controller: AccordionCtrl', function () {

  // load the controller's module
  beforeEach(module('stackStoreApp'));

  var AccordionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccordionCtrl = $controller('AccordionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
