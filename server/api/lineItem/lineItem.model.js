'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LineItemSchema = new Schema({
	item: {
		type: Schema.Types.ObjectId,
		ref: 'Item',
		required: true
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	receiverName: String,
	receiverEmail: {
		type: String,
		required: true
	},
	message: String,
	longMessage: String,
	value: {
		type: Number,
		default: 25
	},
	quantity: {
		type: Number,
		default: 1
	},
	orderId:{
		type: Schema.Types.ObjectId,
		ref: 'Order'/*,
		required: true*/
	}

});

module.exports = mongoose.model('LineItem', LineItemSchema);
