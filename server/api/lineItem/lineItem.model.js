'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LineItemSchema = new Schema({
	item: {type: Schema.Types.ObjectId, ref:'Item'},
	sender: {type: Schema.Types.ObjectId, ref:'User'},
	receiverName: String,
	receiverEmail: String,
	message: String,
	longMessage: String,
	value: Number,
	quantity: Number,
	themeURL: String
});

module.exports = mongoose.model('LineItem', LineItemSchema);
