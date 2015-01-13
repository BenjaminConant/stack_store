'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Item = require('../item/item.model');
var User = require('../user/user.model');

var LineItemSchema = new Schema({
	item: [Item],
	sender: [User],
	receiverName: String,
	receiverEmail: String,
	message: String,
	longMessage: String,
	value: Number,
	quantity: Number,
	themeURL: String 
});

module.exports = mongoose.model('LineItem', LineItemSchema);