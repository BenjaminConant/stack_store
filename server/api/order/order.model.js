'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderItems: [{type: Schema.Types.ObjectId, ref:'LineItem'}],
  status: String
});

module.exports = mongoose.model('Order', OrderSchema);
