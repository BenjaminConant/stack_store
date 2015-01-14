'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Review = require('../review/review.model');

var ItemSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: 'https://placekitten.com/g/200/300'
	},
	defaultMessage: {
		type: String,
		default: 'Cold-pressed organic blog swag, Brooklyn pour-over jean shorts butcher skateboard fixie American Apparel hashtag PBR&B Schlitz fap. PBR readymade Thundercats cliche.'
	},
	description: {
		type: String,
		required: true
	},
	reviews: [{
		type: Schema.Types.ObjectId,
		ref: 'Review'
	}],
	buyCount: {
		type: Number,
		default: 0
	},
	purchaseHistory: [Date],
	categories: [{
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}],
	stars: Number
});

ItemSchema.virtuals.stars = function() {
	//this is an a product
	// return math...
}

ItemSchema.methods.purchase = function() {
	//make line item
	//inc buyCount
};

ItemSchema.methods.review = function() {
	//update average
}

module.exports = mongoose.model('Item', ItemSchema);