
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserHuntSchema   = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    huntId: { type: Schema.Types.ObjectId, ref: 'Hunt' },
    status: String,
});

module.exports = mongoose.model('UserHunt', UserHuntSchema);
