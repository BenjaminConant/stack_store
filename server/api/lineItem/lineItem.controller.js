'use strict';

var _ = require('lodash');
var LineItem = require('./lineItem.model');
var Order = require('../order/order.model');
var User = require('../user/user.model');

// Get list of lineItems
exports.index = function(req, res) {
  LineItem.find(function(err, lineItems) {
    if (err) {
      return handleError(res, err);
    }
    LineItem.populate(lineItems, 'item', function() {
      return res.json(200, lineItems);
    })
  });
};

// Get a single lineItem
exports.show = function(req, res) {
  LineItem.findById(req.params.id, function(err, lineItem) {
    if (err) {
      return handleError(res, err);
    }
    if (!lineItem) {
      return res.send(404);
    }
    LineItem.populate(lineItem, 'item', function() {
      return res.json(lineItem);
    });
  });
};

// Creates a new lineItem in the DB.
// exports.create = function(req, res) {
//   LineItem.create(req.body, function(err, lineItem) {
//     console.log('we created this lineItem: ', lineItem);
//     if (err) {
//       return res.json(422, err);
//       //return handleError(res, err);
//     }
//     if (!lineItem.sender) return res.json(201, lineItem);

//     Order.findOneAndUpdate({ userId:lineItem.sender._id },
//     {$push: { orderItems: lineItem._id }},
//       function(err, order) {
//         console.log('We found this order: ', order);
//         if (err) {
//           console.log(err);
//         }
//         console.log('lineItem unpopulated', lineItem);
//         LineItem.populate(lineItem, 'item', function() {
//         console.log('lineitem populated: ', lineItem)
//         return res.json(201, lineItem);
//       });
//     });
//   });
// };

exports.create = function(req, res)
{
  var tempLineItem = req.body;

  LineItem.create(tempLineItem, function(err, lineItem)
  {
    if(err){return res.json(422, err);}

    if(lineItem.sender)
    {
      Order.findOneAndUpdate({ userId:lineItem.sender._id },
        {$push: { orderItems:lineItem._id }})
        .exec(function(err, order)
        {
          if(err){return res.json(422, err);}
          LineItem.populate(lineItem, 'item')
            .exec(function()
            {
              return res.json(201, lineItem);
            })
        })
    }

    else
    {
      var tempUser = {
        name : lineItem.senderName,
        password : "xxxx",
        email : lineItem.senderEmail,
        isGuest : true
      }
      User.findOrCreate(tempUser, function(err, user)
      {
        if(err){return res.json(422, err);}
        Order.findOrCreateAndAdd(user._id, lineItem, function(err, order)
        {
          if(err){return res.json(422, err);}
          LineItem.populate(lineItem, 'item', function(err, result)
          {
            if(err){return res.json(422, err);}
            return res.json(201, result);
          })
        })
      });
    }
  });
}

// exports.create = function(req, res) {
//   LineItem.create(req.body, function(err, lineItem) {
//     if(err){
//       return handleError(res,err);
//     }
//     if(!lineItem.sender) return res.json(201, lineItem);
//
//     User.findById(lineItem.sender._id, function(err, user){
//       console.log(user);
//       lineItem.orderId = user.cart;
//       lineItem.save(function(err, lineItem){
//         console.log('lineItem unpopulated', lineItem);
//         LineItem.populate(lineItem, 'item', function() {
//           console.log('lineitem populated: ', lineItem)
//           return res.json(201, lineItem);
//         });
//       });
//     });
//   });
// }

// Updates an existing lineItem in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  LineItem.findById(req.params.id, function(err, lineItem) {
    if (err) {
      return handleError(res, err);
    }
    if (!lineItem) {
      return res.send(404);
    }
    var updated = _.merge(lineItem, req.body);
    updated.save(function(err) {
      if (err) {
        return res.json(422, err);
        //return handleError(res, err);
      }
      return res.json(200, lineItem);
    });
  });
};

// Deletes a lineItem from the DB.
exports.destroy = function(req, res) {
  LineItem.findById(req.params.id, function(err, lineItem) {
    if (err) {
      return handleError(res, err);
    }
    if (!lineItem) {
      return res.send(404);
    }
    lineItem.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
