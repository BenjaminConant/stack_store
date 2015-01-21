'use strict';

var _ = require('lodash');
var Giftcard = require('./giftcard.model');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('oI4ORuYUtNS5MFNOEcJBcQ');

// Get list of giftcards
exports.index = function(req, res) {
  Giftcard.find(function (err, giftcards) {
    if(err) { return handleError(res, err); }
    return res.json(200, giftcards);
  });
};

// Get a single giftcard
exports.show = function(req, res) {
  Giftcard.findById(req.params.id, function (err, giftcard) {
    if(err) { return handleError(res, err); }
    if(!giftcard) { return res.send(404); }
    return res.json(giftcard);
  });
};

exports.sendEmail = function(req,res) {
  var code = req.body.code;
  var lineItems = req.body.lineItems;
  console.log("THIS IS CODE", code);
  console.log(lineItems);

  // function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
      "html": "<p>Moops</p>",
      "subject": "Hello World",
      "from_email": "samcorcos@gmail.com",
      "from_name": "Sam Corcos",
      "to": [{
        "email": "conantbenjamin@gmail.com",
        "name": "Ben Conant"
      }],
      "important": false,
      "track_opens": true,
      "auto_html": false,
      "preserve_recipients": true,
      "merge": false,
      "tags": [
      "Fullstack_Hexomailer_Workshop"
      ]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
      console.log(message);
      console.log(result);
    }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });


}

// Creates a new giftcard in the DB.
exports.create = function(req, res) {
  Giftcard.create(req.body, function(err, giftcard) {
    if(err) { return handleError(res, err); }
    return res.json(201, giftcard);
  });
};

// Updates an existing giftcard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Giftcard.findById(req.params.id, function (err, giftcard) {
    if (err) { return handleError(res, err); }
    if(!giftcard) { return res.send(404); }
    var updated = _.merge(giftcard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, giftcard);
    });
  });
};

// Deletes a giftcard from the DB.
exports.destroy = function(req, res) {
  Giftcard.findById(req.params.id, function (err, giftcard) {
    if(err) { return handleError(res, err); }
    if(!giftcard) { return res.send(404); }
    giftcard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
