// load environment variables
require("dotenv").config();

module.exports = {
  CHANNELS: {
    PORT: process.env.PORT
  },
  MONGO: {
    HOST: process.env.MONGO_HOST,
    POOL_SIZE: process.env.MONGO_POOL_SIZE
  },
  LOG_LEVEL: process.env.LOG_LEVEL
};
