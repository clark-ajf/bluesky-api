
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserHuntLocationsSchema   = new Schema({
    user_id: Schema.Types.ObjectId,
    hunt_id: Schema.Types.ObjectId,
    start_time:  { type: Date, default: Date.now },
    end_time: { type: Date, default: Date.now },
    status: String

});

module.exports = mongoose.model('UserHuntLocations', UserHuntLocationsSchema);
