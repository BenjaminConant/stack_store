'use strict';

describe('Directive: itemThumbnail', function () {

  // load the directive's module and view
  beforeEach(module('stackStoreApp'));
  beforeEach(module('app/itemThumbnail/itemThumbnail.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<item-thumbnail></item-thumbnail>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the itemThumbnail directive');
  }));
});
