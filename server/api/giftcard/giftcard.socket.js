/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Giftcard = require('./giftcard.model');

exports.register = function(socket) {
  Giftcard.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Giftcard.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('giftcard:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('giftcard:remove', doc);
}