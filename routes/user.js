/** 
 * Express Route: /hunts
 * @author Ananth Bommireddipalli
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

router.route('/users')
    /**
     * GET call for the user entity (multiple).
     * @returns {object} A list of users. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     */
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.status(500).json({ "status code": 500, "error code": "1002", "error message": "Internal server error" });
            } else {
                res.status(200).json(users);
            }
        });
    })
    /**
     * POST call for the user entity.
     * @param {Number} userId - The user id of the new user
     * @param {String} email - The email of the new user
     * @param {Boolean} organizer - Organize capabilties
     * @returns {object} A message and the user created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        User.findOne({ userId: req.body.userId}, function (error, user) {
            if (error) {
                res.status(404).json({ "status code": 404, "error code": "1004", "error message": "Given user does not exist" });
            } else {
                if (user) {
                    res.status(200).json(user)
                }
                else {
                    var newUser = new User();

                    newUser.userId = req.body.userId;
                    newUser.email = req.body.email;
                    newUser.organizer = req.body.organizer;
                    newUser.save(function (err) {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.status(201).json(newUser);
                        }
                    });
                }
            }
        });
    });

/**
 * Express Route: /users/:user_id
 * @param {string} user_id - Id Hash of driver Object
 */
router.route('/users/:user_id')
    /**
     * GET call for the user entity (single).
     * @returns {object} the user with Id user_id. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {
        User.findOne({ userId: req.params.user_id}, function (err, user) {
            if (err) {
                res.status(404).json({ "status code": 404, "error code": "1004", "error message": "Given user does not exist" });
            } else {
                if (user) {
                    res.status(200).json(user)
                }
                else {
                    res.status(404).send(err);
                }
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
            userId: req.params.user_id
        }, function (err, user) {
            if (err) {
                res.status(400).json({ "status code": 400, "error code": "1006", "error message": "The user cannot be deleted" });
            } else {
                res.status(200).json({ "message": "User Deleted" });
            }
        });
    });

module.exports = router;
