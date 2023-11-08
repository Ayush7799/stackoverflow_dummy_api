import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";
import User from "../models/userSchema.js";

const getAll = async (req,res) => {
  let userId = req.query.userId;
  let data;
  if(userId){
    data = await Answer.find({userId: userId})
  }
  else{
    data = await Answer.find();
  }

  return {status: 200, jsonData: {message: "Answers fetched Successfully", data: data, page: "Answer"}}
}



const addAnswer = async (req, res) => {
  const count = await User.findOne(
    {_id: req.userId},
    {votes: 1}
  )
   if(count.votes<30){
    return {status:409, jsonData: {message: "Not enough points"}}
   }
  const question = await Question.findById(req.body.questionId);
  if (question.userId.toString() === req.userId) {
    return {status: 409 , jsonData: {message: "Unauthorized"}}
  }
  const answer = await Answer.create(req.body);
  return {status: 201 , jsonData: {message: "Answer sucessfully added", data:answer}}
};

const updateAnswer = async (req, res) => {
  const answerId = req.query.answerId;
  const updatedAnswer = {};
  try {
    const answer = await Answer.findById(answerId);
    if (answer.userId.toString() !== req.userId) {
      return {status: 409 , jsonData: {message: "Unauthorized"}}

    }
    updatedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      { $set: { content: req.body.content, modifiedAt: Date.now() } },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }

  return {status: 200 , jsonData: { message: "Answer Updated Successfully" , data: updatedAnswer}}
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
      return {status: 409 , jsonData: {message: "Unauthorized"}}
    }
    await Comment.deleteMany({ answerId: answerId });
    await Answer.findByIdAndDelete(answerId);
  } catch (e) {
    console.log(e);
  }
  return {status: 200 , jsonData: { message: "Successfully Deleted" }}

};

const updateVotes = async (req,res) => {
  const {userId, answerId, flag} = req.body;
  const answer = await Answer.findById(answerId);
  if(flag){
    const config = await Answer.updateOne(
      { _id: answerId },
      { $addToSet: { upvotes: userId } }
    );
    await Answer.updateOne(
      { _id: answerId },
      { $pull: { downvotes: userId } }
    );
    if(config.modifiedCount==1){
      await User.updateOne(
        {_id: answer.userId},
        {$inc: {points: 3}}
      )
    }
   
  }
  else{
    await Answer.updateOne(
      { _id: answerId },
      { $pull: { upvotes: userId } }
    );
    const config = await Answer.updateOne(
      { _id: answerId },
      { $addToSet: { downvotes: userId } }
    );

    if(config.modifiedCount==1){
      await User.updateOne(
        {_id: answer.userId},
        {$inc: {points: -1}}
      )
    }
   
  }

  return {status: 200, jsonData: {}}
}

export { addAnswer, updateAnswer, deleteAnswer, updateVotes, getAll };