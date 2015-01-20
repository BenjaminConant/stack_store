'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var Review = require('../review/review.model');

// Get list of items
exports.index = function(req, res) {
  Item.find(function(err, items) {
    if (err) {
      return handleError(res, err);
    }
    Item.populate(items, 'categories', function() {
      return res.json(200, items);
    })
  });
};

// Get a single item
exports.show = function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err) {
      return handleError(res, err);
    }
    if (!item) {
      return res.send(404);
    }
    return res.json(item);
  });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Item.create(req.body, function(err, item) {
    if (err) {
      return res.json(422, err);
      //return handleError(res, err);
    }
    return res.json(201, item);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  console.log(req.body);
  if (req.body._id) {
    delete req.body._id;
  }
  Item.findById(req.params.id, function(err, item) {
    if (err) {
      return handleError(res, err);
    }
    if (!item) {
      return res.send(404);
    }
    var updated = _.merge(item, req.body);
    updated.categories = req.body.categories;
    updated.markModified('categories');
    updated.save(function(err, updatedItem, numModified) {
      if (err) {
        return res.json(422, err);
        //return handleError(res, err);
      }
      return res.json(200, updatedItem);
    });
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (err) {
      return handleError(res, err);
    }
    if (!item) {
      return res.send(404);
    }
    item.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.findReview = function(req, res) {
  Review.findOne({
    author: req.params.userId,
    item: req.params.itemId
  }, function(err, review) {
    console.log(review)
    if (err) {
      return handleError(res, err);
    }
    if (!review) {
      return res.json(200, false);
    } else {
      console.log('this review is already here: ', review);
      return res.json(200, review);
    }
  });
}

exports.findAllReviews = function(req, res) {
  Review.find({item:req.params.id}).exec(function(err, reviews){
    console.log(reviews);
    return res.json(200, reviews);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}