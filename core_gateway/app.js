/**
 * This is where it all begins
 * @fileoverview: Starting point of the NodeJS application for our gateway
 */

const express = require("express");
const cors = require("cors");
const compression = require("compression");

const { WEBAPP_HOSTNAME_URI } = require("./src/config");

const routes = require("./src/routes");

const app = express();
const CONFIG = require("./src/config/index");
global.logger = require("./src/utils/logger");

// allow CORS specifically from only our front-end client
app.use(
  cors({
    origin: [WEBAPP_HOSTNAME_URI],
    allowedHeaders: ["Content-Type", "Authorization", "X-Session-Key"],
    credentials: true
  })
);
app.use(compression());

// use `/api` prefix for all routes
app.use("/api", routes);
app.use("/api", (_, res) => {
  res.status(404).json({
    type: "NOT FOUND",
    msg: "Resource not found!"
  });
});

var server = app.listen(CONFIG.PORT, function() {
  console.log("Ready on port %d", server.address().port);
});

module.exports = app;
module.exports = {
  app
};
