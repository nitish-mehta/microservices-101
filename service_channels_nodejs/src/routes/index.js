const express = require("express");
const channelRoutes = require("./channel");
const bodyParser = require("body-parser");
const commentRoutes = require("./comment");
const pingRoutes = require("./ping");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use("/ping", pingRoutes);

// TIP: additional middlewares specific to this microservice can be added for generic validation checks here
// example - validate if user has access to channel before performing any related channel
router.use("/channel", channelRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
