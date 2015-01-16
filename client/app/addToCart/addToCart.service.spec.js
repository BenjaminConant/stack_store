'use strict';

describe('Service: addToCart', function () {

  // load the service's module
  beforeEach(module('stackStoreApp'));

  // instantiate service
  var addToCart;
  beforeEach(inject(function (_addToCart_) {
    addToCart = _addToCart_;
  }));

  it('should do something', function () {
    expect(!!addToCart).toBe(true);
  });

});
