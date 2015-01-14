'use strict';

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

module.exports = mongoose.model('Review', ReviewSchema);