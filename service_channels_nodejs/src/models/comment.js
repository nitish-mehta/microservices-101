const db = require("../utils/mongo-client");
const Schema = db.Schema;

const commentSchema = new Schema(
  {
    text: String,
    channel: {
      type: Schema.Types.ObjectId,
      ref: "MeetupChannel",
      required: true
    }
  },
  { timestamps: true }
);

const Comment = db.model("MeetupChannelComment", commentSchema);
module.exports = Comment;
