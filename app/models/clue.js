
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClueSchema   = new Schema({
    message: String,
}, {_id: false});

module.exports = mongoose.model('Clue', ClueSchema);
