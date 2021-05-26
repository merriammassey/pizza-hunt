const { Schema, model, Types } = require("mongoose");
const { STRING } = require("sequelize/types");
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
  {
    //create custom id to avoid confusion with parent comment id
    replyId: {
      type: Schema.Types.ObjectId(),
    },
    replyBody: {
      type: STRING,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      //enable getters
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    //associate replies with comments, nested not referred to
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      //enable getters
      getters: true,
    },
    id: false,
  }
);

//virtual for reply count
CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
