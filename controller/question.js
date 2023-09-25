import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";

const addQuestion = async (req, res) => {
  req.body.createdAt = Date.now();
  const question = new Question(req.body);
  if (question.userId.toString() !== req.userId) {
    res.json({ message: "Wrong Bearer Token" });
    return;
  }
  await question.save();
  return res.json({ message: "Question successfully Added", data: question });
};

const deleteQuestion = async (req, res) => {
  const questionId = req.query.questionId;
  let resData;
  try {
    const question = await Question.findById(questionId);
    if (question.userId.toString() !== req.userId) {
      res.json({ message: "Wrong Bearer Token" });
      return;
    }
    await Answer.deleteMany({ questionId: questionId });
    await Comment.deleteMany({ questionId: questionId });
    resData = await Question.findOneAndDelete({ _id: questionId });
  } catch (e) {
    console.log(e);
  }
  res.json({ message: "Successfully Deleted", data: resData });
};

const updateQuestion = async (req, res) => {
  const questionId = req.query.questionId;
  const updatedQuestion = {};
  try {
    const question = await Question.findById(questionId);

    if (question.userId.toString() !== req.userId) {
      res.json({ message: "Wrong Bearer Token" });
      return;
    }
    updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $set: { content: req.body.content, modifiedAt: Date.now() } },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }

  res.json({ message: "Question Updated Successfully" , data: updatedQuestion});
};

const getAll = async (req, res) => {
  const questionId = req.query.questionId;
  try {
    const data = await Answer.find({ questionId }).populate({
      path: "commentIds",
    });
    if (data) {
      return res.json({message: "Data Fetched Successfully",data});
    } else {
      return res.json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { addQuestion, deleteQuestion, updateQuestion, getAll };
