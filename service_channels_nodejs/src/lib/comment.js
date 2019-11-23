var Comment = require("../models/comment");
var channelLib = require("./channel");

/**
 * Inserts the comment in database for a given Channel
 * @param {user, channelName, commentText } object having
 * user - User which created the channel
 * channelId - channel name
 * and commentText -  Text of the given comment
 */
async function addComment({ userId, channelId, commentText }) {
  try {
    // TIP: verify if user belongs to channel and channel exists
    // const channel = await channelLib.getChannelById({
    //   userId,
    //   channelId
    // });

    // create and save comment against the channel
    const comment = new Comment({
      channel: channelId,
      text: commentText
    });
    const newComment = await comment.save();
    return newComment;
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Fetches the details of a comments for a given channelId
 * @param {channelId} object having
 */
async function getCommentsForChannel({ channelId }) {
  try {
    const comment = await Comment.find({
      channel: channelId
    }).populate("MeetupChannel");
    return comment;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  addComment,
  getCommentsForChannel
};
