'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var LineItem = require('./lineItem.model');
var User = require('../user/user.model');
var Item = require('../item/item.model');

describe('GET /api/lineItems', function() {

  // beforeEach(function() {
  //   var user = new User();
  //   var item = new Item();
  //   var email = 'test@test.com';
  // })

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/lineItems')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should validate the presence of an item', function() {
    var user = new User();
    var item = new Item();
    var email = 'test@test.com';
    var testLineItem = new LineItem({
      sender: user._id,
      receiverEmail: email
    });
    testLineItem.save(function(err, data) {
      err.should.be.ok;
    });
    var testLineItem2 = new LineItem({
      item: item._id,
      sender: user._id,
      receiverEmail: email
    });
    testLineItem2.save(function(err, data) {
      data.item.should.eql(item._id);
    });
  });

  it('should validate the presence of an sender', function() {
    var user = new User();
    var item = new Item();
    var email = 'test@test.com';
    var testLineItem = new LineItem({
      item: item._id,
      receiverEmail: email
    });
    testLineItem.save(function(err, data) {
      err.should.be.ok;
    });
    var testLineItem2 = new LineItem({
      item: item._id,
      sender: user._id,
      receiverEmail: email
    });
    testLineItem2.save(function(err, data) {
      data.sender.should.eql(user._id);
    });
  });

  it('should validate the presence of the receiver email', function() {
    var user = new User();
    var item = new Item();
    var email = 'test@test.com';
    var testLineItem = new LineItem({
      item: item._id,
      sender: user._id
    });
    testLineItem.save(function(err, data) {
      err.should.be.ok;
    });
    var testLineItem2 = new LineItem({
      item: item._id,
      sender: user._id,
      receiverEmail: email
    });
    testLineItem2.save(function(err, data) {
      data.receiverEmail.should.eql(email);
    });
  });

  it('should default the value to 2500', function() {
    var testLineItem = new LineItem({});
    testLineItem.value.should.eql(2500);

    var testLineItem2 = new LineItem({
      value: 500
    });
    testLineItem2.value.should.eql(500);
  });

  it('should validate that the value is an integer', function() {
    var user = new User();
    var item = new Item();
    var email = 'test@test.com';
    var testLineItem = new LineItem({
      item: item._id,
      sender: user._id,
      receiverEmail: email,
      value: 25.50
    });
    testLineItem.save(function(err, data) {
      err.should.be.ok;
    })

  });

  it('should default the quantity to 1', function() {
    var testLineItem = new LineItem({});
    testLineItem.quantity.should.eql(1);

    var testLineItem2 = new LineItem({
      quantity: 5
    });
    testLineItem2.quantity.should.eql(5);
  });
});