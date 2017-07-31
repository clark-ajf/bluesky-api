/** 
 * Example of RESTful API using Express and NodeJS
 * @author Clark Jeria
 * @version 0.0.1
 */

/** BEGIN: Express Server Configuration */
var cors       = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;
var environment = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
if(environment != 'development'){  
  mongoose.connect('mongodb://bluesky:bluesky@127.0.0.1:27017/bluesky');
}else {  
  mongoose.connect('mongodb://bluesky:bluesky@35.185.219.43:27017/bluesky');
}
/** END: Express Server Configuration */

/** BEGIN: Express Routes Definition */
var router = require('./routes/router');
var users = require('./routes/user');
var locations = require('./routes/location');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router);
app.use('/api', users);
app.use('/api', locations)
/** END: Express Routes Definition */

/** BEGIN: Express Server Start */
app.listen(port);
console.log('Service running on port ' + port);

module.exports = app;
/** END: Express Server Start */
