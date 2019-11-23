var randomstring = require("randomstring");
var cache = require("memory-cache");
var constants = require("../../config/constants");

async function generateSessionKey({ email }) {
  const authToken = randomstring.generate(32);
  const authKey = "auth:" + authToken;
  cache.put(authKey, email, constants.EXPIRY_TIME);
  return authToken;
}

async function expire({ sessionKey }) {
  var authKey = "auth:" + sessionKey;
  var userEmail = await cache.get(authKey);
  if (userEmail) {
    cache.del(authKey);
  } else {
    throw new Error("Unable to Logout");
  }
}

module.exports = {
  generateSessionKey,
  expire
};
