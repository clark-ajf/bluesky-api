
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var LocationSchema   = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    qrToken: {type: String, required: true},
    clues: [{ type: Schema.Types.ObjectId, ref: 'Clue' }],
    imageUrl: {type: String}
});

module.exports = mongoose.model('Location', LocationSchema);
