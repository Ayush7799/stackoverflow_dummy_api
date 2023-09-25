import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true,
  },
  content: { type: String, required: true },
  created_at: { type: mongoose.Schema.Types.Date, default: new Date() },
  modified_at: { type: mongoose.Schema.Types.Date, default: new Date() },
});

commentSchema.pre("findOneAndDelete", async function (next) {
  try {
    const commentId = this._conditions._id;
    const comment = await Comment.findById(commentId);
    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    next(error);
  }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
