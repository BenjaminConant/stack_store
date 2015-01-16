'use strict';

describe('Service: cartTotal', function () {

  // load the service's module
  beforeEach(module('stackStoreApp'));

  // instantiate service
  var cartTotal;
  beforeEach(inject(function (_cartTotal_) {
    cartTotal = _cartTotal_;
  }));

  it('should do something', function () {
    expect(!!cartTotal).toBe(true);
  });

});
