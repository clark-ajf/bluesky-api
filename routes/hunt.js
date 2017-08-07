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
    })
    /**
     * PATCH call for the hunt entity.
     * @param {String} name - The name of the new hunt
     * @param {String} shortDescription - The shortDescription of the new hunt
     * @param {string} longDescription - The longDescription of the new hunt
     * @returns {object} A message and the hunt created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .patch(function (req, res) {

        Hunt.findById(req.body._id, function(error, hunt){
            if(error){
                res.status(400).json({ "status code": 400, "error code": "1002", "error message": "Hunt not found" });
            }else{                
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
            }
        });
    });

router.route('/hunts/delete')
    /**
     * POST call for deleting hunt entity.
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        Hunt.findById(req.body._id, function(error, hunt){
            if(error){
                res.status(400).json({ "status code": 400, "error code": "1002", "error message": "Hunt not found" });
            }else{                
                hunt.isDeleted = true;
                hunt.save(function (err) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(201).json(hunt);
                    }
                });
            } 
        });  
    });

/** 
 * Express Route: /hunts/:user_id/:status
 * @param {string} userId - Id Hash of driver Object
 */
router.route('/hunts/:user_id/:status')
    /**
     * GET call for the hunt entity by user (single).
     * @returns {object} the user with Id userId and hunt with Id huntId. (200 Status Code)
     * @returns {object} the status of the hunt - owned, active, complete. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {

        if(req.params.status == 'owned'){
            Hunt.aggregate([
                {
                    $match: {
                        $and: [
                            {owner: mongoose.Types.ObjectId(req.params.user_id)},
                            {isDeleted: false}
                        ]                        
                    }
                },
                {
                    $project: {
                        _id: 1, 
                        name: 1,
                        owner : 1,
                        imageUrl : 1,
                        longDescription : 1,
                        shortDescription : 1,
                        isDeleted: 1,
                        locations: 1,
                        status: { $literal: "owned" }
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
        }else{
            Hunt.aggregate([
                {
                    $lookup: {
                        from: 'userhunts',
                        localField: '_id',
                        foreignField: 'huntId',
                        as: 'activeCompletedHunts'
                    }
                },
                {
                    $unwind: {
                        path: '$activeCompletedHunts',
                        preserveNullAndEmptyArrays : true
                    }
                },
                {
                    $match: {
                        $and: [
                            {"activeCompletedHunts.userId": mongoose.Types.ObjectId(req.params.user_id)},
                            {"activeCompletedHunts.status": req.params.status},
                            {isDeleted: false}
                        ]                    
                    }
                },
                { 
                    $project: {
                        _id: 1, 
                        name: 1,
                        owner : 1,
                        imageUrl : 1,
                        longDescription : 1,
                        shortDescription : 1,
                        isDeleted: 1,
                        locations: 1,
                        status: "$activeCompletedHunts.status"
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
        }
    })

module.exports = router;
