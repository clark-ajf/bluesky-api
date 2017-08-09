
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Location = require('./location');

var HuntSchema   = new Schema({
    name: String,
    shortDescription: String,
    longDescription: String,
    locations: [Location.schema],
    isDeleted: {type: Boolean, default: false},
    imageUrl: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Hunt', HuntSchema);
