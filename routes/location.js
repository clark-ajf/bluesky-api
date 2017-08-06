/** 
 * Express Route: /location
 * @author Stuti Ghiya
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var Location = require('../app/models/location');
var Hunt = require('../app/models/hunt');

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
     * @param {Schema.Types.ObjectId} hunt_id - hunt the location is part of
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
        /*location.location_id = req.body.location_id;
        location.location_name = req.body.location_name;
        location.location_description = req.body.location_description;   
        location.is_qr_enabled = req.body.is_qr_enabled;
        location.is_trivia_enabled = req.body.is_trivia_enabled;
        location.qr_code = req.body.qr_code

        if(typeof req.body.hunt_id !== 'undefined'){
            location.hunt_id = req.body.hunt_id;  
        }
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
        }*/

        location.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(location);
            }
        });
    });

/** 
 * Express Route: /locations/:location_id
 * @param {string} location_id - Id Hash of driver Object
 */
router.route('/locations/:location_id')
    /**
     * GET call for the location entity (single).
     * @returns {object} the user with Id location_id. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {
        Location.findById(req.params.location_id, function (err, location) {
            if (err) {
                res.status(404).json({ "status code": 404, "error code": "1004", "error message": "Given location does not exist" });
            } else {
                if (location) {
                    res.status(200).json(location)
                }
                else {
                    res.status(404).send(err);
                }
            }
        });
    })
    /**
     * DELETE call for the location entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function (req, res) {
        Location.remove({
            _id: req.params.location_id
        }, function (err, location) {
            if (err) {
                res.status(400).json({ "status code": 400, "error code": "1006", "error message": "The location cannot be deleted" });
            } else {
                res.status(200).json({ "message": "Location Deleted" });
            }
        });
    });

/** 
 * Express Route: /locations/:hunt_id
 * @param {string} hunt_id - Id Hash of driver Object
 */
router.route('/locations/hunt_id/:hunt_id')
    /**
     * GET call for the hunt entity (single).
     * @returns {object} the locations with parameter to match hunt_id. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {
        Location.find({'hunt_id' : req.params.hunt_id}, function (err, location) {
            if (err) {
                res.status(404).json({ "status code": 404, "error code": "1004", "error message": "Given hunt has no locations" });
            } else {
                if (location) {
                    res.status(200).json(location)
                }
                else {
                    res.status(404).send(err);
                }
            }
        });
    })

router.route('/locations/:user_id/:hunt_id')
    /**
     * GET call for the location entity by user and hunt
     * @returns {object} the user with Id userId and hunt with Id huntId. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {
        
        Hunt.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.hunt_id)
                }
            },
            {
                $unwind: '$locations'
            },
            {
                $lookup: {
                    from: 'userhuntlocations',
                    localField: 'locations._id',
                    foreignField: 'locationId',
                    as: 'activeLocations'
                }
            },
            {
                $match: { 
                    "activeLocations.userId": mongoose.Types.ObjectId(req.params.user_id)
                }
            }
        ], function(err, results){
            if (err) {
                res.status(404).json({ "status code": 404, "error code": "1004", "error message": "Given user location does not exist" });
            } else {
                if (results) {
                    res.status(200).json(results)
                }
                else {
                    res.status(404).send(err);
                }
            }            
        });
    })


module.exports = router;
