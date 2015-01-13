'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Item = require('../item/item.model');
var User = require('../user/user.model');

var ReviewSchema = new Schema({
	author: [User],
	text: String,
	item: [Item],
	usefulness: Number,
	stars: Number
});

module.exports = mongoose.model('Review', ReviewSchema);