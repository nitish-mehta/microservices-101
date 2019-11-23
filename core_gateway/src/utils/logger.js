/**
 * @fileoverview: Helper Utility for logging utilized to keep centralized log management
 * TIP: Enhance this as per your application needs to plug in remote logging services
 */

var log4js = require("log4js");
var logger = log4js.getLogger("CORE_SERVICE");
const CONFIG = require("../config/index");
var logLevel = CONFIG["LOG_LEVEL"];
logger.level = logLevel;

module.exports = logger;
