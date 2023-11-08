import Answer from "../models/answerSchema.js";
import Comment from "../models/commentSchema.js";
import Question from "../models/questionSchema.js";
import { addComment, deleteComment, getAll, updateComment } from "../services/comment.js";
import { addCommentSchema } from "../utils/joiValidators/commentValidation.js";


const getAllController = async (req,res) => {
  const resObj = await getAll(req,res);
  return res.render('details',resObj);
}

const addCommentController = async (req, res) => {
  const validation = addCommentSchema.validate(req.body);
  if(validation.error){
      return res.json({message: "Invalid Body Format", error: validation.error.details});
  }
  req.body.createdAt = Date.now();
  if (req.body.userId !== req.userId) {
    return res.json({ message: "Unauthorized" });
  }
  const resObj = await addComment(req,res);
  return res.status(resObj.status).json(resObj.jsonData);
};

const updateCommentController = async (req, res) => {
    const resObj = await updateComment(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
};

const deleteCommentController = async (req, res) => {
    const resObj = await deleteComment(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
};

export { addCommentController, updateCommentController, deleteCommentController,getAllController};
