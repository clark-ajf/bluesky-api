
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    userId: Number, 
    email: String,
    organizer: Boolean
});

module.exports = mongoose.model('User', UserSchema);
