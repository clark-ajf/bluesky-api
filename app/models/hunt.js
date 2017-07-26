
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var HuntSchema   = new Schema({
    huntID: Schema.Types.ObjectId,
    name: {type: String, required: true, minlength: [1, 'The string length must be between 1-15'] , maxlength: [15, 'The string length must be between 1-15']},
    short_description: {type: String, required: true, minlength: [1, 'The string length must be between 1-50'] , maxlength: [50, 'The string length must be between 1-50']},
    long_description: {type: String, required: true, minlength: [1, 'The string length must be between 1-200'] , maxlength: [200, 'The string length must be between 1-200']},
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, default: Date.now },
    is_deleted: {type: Boolean, default: false},
    is_active: {type: Boolean, default: true},
    owner: String 

});

module.exports = mongoose.model('Hunt', HuntSchema);
