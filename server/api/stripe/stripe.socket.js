/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Stripe = require('./stripe.model');

exports.register = function(socket) {
  Stripe.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Stripe.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('stripe:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('stripe:remove', doc);
}