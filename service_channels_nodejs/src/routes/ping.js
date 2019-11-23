var express = require('express');
var router = express.Router();

/**
 * Ping API to check health status
 * @param {Object} req request object
 * @param {Object} res response object
 */
router.get('/',function (req, res) {
    return res.status(200).send(new Date());
});

module.exports = router;
