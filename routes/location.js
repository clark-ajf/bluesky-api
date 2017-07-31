/** 
 * Express Route: /location
 * @author Stuti Ghiya
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var Location = require('../app/models/location');

router.route('/locations')
    /**
     * GET call for the clue entity (multiple).
     * @returns {object} clue. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        Location.find(function (err, locations) {
            if (err) {
                res.status(500).json({ "status code": 500, "error code": "1002", "error message": "Internal server error" });
            } else {
                res.status(200).json(locations);
            }
        });
    })
    /**
     * POST call for the clue entity.
     * @param {string} location_name - name of new location
     * @param {string} location_description - description of new location
     * @param {Boolean} is_accessible - accessible property of new location
     * @param {Boolean} is_qr_enabled - qr_enabled property of new location
     * @param {Boolean} is_trivia_enabled - trivia_enabled of new location
     * @param {Boolean} is_active - active property of new location
     * @param {Boolean} is_deleted - deleted property of new location
     * @param {String} qr_code - QR code of new location
     * @param {String} trivia_text - trivia text of new location
     * @param {Blob} photos - photo of new location
     * @param {Number} serial_number - serial number of new location
     * @returns {object} A message and the clue. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        var location = new Location();
        location.location_id = req.body.location_id;
        location.location_name = req.body.location_name;
        location.location_description = req.body.location_description;     
        location.is_qr_enabled = req.body.is_qr_enabled;
        location.is_trivia_enabled = req.body.is_trivia_enabled;
        location.qr_code = req.body.qr_code

        if (typeof req.body.is_active !== 'undefined'){
            location.is_active = req.body.is_active;
        }
        if (typeof req.body.is_deleted !== 'undefined'){
            location.is_deleted = req.body.is_deleted;
        }
        if (typeof req.body.is_accessible !== 'undefined'){
            location.is_accessible = req.body.is_accessible;
        }
        if (typeof req.body.trivia_text !== 'undefined'){
            location.trivia_text = req.body.trivia_text;
        }
        if (typeof req.body.photos !== 'undefined'){
            location.photos = req.body.photos;
        }
        if (typeof req.body.serial_number !== 'undefined'){
            location.serial_number = req.body.serial_number;
        }

        location.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(location);
            }
        });
    });


module.exports = router;
