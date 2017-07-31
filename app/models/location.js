
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var LocationSchema   = new Schema({
    location_name: {type: String, required: true},
    location_description: {type: String, required: true},
    hunt_id: {type: Schema.Types.ObjectId},
    is_accessible: {type: Boolean},
    is_qr_enabled: {type: Boolean, required: true},
    is_trivia_enabled: {type: Boolean, required: true},
    is_active: {type: Boolean},
    is_deleted: {type: Boolean},
    qr_code: {type: String, required: true},
    trivia_text: {type: String},
    photos: {type: String}, //Blob not defined?  
    serial_number: {type: Number}
});

module.exports = mongoose.model('Location', LocationSchema);
