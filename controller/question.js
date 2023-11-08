import { addQuestion, deleteQuestion, getAll, getQuestionDetails, searchByTags, updateQuestion } from "../services/question.js";
import statusCodes from "../utils/responseInfo/statusCodes.js";
import { addQuestionSchema } from "../utils/joiValidators/questionValidation.js";
import response from "../utils/responseInfo/response.js";

const getAllController = async (req,res) => {
  const resObj = await getAll(req,res);
  if(!resObj.jsonData.data)return res.render('404');
  return res.render('details',resObj);
}

const addQuestionController = async (req, res) => {
  const {error} = addQuestionSchema.validate(req.body);
  if (error) {
    return res.json({
      message: "Invalid Body Format",
      error: error.message,
    });
  }

  if (req.body.userId !== req.userId) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: "Not Authorized" });
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

const getQuestionDetailsController = async (req, res) => {
    const resObj = await getQuestionDetails(req,res);
    console.log(resObj)

    if(!resObj.jsonData.data)return res.render("404");
    return response(res,resObj.status,resObj.jsonData);
    // return res.render("question",{data:resObj.jsonData.data});
};

const updateVotesController = async (req,res) => {
    const resObj = await updateVotes(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
}

const searchByTagsController = async (req, res) => {
    const resObj = await searchByTags(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
 
}

export { addQuestionController, deleteQuestionController, updateQuestionController, getQuestionDetailsController, updateVotesController, searchByTagsController,getAllController };
