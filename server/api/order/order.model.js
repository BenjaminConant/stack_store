'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineItemSchema = require('../lineItem/lineItem.model');

var OrderSchema = new Schema({
  orderItems: [LineItemSchema],
  status: String
});

module.exports = OrderSchema;
