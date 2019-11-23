const db = require("../utils/mongo-client");
const Schema = db.Schema;

const channelSchema = new Schema(
  {
    name: String,
    type: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC"
    },
    userId: String
  },
  { timestamps: true }
);

const Channel = db.model("MeetupChannel", channelSchema);
module.exports = Channel;
