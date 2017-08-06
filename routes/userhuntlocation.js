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
     * @param {String} huntId - The huntId of the new hunt
     * @param {string} status - The status of the new hunt
     * @returns {object} A message and the hunt created. (201 Status Code)
     * @throws Bad Request (400 Status Code)
     */
    .post(function (req, res) {
        var userhunt = new UserHuntLocation();
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
    })

    .get(function (req, res) {
        var userhunt = new UserHuntLocation();
        userhunt.userId = mongoose.Types.ObjectId('59868b999a9bca4287d60837');
        userhunt.huntId = mongoose.Types.ObjectId('5986caaf4bfb0c6fc0564282');
        userhunt.locationId = mongoose.Types.ObjectId('5986caaf4bfb0c6fc0564284');
        userhunt.status = 'found';
        userhunt.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(userhunt);
            }
        });
    });



module.exports = router;
