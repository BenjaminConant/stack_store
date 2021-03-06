'use strict';

var min_length = 40;

var mongoose = require('mongoose'),
	Schema = mongoose.Schema; 

var ReviewSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	text: {
		type: String,
		required: true
	},
	item: {
		type: Schema.Types.ObjectId,
		ref: 'Item',
		required: true
	},
	usefulness: Number,
	stars: {
		type: Number,
		required: true
	}
});

// Validate the length of the review is at least min_length
ReviewSchema
	.path('text')
	.validate(function(value, respond) {
		var self = this;
		respond(value.length >= min_length); 
	}, 'The review must be at least 40 characters long.');

ReviewSchema
	.path('author')
	.validate(function(value, respond) {
		var self = this;
		this.constructor.findOne({
			author: value,
			item: this.item
		}, function(err, review) {
			if (err) throw err;
			if (review) {
				respond(self.id === review.id);
			}
			respond(true);
		})

	}, 'Each user can only review an item once.');

module.exports = mongoose.model('Review', ReviewSchema);