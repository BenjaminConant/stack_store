/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var LineItem = require('./lineItem.model');

exports.register = function(socket) {
  LineItem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  LineItem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lineItem:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lineItem:remove', doc);
}