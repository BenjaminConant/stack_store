'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Review = require('../review/review.model');

var ItemSchema = new Schema({
	title: String,
	image: String,
	defaultMessage: String,
	description: String,
	reviews: [Review],
	buyCount: Number,
	purchaseHistory: [Date],
	categories: [String],
	themeURL: String,
	stars: Number
});

module.exports = mongoose.model('Item', ItemSchema);