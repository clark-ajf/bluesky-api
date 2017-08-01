/**
 * Express Route: /users
 * @author Clark Jeria
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var Hunt = require('../app/models/hunt');

router.route('/hunts')
    /**
     * GET call for the user entity (multiple).
     * @returns {object} A list of users. (200 Status Code)
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
     * POST call for the user entity.
     * @param {String} name - The name of the new hunt
     * @param {string} short_description - The short description of the new hunt
     * @param {string} long_description - The longer description of the new hunt
     * @param {Date} start_date
     * @param {Date} end_date
     * @param {[]} locations
     * @param {Boolean} is_deleted - The last name of the new user
     * @param {Boolean} is_active - The phone number of the new user
     * @param {String} owner
     * @returns {object} A message and the user created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        var hunt = new Hunt();

        hunt.name = req.body.name;
        hunt.short_description = req.body.short_description;
        hunt.start_date = req.body.start_date;
        hunt.owner = req.body.owner;

	      if (typeof req.body.long_description !== 'undefined'){
		        hunt.long_description = req.body.long_description;
	         }

        if (typeof req.body.end_date !== 'undefined'){
          hunt.end_date = req.body.end_date;
        }

        if (typeof req.body.locations !== 'undefined'){
          hunt.locations = req.body.locations;
        }

        if (typeof req.body.is_active !== 'undefined'){
          hunt.is_active = req.body.is_active;
        }

        hunt.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(user);
            }
        });
    });

/**
 * Express Route: /hunts/:hunt_id
 * @param {string} hunt_id - Id Hash of driver Object
 */
router.route('/hunts/:hunt_id')
    /**
     * GET call for the user entity (single).
     * @returns {object} the user with Id user_id. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {
        Hunt.findById(req.params.hunt_id, function (err, hunt) {
            if (err) {
                res.status(404).json({ "status code": 404, "error code": "1004", "error message": "Given hunt does not exist" });
            } else {
                if (hunt) {
                    res.status(200).json(hunt)
                }
                else {
                    res.status(404).send(err);
                }
            }
        });
    })
    /**
     * PATCH call for the user entity (single).
     * @param {String} hunt_id
     * @param {String} name
     * @param {string} short_description - The password of the new user
     * @param {string} long_description - The userType of the new user
     * @param {string} firstName - The first name of the new user
     * @param {string} lastName - The last name of the new user
     * @param {String} phoneNumber - The phone number of the new user
     * @returns {object} A message and the user updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .patch(function (req, res) {
        Hunt.findById(req.params.hunt_id, function (err, hunt) {
            if (err) {
                res.status(400).json({ "status code": 400, "error code": "1005", "error message": "The user cannot be updated" });
            } else {
                hunt.userName = req.body.userName;
                hunt.emailAddress = req.body.emailAddress;
                hunt.password = req.body.password;
                hunt.userType = req.body.userType;
                hunt.firstName = req.body.firstName;
                hunt.lastName = req.body.lastName;
                hunt.phoneNumber = req.body.phoneNumber;
                hunt.save(function (err) {
                    if (err) {
                        res.status(400).send(String(err));
                    } else {
                        res.status(200).json({ "message": "Hunt Updated", "huntUpdated": hunt });
                    }
                });
            }
        });
    })
    /**
     * DELETE call for the user entity (single).
     * @returns {object} A string message. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, hunt) {
            if (err) {
                res.status(400).json({ "status code": 400, "error code": "1006", "error message": "The user cannot be deleted" });
            } else {
                res.status(200).json({ "message": "User Deleted" });
            }
        });
    });


    })
module.exports = router;
