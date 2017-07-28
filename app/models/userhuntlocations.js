
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserHuntLocationsSchema   = new Schema({
    user_id: Schema.Types.ObjectId,
    hunt_id: Schema.Types.ObjectId,
    locationID: Schema.Types.ObjectId,
    status: String

});

module.exports = mongoose.model('UserHuntLocations', UserHuntLocationsSchema);
