/**
 * Express Route: /hunts
 * @author Ananth Bommireddipalli
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var User = require('../app/models/hunt');

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
        hunt.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(hunt);
            }
        });
    });

module.exports = router;
