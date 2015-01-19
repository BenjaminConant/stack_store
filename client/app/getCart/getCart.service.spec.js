'use strict';

describe('Service: getCart', function () {

  // load the service's module
  beforeEach(module('stackStoreApp'));

  // instantiate service
  var getCart;
  beforeEach(inject(function (_getCart_) {
    getCart = _getCart_;
  }));

  it('should do something', function () {
    expect(!!getCart).toBe(true);
  });

});
