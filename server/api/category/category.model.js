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

// Validate name is not taken
CategorySchema
	.path('name')
	.validate(function(value, respond) {
		var self = this;
		this.constructor.findOne({
			name: value
		}, function(err, category) {
			if (err) throw err;
			if (category) {
				if (self.id === category.id) return respond(true);
				return respond(false);
			}
			respond(true);
		});
	}, 'The specified category name is already in use.');

module.exports = mongoose.model('Category', CategorySchema);