
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Location = require('location');

var HuntSchema   = new Schema({
    name: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']},
    shortDescription: {type: String, required: true, minlength: [1, 'The string length must be between 1-50'] , maxlength: [50, 'The string length must be between 1-50']},
    longDescription: {type: String, required: true, minlength: [1, 'The string length must be between 1-200'] , maxlength: [200, 'The string length must be between 1-200']},
    locations: [Location.schema],
    isDeleted: {type: Boolean, default: false},
    imageUrl: {type:String},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Hunt', HuntSchema);
