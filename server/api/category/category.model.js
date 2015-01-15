'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	popularity: {
		type: Number,
		default: 1
	}
});

module.exports = mongoose.model('Category', CategorySchema);