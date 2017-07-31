
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var CluesSchema   = new Schema({
    location_id: {type: Schema.Types.ObjectId, required: true},
    clue_name: {type: String, required: true},
    serial_number: {type: Number, required: true},
    clue_description: {type: String, required: true},
    clue_text: {type: String, required: true}
});

module.exports = mongoose.model('Clues', CluesSchema);
