
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserHuntLocationsSchema   = new Schema({
    userId: Schema.Types.ObjectId,
    huntId: Schema.Types.ObjectId,
    locationId: Schema.Types.ObjectId,
    status: String

});

module.exports = mongoose.model('UserHuntLocations', UserHuntLocationsSchema);
