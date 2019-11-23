var log4js = require('log4js');
var logger = log4js.getLogger("CHANNELS");
var logLevel = config["LOG_LEVEL"];
logger.level = logLevel;


module.exports = logger;