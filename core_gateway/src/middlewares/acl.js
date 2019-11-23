/**
- * @fileoverview: This is the central point of authentication
- * 1. `is` function validates that a user is of particular role. This is used to provide functional level auth.
- * 2. `validate` is used to authorize middle request and then pass on to respective micro-service.
- */
const { ERROR_TYPES, USER_ROLES } = require("../config/constants");
var cache = require("memory-cache");
const libUser = require("../lib/admin/user");

function Acl() {
  return {
    is(role) {
      return (req, res, next) => {
        const userDetails = req.user.user_details;
        const { is_admin } = userDetails;
        if (role === USER_ROLES.ADMIN) {
          if (is_admin) {
            next();
            return;
          } else {
            res.status(403).json({
              type: ERROR_TYPES.AUTHENTICATION_ERROR,
              msg: "Unauthorised",
              errorDetail:
                "You do not have necessary authorization for this action. Contact support for assistance."
            });
          }
        } else {
          if (userDetails.role === role) {
            next();
            return;
          } else {
            //throw error
          }
        }
      };
    },
    validate() {
      return function(req, res, next) {
        var sessionKey = req.header("X-Session-Key");
        req.user = {};

        if (!sessionKey) {
          res.status(401).json({
            type: ERROR_TYPES.AUTHENTICATION_ERROR,
            msg: "Unauthenticated",
            errorDetail: "Session Key missing for authentication"
          });
        }

        const authKey = "auth:" + sessionKey;
        const userEmail = cache.get(authKey);
        if (!userEmail) {
          res.status(401).json({
            type: ERROR_TYPES.AUTHENTICATION_ERROR,
            msg: "Unauthenticated",
            errorDetail:
              "Session Key expired for authentication. Please login again"
          });
          return;
        }
        libUser
          .getUserDetails({ email: userEmail })
          .then(userDetails => {
            req.user.user_details = userDetails;
            next();
            return;
          })
          .catch(error => {
            console.log(error);
            res.status(403).json({
              type: ERROR_TYPES.AUTHENTICATION_ERROR,
              msg: "Unauthenticated",
              errorDetail: "OOps Session Expired. Please login again"
            });
          });
      };
    }
  };
}

module.exports = Acl;
