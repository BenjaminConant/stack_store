'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var User = require('../user/user.model');
var Order = require('./order.model');

describe('GET /api/orders', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/orders')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should validate that order status is one of the preset values', function(done) {
    var user = new User();

    var numOrders = 0;
    Order.find({}).remove(function() {
      var order1 = new Order({
        user: user._id,
        status: 'cart'
      });
      var order2 = new Order({
        user: user._id,
        status: 'creaTed'
      });
      var order3 = new Order({
        user: user._id,
        status: 'ProCesSing'
      });
      var order4 = new Order({
        user: user._id,
        status: 'CANCELLED'
      });
      var order5 = new Order({
        user: user._id,
        status: 'CompLETED'
      })
      var order6 = new Order({
        user: user._id,
        status: 'Banana'
      })

      order1.save(function(err, data) {
        should(err).not.be.ok;
        numOrders++;
        if (numOrders > 5) {
          done();
        }
      })
      order2.save(function(err, data) {
        should(err).not.be.ok;
        numOrders++;
        if (numOrders > 5) {
          done();
        }
      })
      order3.save(function(err, data) {
        should(err).not.be.ok;
        numOrders++;
        if (numOrders > 5) {
          done();
        }
      })
      order4.save(function(err, data) {
        should(err).not.be.ok;
        numOrders++;
        if (numOrders > 5) {
          done();
        }
      })
      order5.save(function(err, data) {
        should(err).not.be.ok;
        numOrders++;
        if (numOrders > 5) {
          done();
        }
      })
      order6.save(function(err, data) {
        err.should.be.ok;
        numOrders++;
        if (numOrders > 5) {
          done();
        }
      })
    })

  });
});