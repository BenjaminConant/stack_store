'use strict';

describe('Directive: cartDropdown', function () {

  // load the directive's module and view
  beforeEach(module('stackStoreApp'));
  beforeEach(module('app/cartDropdown/cartDropdown.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cart-dropdown></cart-dropdown>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cartDropdown directive');
  }));
});