/**
 * Express Route: /hunts
 * @author Ananth Bommireddipalli
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var mongoose     = require('mongoose');
var Hunt = require('../app/models/hunt');
var User = require('../app/models/user');

router.route('/hunts')
    /**
     * GET call for the hunt entity (multiple).
     * @returns {object} A list of hunts. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        Hunt.find(function (err, hunts) {
            if (err) {
                res.status(500).json({ "status code": 500, "error code": "1002", "error message": "Internal server error" });
            } else {
                res.status(200).json(hunts);
            }
        });
    })
    /**
     * POST call for the hunt entity.
     * @param {String} name - The name of the new hunt
     * @param {String} shortDescription - The shortDescription of the new hunt
     * @param {string} longDescription - The longDescription of the new hunt
     * @returns {object} A message and the hunt created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        var hunt = new Hunt();
        hunt.name = req.body.name;
        hunt.shortDescription = req.body.shortDescription;
        hunt.longDescription = req.body.longDescription;
        hunt.locations = req.body.locations;
        hunt.isDeleted = req.body.isDeleted;
        hunt.imageUrl = req.body.imageUrl;
        hunt.owner = req.body.owner;
        hunt.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(hunt);
            }
        });
    });

/** 
 * Express Route: /hunts/:user_id
 * @param {string} userId - Id Hash of driver Object
 */
router.route('/hunts/:user_id')
    /**
     * GET call for the hunt entity by user (single).
     * @returns {object} the user with Id userId and hunt with Id huntId. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {
        
        Hunt.aggregate([
            {
                $match: {
                    owner: mongoose.Types.ObjectId(req.params.user_id)
                }
            },
            {
                $lookup: {
                    from: 'userhunts',
                    localField: 'owner',
                    foreignField: 'userId',
                    as: 'activeCompletedHunts'
                }
            },
            {
                $project: {
                    _id : 1,
                    owner : 1,
                    imageUrl : 1,
                    longDescription : 1,
                    shortDescription : 1,
                    name : 1,
                    isDeleted: 1,
                    locations: 1,
                    activeCompletedHunts : { 
                        $filter: {
                            input: "$activeCompletedHunts",
                            as: "activeCompletedHunt",
                            cond: { $ne: [ "$$activeCompletedHunt.huntId", "$_id" ] }
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: '$activeCompletedHunts',
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $project: {
                    _id : 1,
                    owner : 1,
                    imageUrl : 1,
                    longDescription : 1,
                    shortDescription : 1,
                    name : 1,
                    isDeleted: 1,
                    locations: 1,
                    activeCompletedHunts : 1
                }
            },
            {
                $lookup: {
                    from: 'hunts',
                    localField: 'activeCompletedHunts.huntId',
                    foreignField: '_id',
                    as: 'activeCompletedHuntsDetails'
                }
            },
            {
                $unwind: {
                    path: '$activeCompletedHuntsDetails',
                    preserveNullAndEmptyArrays : true
                }
            },
            {
                $project: {
                    _id: 0,
                    "ownedHunts._id": "$_id",
                    "ownedHunts.owner": "$owner",
                    "ownedHunts.imageUrl": "$imageUrl",
                    "ownedHunts.longDescription": "$longDescription",
                    "ownedHunts.shortDescription": "$shortDescription",
                    "ownedHunts.name": "$name",
                    "ownedHunts.isDeleted": "$isDeleted",
                    "ownedHunts.locations": "$locations",
                    "activeCompletedHuntsObj._id": "$activeCompletedHuntsDetails._id",
                    "activeCompletedHuntsObj.owner": "$activeCompletedHuntsDetails.owner",
                    "activeCompletedHuntsObj.imageUrl": "$activeCompletedHuntsDetails.imageUrl",
                    "activeCompletedHuntsObj.longDescription": "$activeCompletedHuntsDetails.longDescription",
                    "activeCompletedHuntsObj.shortDescription": "$activeCompletedHuntsDetails.shortDescription",
                    "activeCompletedHuntsObj.name": "$activeCompletedHuntsDetails.name",
                    "activeCompletedHuntsObj.isDeleted": "$activeCompletedHuntsDetails.isDeleted",
                    "activeCompletedHuntsObj.locations": "$activeCompletedHuntsDetails.locations",
                    "activeCompletedHuntsObj.status": "$activeCompletedHunts.status"
                }
            },
            { 
                $group: {
                "_id":0,"list1":{$addToSet:"$ownedHunts"},"list2":{$addToSet:"$activeCompletedHuntsObj"}
                }
            },
            { $project: {array:{$setUnion:["$list1","$list2"]}}},
            { $unwind: {
                    path: '$array',
                    preserveNullAndEmptyArrays : true
                }
            },
                { $project: {
                    _id: "$array._id", 
                    name: "$array.name",
                    owner : "$array.owner",
                    imageUrl : "$array.imageUrl",
                    longDescription : "$array.longDescription",
                    shortDescription : "$array.shortDescription",
                    isDeleted: "$array.isDeleted",
                    locations: "$array.locations",
                    status: { $ifNull: [ '$array.status', "owned" ] }
                }
            
            }
        ], function(err, results){
            if (err) {
                res.status(404).json(err);
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
