'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LineItemSchema = new Schema({
	item: {type: Schema.Types.ObjectId, ref:'Item', required:true},
	sender: {type: Schema.Types.ObjectId, ref:'User', required:true},
	receiverName: String,
	receiverEmail: String,
	message: String,
	longMessage: String,
	value: Number,
	quantity: Number
});

module.exports = mongoose.model('LineItem', LineItemSchema);
