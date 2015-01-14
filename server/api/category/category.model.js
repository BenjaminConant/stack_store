'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	popularity: Number
});

module.exports = mongoose.model('Category', CategorySchema);