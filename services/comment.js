import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";

const getAll = async (req,res) => {
  let userId = req.query.userId;
  let data;
  if(userId){
    data = await Comment.find({userId: userId})
  }
  else{
    data = await Comment.find();
  }

  return {status: 200, jsonData: {message: "Answers fetched Successfully", data: data, page: "Comment"}}
}


const addComment = async (req, res) => { 
  req.body.createdAt = Date.now();
  const comment = await Comment.create(req.body);
  await Answer.updateOne(
    { _id: req.body.answerId },
    { $push: { commentIds: comment._id } }
  );
  return {status: 201, jsonData: { message: "Comment successfully Added", data: comment }}
};

const updateComment = async (req, res) => {
  const commentId = req.query.commentId;
  let updatedComment = {};
  try {
    const comment = await Comment.findById(commentId);
    if (comment.userId.toString() !== req.userId) {
      return {status: 409, jsonData: {message: "Unauthorized"}}
    }
     updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: { content: req.body.content, modifiedAt: Date.now() } },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }

  return {status: 200, jsonData: { message: "Comment Updated Successfully" , data: updatedComment}};
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
      return {status: 409, jsonData: {message: "Unauthorized"}}
    }
    await Comment.findByIdAndDelete(commentId);
  } catch (e) {
    console.log(e);
  }
  return {status: 200, jsonData: { message: "Successfully Deleted" }};
};

export { addComment, updateComment, deleteComment ,getAll};
