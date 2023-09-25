import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
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
  content: { type: String, required: true },
  created_at: { type: mongoose.Schema.Types.Date, default: new Date() },
  modified_at: { type: mongoose.Schema.Types.Date, default: new Date() },
});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
