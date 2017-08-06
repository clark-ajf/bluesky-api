/** 
 * Express Route: /location
 * @author Stuti Ghiya
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var mongoose     = require('mongoose');

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
                $project: {
                    _id : '$locations._id',
                    name : '$locations.name',
                    description : '$locations.description',
                    imageUrl : '$locations.imageUrl',
                    qrToken : '$locations.qrToken',
                    clues : '$locations.clues'
                }
            },
            {
                $lookup: {
                    from: 'userhuntlocations',
                    localField: '_id',
                    foreignField: 'locationId',
                    as: 'activeLocations'
                }
            },
            {
                $project: {
                    _id : 1,
                    name : 1,
                    description : 1,
                    imageUrl : 1,
                    qrToken : 1,
                    clues : 1,
                    activeLocations : { 
                        $filter: {
                            input: "$activeLocations",
                            as: "activeLocation",
                            cond: { $eq: [ "$$activeLocation.userId", mongoose.Types.ObjectId(req.params.user_id) ] }
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: '$activeLocations',
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $project: {
                    _id : 1,
                    name : 1,
                    description : 1,
                    imageUrl : 1,
                    qrToken : 1,
                    clues : 1,
                    status: { $ifNull: [ '$activeLocations.status', "not_found" ] }
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
