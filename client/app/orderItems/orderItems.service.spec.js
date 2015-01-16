'use strict';

describe('Service: orderItems', function () {

  // load the service's module
  beforeEach(module('stackStoreApp'));

  // instantiate service
  var orderItems;
  beforeEach(inject(function (_orderItems_) {
    orderItems = _orderItems_;
  }));

  it('should do something', function () {
    expect(!!orderItems).toBe(true);
  });

});
