var Channel = require("../models/channel");

/**
 * Creates a channel record in database
 * @param {user, channelName, channelType } object having
 * userId - User which created the channel
 * channelName - channel name
 * and channelType -  Currently Public Channel or Private Channel
 */
async function addChannel({ userId, channelName, channelType = "PUBLIC" }) {
  try {
    const channel = new Channel({
      userId,
      name: channelName,
      type: channelType
    });
    let newChannel = await channel.save();
    return newChannel;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetches the details of a channel for a given channelId and user
 * @param {channelId, userId} object having
 */
async function getChannelById({ channelId, userId }) {
  try {
    const channel = await Channel.find({
      _id: channelId,
      userId
    });
    return channel[0];
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetches all the channels in the Database which matches
 */
async function getChannels(userId) {
  try {
    const channelList = await Channel.find({ userId });
    return channelList;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  addChannel,
  getChannelById,
  getChannels
};
