
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Location = require('./location');

var HuntSchema   = new Schema({
    name: {type: String, required: true, minlength: [1, 'The string length must be between 1-30'] , maxlength: [30, 'The string length must be between 1-30']},
    shortDescription: {type: String, required: true, minlength: [1, 'The string length must be between 1-100'] , maxlength: [100, 'The string length must be between 1-100']},
    longDescription: {type: String, required: true, minlength: [1, 'The string length must be between 1-400'] , maxlength: [400, 'The string length must be between 1-400']},
    locations: [Location.schema],
    isDeleted: {type: Boolean, default: false},
    imageUrl: {type:String},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Hunt', HuntSchema);
