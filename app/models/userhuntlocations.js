
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserHuntLocationsSchema   = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    huntId: { type: Schema.Types.ObjectId, ref: 'Hunt' },
    locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
    status: String

});

module.exports = mongoose.model('UserHuntLocations', UserHuntLocationsSchema);
