
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var ClueSchema   = new Schema({
    message: {type: String, required: true}
});

module.exports = mongoose.model('Clue', ClueSchema);
