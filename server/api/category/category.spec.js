'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Category = require('./category.model');

describe('GET /api/categorys', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/categorys')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should set popularity to a default value of 1 if none is provided', function() {
    var testCat = new Category({});
    testCat.popularity.should.eql(1);

    var testCat2 = new Category({
      popularity: 5
    });
    testCat2.popularity.should.eql(5);
  });

  it('should validate the presence of a name', function() {
    var testCat = new Category({});
    testCat.save(function(err, data) {
      err.should.be.ok;
    });
    Category.find({}).remove(function() {

      var testCat2 = new Category({
        name: 'Good'
      });
      testCat2.save(function(err, data) {
        data.name.should.eql('Good');
      });
    })
  })


});