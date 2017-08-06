
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserHuntSchema   = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    huntId: { type: Schema.Types.ObjectId, ref: 'Hunt' },
    startTime:  { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    status: String,
});

module.exports = mongoose.model('UserHunt', UserHuntSchema);
