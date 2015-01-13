'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineItem = require('../lineItem/lineItem.model');

// var OrderSchema = new Schema({
//   orderItems: Array,
//   status: String
// });


var OrderSchema = new Schema({
  status: String,
  orderItems:[LineItem]
});


// module.exports = mongoose.model('Order', OrderSchema);


module.exports = OrderSchema;
