'use strict';

var _ = require('lodash');
var Giftcard = require('./giftcard.model');

// Get list of giftcards
exports.index = function(req, res) {
  Giftcard.find(function (err, giftcards) {
    if(err) { return handleError(res, err); }
    return res.json(200, giftcards);
  });
};

// Get a single giftcard
exports.show = function(req, res) {
  Giftcard.findById(req.params.id, function (err, giftcard) {
    if(err) { return handleError(res, err); }
    if(!giftcard) { return res.send(404); }
    return res.json(giftcard);
  });
};

// Creates a new giftcard in the DB.
exports.create = function(req, res) {
  Giftcard.create(req.body, function(err, giftcard) {
    if(err) { return handleError(res, err); }
    return res.json(201, giftcard);
  });
};

// Updates an existing giftcard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Giftcard.findById(req.params.id, function (err, giftcard) {
    if (err) { return handleError(res, err); }
    if(!giftcard) { return res.send(404); }
    var updated = _.merge(giftcard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, giftcard);
    });
  });
};

// Deletes a giftcard from the DB.
exports.destroy = function(req, res) {
  Giftcard.findById(req.params.id, function (err, giftcard) {
    if(err) { return handleError(res, err); }
    if(!giftcard) { return res.send(404); }
    giftcard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}