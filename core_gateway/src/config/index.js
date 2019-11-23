// load environment variables
require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOSTNAME_URI: process.env.HOSTNAME_URI,
  WEBAPP_HOSTNAME_URI: process.env.WEBAPP_HOSTNAME_URI,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL
};
