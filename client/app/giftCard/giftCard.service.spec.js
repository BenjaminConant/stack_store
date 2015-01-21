'use strict';

describe('Service: giftCard', function () {

  // load the service's module
  beforeEach(module('stackStoreApp'));

  // instantiate service
  var giftCard;
  beforeEach(inject(function (_giftCard_) {
    giftCard = _giftCard_;
  }));

  it('should do something', function () {
    expect(!!giftCard).toBe(true);
  });

});
