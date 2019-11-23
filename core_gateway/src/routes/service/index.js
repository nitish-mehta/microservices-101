const express = require("express");
const router = express.Router();
const acl = require("../../middlewares/acl")();
const proxyMapper = require("../../middlewares/proxyMapper");

// TIP: Use env variables to maintain these URLS across dev-staging-prod
// forward request to channel microservice
router.all("/channels*", proxyMapper("http://localhost:8010"));

// forward request to task microservice
router.all("/tasks*", proxyMapper("http://localhost:4010"));

router.use("*", (_, __, next) => next());

module.exports = router;
