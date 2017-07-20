/** 
 * Express Route: /
 * @author Clark Jeria
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();

/**
 * Initial route of the API for connection testing purpouses
 * @returns {object} A string message.
 */
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to BlueSky API!' });
});

module.exports = router;