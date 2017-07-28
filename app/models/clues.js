
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var CluesSchema   = new Schema({
    clue_id: Schema.Types.ObjectId,
    location_id: Schema.Types.ObjectId,
    name: String,
    description: String,
    is_accessible: Boolean,
    is_qr_enabled: Boolean,
    is_trivia_enabled: Boolean,
    is_active: Boolean,
    is_deleted: Boolean,
    qr_code: String,
    trivia_text: String,
    photos: String ,     // There is no "blog"
    serial_number: Number

});

module.exports = mongoose.model('Clues', CluesSchema);
