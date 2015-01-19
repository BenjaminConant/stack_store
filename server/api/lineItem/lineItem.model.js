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
		ref: 'User'
	},
	receiverName: String,
	receiverEmail: {
		type: String,
		required: true
	},
	senderName: String,
	senderEmail: {
		type: String,
		required: true
	},
	message: String,
	longMessage: String,
	value: {
		type: Number,
		default: 2500
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

LineItemSchema.virtuals.valueInDollars = function() {
	return this.value/100;
}

// Validate value is expressed in cents
LineItemSchema
	.path('value')
	.validate(function(value, respond) {
		var self = this;
		respond((Math.floor(value) === value)&&(Math.ceil(value) === value)); 
	}, 'The value should be expressed in cents.');

module.exports = mongoose.model('LineItem', LineItemSchema);
