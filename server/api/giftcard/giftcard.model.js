'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GiftcardSchema = new Schema({
  value: {
  	type: Number,
  	required: true
  },
  code: {
  	type: String, 
  	required: true
  }, 
  active: {
  	type: Boolean,
  	defualt: true,
  } 
});

module.exports = mongoose.model('Giftcard', GiftcardSchema);