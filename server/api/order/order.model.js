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
		ref: 'User'
	},
	status: {
		type: String,
		default: 'pending'
	}
});

module.exports = mongoose.model('Order', OrderSchema);
