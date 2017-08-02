
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var HuntSchema   = new Schema({
    huntId: Schema.Types.ObjectId,
    name: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']},
    shortDescription: {type: String, required: true, minlength: [1, 'The string length must be between 1-50'] , maxlength: [50, 'The string length must be between 1-50']},
    longDescription: {type: String, required: true, minlength: [1, 'The string length must be between 1-200'] , maxlength: [200, 'The string length must be between 1-200']},
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: new Date(+new Date() + 7*24*60*60*1000) },
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    isDeleted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Hunt', HuntSchema);
