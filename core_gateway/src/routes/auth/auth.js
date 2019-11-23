var express = require('express');
var router = express.Router();
var libAuth = require('../../lib/service/auth');
var libUser = require('../../lib/admin/user');

/**
 * Login API, creates new Session.
 * Returns session Key and User Details
 * @param {Object} req request object
 * @param {Object} res response object
 */
async function loginUser(req, res) {
    try {
        var email = req.body.email;
        var auth_token = req.body.password;
        const userDetails = await libUser.getUserDetails({email, auth_token});
        console.log("User Details", userDetails);
        const sessionKey = await libAuth.generateSessionKey({email: userDetails.email});
        logger.info({
            req,
            message: 'Successfully authenticated user',
            section: 'routes.admin.auth.loginUser',
            sessionKey: sessionKey
        });
        return res.send({
            sessionKey:sessionKey,
            userDetails
        });

    }catch (error) {
        res.status(401).json(error);
        logger.error({
            req,
            message:'Failed to authenticate user',
            section: 'routes.admin.auth.loginUser',
            errorDetails: error,
        });
    }
}

/**
 * Logout API. Clears the session
 * @param {Object} req request object
 * @param {Object} res response object
 */
async function logoutUser(req, res) {
    try{
        var sessionKey = req.header('X-Session-Key');
        var authExpire = await  libAuth.expire({sessionKey});
        logger.info({
            req,
            message: 'Successfully logged out user',
            section: 'routes.admin.auth.logoutUser',
            sessionKey: sessionKey
        });
        return res.status(200).send(authExpire);
    }catch (error) {
        logger.error({
            req,
            message:'Failed to log out user user',
            section: 'routes.admin.auth.logoutUser',
            errorDetails: error,
        });
    }

}

router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
