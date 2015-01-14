'use strict';

var _ = require('lodash');
var LineItem = require('./lineItem.model');
var Order = require('../order/order.model');
var User = require('../user/user.model');

// Get list of lineItems
exports.index = function(req, res) {
  LineItem.find(function(err, lineItems) {
    if (err) {
      return handleError(res, err);
    }
    LineItem.populate(lineItems, 'item', function() {
      return res.json(200, lineItems);
    })
  });
};

// Get a single lineItem
exports.show = function(req, res) {
  LineItem.findById(req.params.id, function(err, lineItem) {
    if (err) {
      return handleError(res, err);
    }
    if (!lineItem) {
      return res.send(404);
    }
    LineItem.populate(lineItem, 'item', function() {
      return res.json(lineItem);
    });
  });
};

// Creates a new lineItem in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  LineItem.create(req.body, function(err, lineItem) {
    console.log(lineItem);

    if (err) {
      return handleError(res, err);
    }
    User.findById(lineItem.sender[0], function(err, user) {
      Order.findByIdAndUpdate(user.cart, {
        $push: {
          orderItems: lineItem._id
        }
      }, function(err, data) {
        console.log('Find by ID data: ', data);
        if (err) {
          console.log(err);
        }
        return res.json(201, lineItem);
      })
    });
  });
};

// Updates an existing lineItem in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  LineItem.findById(req.params.id, function(err, lineItem) {
    if (err) {
      return handleError(res, err);
    }
    if (!lineItem) {
      return res.send(404);
    }
    var updated = _.merge(lineItem, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, lineItem);
    });
  });
};

// Deletes a lineItem from the DB.
exports.destroy = function(req, res) {
  LineItem.findById(req.params.id, function(err, lineItem) {
    if (err) {
      return handleError(res, err);
    }
    if (!lineItem) {
      return res.send(404);
    }
    lineItem.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}