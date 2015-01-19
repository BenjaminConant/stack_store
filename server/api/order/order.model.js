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
		ref: 'User',
		required: true
	},
	status: {
		type: String,
		default: 'pending'
	},
	creationDate: Date
});

OrderSchema.statics.findOrCreateAndAdd = function(userId, lineItem, cb)
{
	var self = this;
	self.find({user:userId})
		.exec(function(err, result)
		{
			if(err){return cb(err);}
			if(result.length)
			{
				result[0].orderItems.push(lineItem);
				result[0].save(function(err, order)
				{
					if(err){return cb(err);}
					return cb(null, order);
				});
			}

			self.create({status:'active', user:userId}, function(err, order)
			{
				if(err){cb(err);}
				order.orderItems.push(lineItem);
				order.save(function(err, order){
					if(err){cb(err);}
					cb(null, order);
				})
			});
		});
}

module.exports = mongoose.model('Order', OrderSchema);