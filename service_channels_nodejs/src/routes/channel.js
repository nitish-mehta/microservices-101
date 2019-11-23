var express = require("express");
var router = express.Router();
var channelLib = require("../lib/channel");

/**
 * Create new Channel
 * @param {Object} req request object
 * @param {Object} res response object
 */
async function createChannel(req, res) {
  try {
    var payload = req.body;

    var oUserInfo = JSON.parse(req.headers.user);
    var userId = oUserInfo.user_details && oUserInfo.user_details.user_id;
    var options = {
      channelName: payload.name,
      channelType: payload.type,
      userId
    };
    var response = await channelLib.addChannel(options);
    log.info("Add channel Response is", response);
    res.send({
      message: "Channel successfully added"
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create channel",
      errorType: "INTERNAL_SERVER_ERROR",
      errorDetail: error.message
    });
  }
}

/**
 * Fetch list of channels
 * @param {Object} req request object
 * @param {Object} res response object
 */
async function getAllChannels(req, res) {
  try {
    var oUserInfo = JSON.parse(req.headers.user);
    var userId = oUserInfo.user_details && oUserInfo.user_details.user_id;
    var response = await channelLib.getChannels(userId);
    res.send({
      channels: response
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
      errorType: "INTERNAL_SERVER_ERROR",
      errorDetail: JSON.stringify(error)
    });
  }
}

router.get("/", getAllChannels);
router.post("/", createChannel);

module.exports = router;
