import { addQuestion, deleteQuestion, getAll, updateQuestion } from "../services/question.js";
import { addQuestionSchema } from "../utils/schemaValidation/questionValidation.js";

const addQuestionController = async (req, res) => {
  const {error} = addQuestionSchema.validate(req.body);
  if (error) {
    return res.json({
      message: "Invalid Body Format",
      error: error.message,
    });
  }

  if (req.body.userId !== req.userId) {
    return res.json({ message: "Not Authorized" });
  }
  const resObj = await addQuestion(req,res);

  return res.status(resObj.status).json(resObj.jsonData);
};

const deleteQuestionController = async (req, res) => {
    const resObj = await deleteQuestion(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
};

const updateQuestionController = async (req, res) => {
    const resObj = await updateQuestion(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
};

const getAllController = async (req, res) => {
    const resObj = await getAll(req,res);
    console.log(resObj);
    return res.status(resObj.status).json(resObj.jsonData);
};

const updateVotesController = async (req,res) => {
    const resObj = await updateVotes(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
}

export { addQuestionController, deleteQuestionController, updateQuestionController, getAllController, updateVotesController };
