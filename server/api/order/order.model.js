'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrderSchema = new Schema({
	orderItems: [{
		type: Schema.Types.ObjectId,
		ref: 'LineItem'
	}],
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	status: {
		type: String,
		default: 'pending'
	},
	creationDate: Date
});

module.exports = mongoose.model('Order', OrderSchema);