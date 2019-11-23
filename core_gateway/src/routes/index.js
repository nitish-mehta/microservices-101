/**
 * @fileoverview: Manages all routing for this application
 */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const acl = require("../middlewares/acl")();
const adminRoutes = require("./admin");
const authRoutes = require("./auth");
const proxyRoutes = require("./service");

const router = express.Router();

router.use(cookieParser());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// open routes that do not need authentication
router.use("/auth", authRoutes);

// routes that only logged in users must be able to access
router.use(acl.validate());
router.use("/admin", adminRoutes);
router.use("/", proxyRoutes);

module.exports = router;
