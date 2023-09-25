import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";

const addComment = async (req, res) => {
  req.body.createdAt = Date.now();
  const comment = new Comment(req.body);
  if (comment.userId.toString() !== req.userId) {
    res.json({ message: "Wrong Bearer Token" });
    return;
  }
  await comment.save();
  return res.json({ message: "Comment successfully Added", data: comment });
};

const updateComment = async (req, res) => {
  const commentId = req.query.commentId;

  try {
    const comment = await Comment.findById(commentId);
    if (comment.userId.toString() !== req.userId) {
      res.json({ message: "Wrong Bearer Token" });
      return;
    }
    const updateComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { content: req.body.content, modifiedAt: Date.now() } },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }

  res.json({ message: "Comment Updated Successfully" });
};

const deleteComment = async (req, res) => {
  const commentId = req.query.commentId;
  try {
    const comment = Comment.findById(commentId);
    const answer = Answer.findById(comment.answerId);
    const question = Question.findById(answer.questionId);
    if (
      req.userId !== comment.userId.toString() &&
      req.userId !== answer.userId.toString() &&
      req.userId !== question.userId.toString()
    ) {
      res.json({ message: "Wrong access Token" });
      return;
    }
    await Comment.findByIdAndDelete(commentId);
  } catch (e) {
    console.log(e);
  }
  res.json({ message: "Successfully Deleted" });
};

export { addComment, updateComment, deleteComment };
