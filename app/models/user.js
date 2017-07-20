
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserSchema   = new Schema({
    userName: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']}, 
    emailAddress: {type: String,required: true, match: [/[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/, 'Please enter correct email format']},
    password: {type: String, required: true, minlength: [44, 'The string length must be 44'] , maxlength: [44, 'The string length must be 44']},
    userType: {type: String, required: true, enum:{values:['Individual','Company'],message:'Please only enter Individual or Company'}},
    firstName: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']},
    lastName: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']},
    phoneNumber: {type: String, match: [/^\d{3}-\d{3}-\d{4}$/,'Please enter correct number format xxx-xxx-xxxx']},
    trustedFriends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', UserSchema);
