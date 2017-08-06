/** 
 * Express Route: /userhunts
 * @author Ananth Bommireddipalli
 * @version 0.0.1
 */
var express = require('express');
var router = express.Router();
var mongoose     = require('mongoose');
var UserHuntLocation = require('../app/models/userhuntlocation');

router.route('/userhuntlocations')
    /**
     * POST call for the userhunt entity.
     * @param {String} userId - The userId of the new hunt
     * @param {String} locationId - The locationId of the new hunt
     * @param {string} status - The status of the new hunt
     * @returns {object} A message and the hunt created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        var userhuntlocation = new UserHuntLocation();
        userhuntlocation.userId = mongoose.Types.ObjectId(req.body.userId);
        userhuntlocation.locationId = mongoose.Types.ObjectId(req.body.locationId);
        userhuntlocation.status = req.body.status;
        userhuntlocation.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(userhuntlocation);
            }
        });
    })



module.exports = router;
