'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrderSchema = new Schema({
	orderItems: [{
		type: Schema.Types.ObjectId,
		ref: 'LineItem'
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'/*,
		required: true*/
	},
	status: {
		type: String,
		default: 'cart'
	},
	creationDate: Date
});

OrderSchema.statics.findOrCreateAndAdd = function(cart, lineItem, cb)
{
	var self = this;
	console.log("cart in findorcreate", cart);
	cart = cart == 'noCartZone' ? undefined : cart;
	self.findById(cart)
		.exec(function(err, result)
		{
			if(err){console.log("cheese dogs 1"); return cb(err);}
			if(result)
			{
				console.log("cheese dogs 2"); 
				result.orderItems.push(lineItem);
				result.save(function(err, order)
				{
					if(err){return cb(err);}
					return cb(null, order);
				});
			} else {

				self.create({status: 'cart'}, function(err, order)
				{
					if(err){cb(err);}
					order.orderItems.push(lineItem);
					order.markModified('orderItems');
					order.save(function(err, order){
						if(err){cb(err);}
						cb(null, order);
					});
				});
			}
		});
}

// Validate there is at least one category
OrderSchema
	.path('status')
	.validate(function(value, respond) {
		var self = this;
		var match = value.match(/cart|created|processing|cancelled|completed/i);
		respond(!!match);
	}, 'Order status can only be cart, created, processing, cancelled, completed.');

module.exports = mongoose.model('Order', OrderSchema);
