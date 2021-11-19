module.exports.uploader = require('./uploader').handle
module.exports.zipper = require('./zipper').handle
module.exports.listZipped = require('./listzipped').handle
module.exports.onConnect = require('./websocket/onConnect').handle
module.exports.onDisconnect = require('./websocket/onDisconnect').handle
module.exports.onMessage = require('./websocket/onMessage').handle