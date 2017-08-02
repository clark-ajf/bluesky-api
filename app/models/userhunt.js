
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserHuntSchema   = new Schema({
    userId: Schema.Types.ObjectId,
    huntId: Schema.Types.ObjectId,
    startTime:  { type: Date, default: Date.now },
    endTime: { type: Date, default: Date.now },
    status: String,
});

module.exports = mongoose.model('UserHunt', UserHuntSchema);
