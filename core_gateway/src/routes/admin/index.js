const express = require("express");
const { USER_ROLES } = require("../../config/constants");
const userRoutes = require("./user");
const acl = require("../../middlewares/acl")();

const router = express.Router();

// ensure only users with role ADMIN are able to access the below routes
router.use(acl.is(USER_ROLES.ADMIN));
router.use("/user", userRoutes);

module.exports = router;
