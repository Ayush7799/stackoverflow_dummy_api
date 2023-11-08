import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";
import { GET_ASYNC, SET_ASYNC, client } from "../utils/Database/redisConfig.js";
import statusCodes from "../utils/responseInfo/statusCodes.js";

const getAll = async (req, res) => {
  let userId = req.query.userId;
  let data;
  if (userId) {
    data = await Question.find({ userId: userId });
  } else {
    data = await Question.find();
  }
  return {
    status: 200,
    jsonData: {
      message: "Questions fetched Successfully",
      data: data,
      page: "Question",
    },
  };
};

const addQuestion = async (req, res) => {
  try {
    let tags = req.body.tags;
    tags = tags.map((tag) => tag.toLowerCase());
    const uniqueTags = [...new Set(tags)];
    req.body.tags = uniqueTags;
    const createdQuestion = await Question.create(req.body);
    return {
      status: statusCodes.CREATED,
      jsonData: {
        message: "Question successfully Added",
        data: createdQuestion,
      },
    };
  } catch (error) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      jsonData: { message: error.message },
    };
  }
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

const getQuestionDetails = async (req, res) => {
  const questionId = req.query.questionId;
  console.log(questionId);
  
  try {
    const reply = await client.get(`${questionId}`);
    if(reply){
      console.log("Using cached data");
      return {
        status: 200,
        jsonData: {
          message: "Question fetched successfully",
          data: JSON.parse(reply)
        },
      };
    }

    const data = await Answer.find({ questionId }).populate({
      path: "commentIds",
    });
    console.log(data);
    if (data) {
      const question = await Question.findById(questionId);
      data.question = question;
      const savedResult = await client.set(`${questionId}`,JSON.stringify(data), 'EX', 5);
      return {
        status: 200,
        jsonData: {
          message: "Question fetched successfully",
          data: { answerArray: data, question: question },
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

const updateVotes = async (req, res) => {
  const { userId, questionId, flag } = req.body;
  const question = await Answer.findById(questionId);
  if (flag) {
    await Question.updateOne(
      { _id: questionId },
      { $addToSet: { upvotes: userId } }
    );
    await Question.updateOne(
      { _id: questionId },
      { $pull: { downvotes: userId } }
    );
    await User.updateOne({ _id: question.userId }, { $inc: { points: 3 } });
  } else {
    await Question.updateOne(
      { _id: questionId },
      { $pull: { upvotes: userId } }
    );
    await Question.updateOne(
      { _id: questionId },
      { $addToSet: { downvotes: userId } }
    );
    await User.updateOne({ _id: question.userId }, { $inc: { points: -1 } });
  }

  return { status: 200, jsonData: {} };
};

const searchByTags = async (req, res) => {
  const tags = req.query.tags.trim();
  const tagsArray = tags.split(",");
  // console.log(tagsArray);
  const data = await Question.find({ tags: { $in: tagsArray } });
  return {
    status: 200,
    jsonData: { message: "Fetched Data Succesfully", data: data },
  };
};

export {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  updateVotes,
  getQuestionDetails,
  searchByTags,
  getAll,
};
