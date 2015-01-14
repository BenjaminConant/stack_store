'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	author: [{type: Schema.Types.ObjectId, ref:'User'}],
	text: String,
	item: [{type: Schema.Types.ObjectId, ref:'Item'}],
	usefulness: Number,
	stars: Number
});

module.exports = mongoose.model('Review', ReviewSchema);