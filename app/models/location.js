
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Clue = require('./clue');

var LocationSchema   = new Schema({
    name: String,
    description: String,
    qrToken: String,
    clues: [Clue.schema],
    imageUrl: String
});

module.exports = mongoose.model('Location', LocationSchema);
