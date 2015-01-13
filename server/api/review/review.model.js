'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Item = require('../item/item.model');
var User = require('../user/user.model');

var ReviewSchema = new Schema({
	author: [User.schema],
	text: String,
	item: [Item.schema],
	usefulness: Number,
	stars: Number
});

module.exports = mongoose.model('Review', ReviewSchema);