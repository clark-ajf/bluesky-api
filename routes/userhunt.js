/** 
 * Express Route: /userhunts
 * @author Ananth Bommireddipalli
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var UserHunt = require('../app/models/userhunt');

router.route('/userhunts')
    /**
     * POST call for the userhunt entity.
     * @param {String} userId - The userId of the new hunt
     * @param {String} huntId - The huntId of the new hunt
     * @param {string} status - The status of the new hunt
     * @returns {object} A message and the hunt created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        var userhunt = new UserHunt();
        userhunt.userId = req.body.userId;
        userhunt.huntId = req.body.huntId;
        userhunt.status = req.body.status;
        userhunt.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(userhunt);
            }
        });
    });

/** 
 * Express Route: /hunts/:user_id
 * @param {string} userId - Id Hash of driver Object
 */
router.route('/hunts/:user_id/:hunt_id')
    /**
     * GET call for the userhunt entity (single).
     * @returns {object} the user with Id userId and hunt with Id huntId. (200 Status Code)
     * @throws Not Found (404 Status Code)
     */
    .get(function (req, res) {
        UserHunt.findById(req.params.userId, req.params.huntId, function (err, userhunt) {
            if (err) {
                res.status(404).json({ "status code": 404, "error code": "1004", "error message": "Given user hunt does not exist" });
            } else {
                if (userhunt) {
                    res.status(200).json(userhunt)
                }
                else {
                    res.status(404).send(err);
                }
            }
        });
    })

module.exports = router;
