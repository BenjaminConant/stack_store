'use strict';

describe('Filter: item', function () {

  // load the filter's module
  beforeEach(module('stackStoreApp'));

  // initialize a new instance of the filter before each test
  var item;
  beforeEach(inject(function ($filter) {
    item = $filter('item');
  }));

  it('should return the input prefixed with "item filter:"', function () {
    var text = 'angularjs';
    expect(item(text)).toBe('item filter: ' + text);
  });

});
