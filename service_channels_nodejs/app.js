/**
 * Entry point for the slack channels application
 */
var express = require("express");

/*
 global variables
 */
global.config = require("./src/config/index");
global.log = require("./src/utils/log.js");

var routes = require("./src/routes");
var app = express();

app.use("/channels", routes);

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Session-Key, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  log.error(err);

  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    statusCode: err.status,
    error: err.error,
    errorMessage: err.message
  });
});

var server = app.listen(config["CHANNELS"].PORT, function() {
  console.log("Ready on port %d", server.address().port);
});

module.exports = app;
