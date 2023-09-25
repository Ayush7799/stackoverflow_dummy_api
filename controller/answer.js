import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";

const addAnswer = async (req, res) => {
  const answer = new Answer(req.body);

  if (answer.userId.toString() !== req.userId) {
    res.json({ message: "Wrong Bearer Token" });
    return;
  }

  const question = await Question.findById(req.body.questionId);

  if (question.userId.toString() === req.userId) {
    res.json({ message: "Question owner can't answer" });
    return;
  }
  await answer.save();
  return res.json({ message: "Answer successfully Added", data: answer });
};

const updateAnswer = async (req, res) => {
  const answerId = req.query.answerId;
  const updatedAnswer = {};
  try {
    const answer = await Answer.findById(answerId);
    if (answer.userId.toString() !== req.userId) {
      res.json({ message: "Wrong Bearer Token" });
      return;
    }
    updatedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      { $set: { content: req.body.content, modifiedAt: Date.now() } },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }

  res.json({ message: "Answer Updated Successfully" , data: updatedAnswer});
};

const deleteAnswer = async (req, res) => {
  const answerId = req.query.answerId;
  
  try {
    const answer = await Answer.findById(answerId);
    const question = await Question.findById(answer.questionId);
    if (
      answer.userId.toString() !== req.userId &&
      question.userId.toString() !== req.userId
    ) {
      res.json({ message: "Wrong Bearer Token" });
      return;
    }
    await Comment.deleteMany({ answerId: answerId });
    await Answer.findByIdAndDelete(answerId);
  } catch (e) {
    console.log(e);
  }
  res.json({ message: "Successfully Deleted" });
};

export { addAnswer, updateAnswer, deleteAnswer };
