
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserSchema   = new Schema({
    userId: {type: Number}, 
    email: {type: String},
    organizer: {type: Boolean}
});

module.exports = mongoose.model('User', UserSchema);
