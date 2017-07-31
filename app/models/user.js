
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserSchema   = new Schema({
    userName: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']}, 
    emailAddress: {type: String,required: true, match: [/[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/, 'Please enter correct email format']},
    firstName: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']},
    lastName: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']},
    trustedFriends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', UserSchema);
