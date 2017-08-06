
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Clue = require('clue');

var LocationSchema   = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    qrToken: {type: String, required: true},
    clues: [Clue.schema],
    imageUrl: {type: String}
});

module.exports = mongoose.model('Location', LocationSchema);
