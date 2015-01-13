'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Review = require('../review/review.model');

var ItemSchema = new Schema({
	title: { type: String, required: true },
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

ItemSchema.virtuals.stars = function() {
	//this is an a product
	// return math...
}

ItemSchema.methods.purchase  = function() {
	//make line item
	//inc buyCount
};

ItemSchema.methods.review  = function() {
	//update average
}

module.exports = mongoose.model('Item', ItemSchema);