import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";

const addQuestion = async (req, res) => {
  const tags = req.body.tags;
  tags = tags.map((tag) => tag.toLowerCase())
  const uniqueTags = [...new Set(tags)];
  req.body.tags = uniqueTags;
  const createQuestion = await Question.create(req.body);
  return {
    status: 201,
    jsonData: {
      message: "Question successfully Added",
      data: createQuestion,
    },
  };
};

const deleteQuestion = async (req, res) => {
  const questionId = req.query.questionId;
  let resData;
  try {
    const question = await Question.findById(questionId);
    if (question.userId.toString() !== req.userId) {
      return {
        status: 401,
        jsonData: {
          message: "Unauthorized",
        },
      };
    }
    await Answer.deleteMany({ questionId: questionId });
    await Comment.deleteMany({ questionId: questionId });
    resData = await Question.findOneAndDelete({ _id: questionId });
  } catch (e) {
    console.log(e);
  }

  return {
    status: 201,
    jsonData: {
      message: "Question successfully Deleted",
      data: resData,
    },
  };
};

const updateQuestion = async (req, res) => {
  const questionId = req.query.questionId;
  const updatedQuestion = {};
  try {
    const question = await Question.findById(questionId);

    if (question.userId.toString() !== req.userId) {
      return {
        status: 401,
        jsonData: {
          message: "Unauthorized",
        },
      };
    }
    updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { $set: { content: req.body.content, modifiedAt: Date.now() } },
      { new: true }
    );
  } catch (e) {
    console.log(e);
  }

  return {
    status: 200,
    jsonData: {
      message: "Question Updated Successfully",
      data: updatedQuestion,
    },
  };
};


const getAll = async (req, res) => {
  const questionId = req.query.questionId;

  try {
    const data = await Answer.find({ questionId }).populate({
      path: "commentIds",
    });
    if (data) {
      console.log("Id", data);

      return {
        status: 200,
        jsonData: {
          message: "Question fetched successfully",
          data: data,
        },
      };
    } else {
      return {
        status: 401,
        jsonData: {
          message: "Not Found",
        },
      };
    }
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      jsonData: {
        message: "Not Found",
      },
    };
  }
};

const updateVotes = async (req,res) => {
  const {userId, questionId, flag} = req.body;
  const question = await Answer.findById(questionId);
  if(flag){
    await Question.updateOne(
      { _id: questionId },
      { $addToSet: { upvotes: userId } }
    );
    await Question.updateOne(
      { _id: questionId },
      { $pull: { downvotes: userId } }
    );
    await User.updateOne(
      {_id: question.userId},
      {$inc: {points: 3}}
    )
  }
  else{
    await Question.updateOne(
      { _id: questionId },
      { $pull: { upvotes: userId } }
    );
    await Question.updateOne(
      { _id: questionId },
      { $addToSet: { downvotes: userId } }
    );
    await User.updateOne(
      {_id: question.userId},
      {$inc: {points: -1}}
    )
  }

  return {status: 200, jsonData: {}}
}


export { addQuestion, deleteQuestion, updateQuestion, updateVotes, getAll };
