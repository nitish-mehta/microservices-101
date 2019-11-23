var express = require("express");
var router = express.Router();
var commentLib = require("../lib/comment");

/**
 * Create new Comment
 * @param {Object} req request object
 * @param {Object} res response object
 */
async function createComment(req, res) {
  try {
    var payload = req.body;
    var options = {
      channelId: payload.channelId,
      commentText: payload.commentText
    };
    await commentLib.addComment(options);
    res.send({ message: "Comment successfully added" });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      errorType: "INTERNAL_SERVER_ERROR"
    });
  }
}

/**
 * Get comments for a given Channel
 * @param {Object} req request object
 * @param {Object} res response object
 */

async function getCommentsForChannel(req, res) {
  try {
    var channelId = req.params.channelId;
    var response = await commentLib.getCommentsForChannel({ channelId });
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      errorType: "INTERNAL_SERVER_ERROR"
    });
  }
}

router.post("/", createComment);
router.get("/:channelId", getCommentsForChannel);

module.exports = router;
