/**
 * Express Route: /users
 * @author Clark Jeria
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
     * @param {String} userName - The userName of the new user
     * @param {String} emailAddress - The emailAddress of the new user
     * @param {string} password - The password of the new user
     * @param {string} userType - The userType of the new user
     * @param {string} firstName - The first name of the new user
     * @param {string} lastName - The last name of the new user
     * @param {String} phoneNumber - The phone number of the new user
     * @returns {object} A message and the user created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        var user = new User();

        user.userName = req.body.userName;
        user.emailAddress = req.body.emailAddress;
        user.password = req.body.password;
        user.userType = req.body.userType;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
	if (typeof req.body.phoneNumber !== 'undefined'){
		user.phoneNumber = req.body.phoneNumber;
	}
        user.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(user);
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
        User.findById(req.params.user_id, function (err, user) {
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
     * PATCH call for the user entity (single).
     * @param {String} userName - The userName of the new user
     * @param {String} emailAddress - The emailAddress of the new user
     * @param {string} password - The password of the new user
     * @param {string} userType - The userType of the new user
     * @param {string} firstName - The first name of the new user
     * @param {string} lastName - The last name of the new user
     * @param {String} phoneNumber - The phone number of the new user
     * @returns {object} A message and the user updated. (200 Status Code)
     * @throws Mongoose Database Error (500 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .patch(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.status(400).json({ "status code": 400, "error code": "1005", "error message": "The user cannot be updated" });
            } else {
                user.userName = req.body.userName;
                user.emailAddress = req.body.emailAddress;
                user.password = req.body.password;
                user.userType = req.body.userType;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.phoneNumber = req.body.phoneNumber;
                user.save(function (err) {
                    if (err) {
                        res.status(400).send(String(err));
                    } else {
                        res.status(200).json({ "message": "User Updated", "userUpdated": user });
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
        }, function (err, user) {
            if (err) {
                res.status(400).json({ "status code": 400, "error code": "1006", "error message": "The user cannot be deleted" });
            } else {
                res.status(200).json({ "message": "User Deleted" });
            }
        });
    });

/**
 * Express Route: /users/login
 * @param {string} user_id - Id Hash of driver Object
 */
router.route('/users/login')
    /**
     * POST call for the user entity.
     * @param {String} userName - The userName of the new user body
     * @param {string} password - The password of the new user body
     * @returns {object} A message and the user created. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .post(function (req, res) {
        var userBody = new User();
        userBody.userName = req.body.userName;
        userBody.password = req.body.password;
        User.findOne({ userName: req.body.userName, password: req.body.password }, function (err, user) {
            if (err) {
                res.status(500).json({ "status code": 500, "error code": "1002", "error message": "Internal server error" });
            } else {
               if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ "message": "Login Failed!" });
                }
            }
        });
    });

router.route('/users/passwordrecovery')
    .post(function (req, res) {
        var userData = new Object();

        if(typeof req.body.userName !== 'undefined'){
            userData.userName = req.body.userName;
        }
        if(typeof req.body.emailAddress !== 'undefined'){
            userData.emailAddress = req.body.emailAddress;
        }
        User.findOne(userData, function (err, user) {
            if (err) {
                res.status(500).json({ "status code": 500, "error code": "1002", "error message": "Internal server error" });
            } else {
               if (user) {

                    res.mailer.send('email', {
                    to: user.emailAddress,
                    subject: 'Password Recovery', // REQUIRED.
                    }, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(500).send('There was an error sending the email');
                            return;
                        }
                        res.json( {message : 'Email Sent'} );
                    });
                }
                else {
                    res.status(404).json({ "message": "Invalid data (Username or e-mail)" });
                }
            }
        });

    })
module.exports = router;
