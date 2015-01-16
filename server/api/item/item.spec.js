'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Item = require('./item.model');
var Category = require('../category/category.model');

var cat = new Category({
  name: 'NewCat'
});

describe('GET /api/items', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/items')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should validate the presence of a title', function() {
    Item.find({}).remove(function() {

      var testItem = new Item({
        description: 'hi',
        categories: [cat._id]
      });
      testItem.save(function(err, data) {
        err.should.be.ok;
      })
    });
    Item.find({}).remove(function() {

      var testItem2 = new Item({
        title: 'New Item',
        description: 'New Item Description',
        categories: [cat._id]
      });
      testItem2.save(function(err, data) {
        data.title.should.eql('New Item');
      })
    })
  });

  it('should default to a placekitten image if none is provided', function() {
    var testItem = new Item({});
    testItem.image.should.eql('https://placekitten.com/g/200/300');

    var testItem2 = new Item({
      image: 'test',
      title: 'New Item',
      description: 'New Item Description',
      categories: [cat._id]
    });
    testItem2.image.should.eql('test');
  });

  it('should default to hipster ipsum if no default message is provided', function() {
    var testItem = new Item({});
    testItem.defaultMessage.should.eql('Cold-pressed organic blog swag, Brooklyn pour-over jean shorts butcher skateboard fixie American Apparel hashtag PBR&B Schlitz fap. PBR readymade Thundercats cliche.');

    var testItem2 = new Item({
      defaultMessage: 'test',
      title: 'New Item',
      description: 'New Item Description',
      categories: [cat._id]
    });
    testItem2.defaultMessage.should.eql('test');
  });

  it('should validate the presence of a description', function() {
    Item.find({}).remove(function() {
      var testItem = new Item({
        title: 'hi',
        categories: [cat._id]
      });
      testItem.save(function(err, data) {
        err.should.be.ok;
      })
    });
    Item.find({}).remove(function() {

      var testItem2 = new Item({
        title: 'New Item',
        description: 'New Item Description',
        categories: [cat._id]
      });
      testItem2.save(function(err, data) {
        data.description.should.eql('New Item Description');
      })
    });
  });

  it('should validate the presence of at least 1 category', function() {
    Item.find({}).remove(function() {
      var testItem = new Item({
        title: 'hi',
        description: 'New Item Description'
      });
      testItem.save(function(err, data) {
        err.should.be.ok;
      })
    })
    Item.find({}).remove(function() {

      var testItem2 = new Item({
        title: 'New Item',
        description: 'New Item Description',
        categories: [cat._id]
      });
      testItem2.save(function(err, data) {
        data.categories[0].should.eql(cat._id);
      })
    });
  });

  it('should initialize buyCount to 0', function() {
    var testItem = new Item({});
    testItem.buyCount.should.eql(0);

    var testItem2 = new Item({
      buyCount: 17,
      title: 'New Item',
      description: 'New Item Description',
      categories: [cat._id]
    });
    testItem2.buyCount.should.eql(17);
  })
});