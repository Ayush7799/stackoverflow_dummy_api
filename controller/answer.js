
import { addAnswer, deleteAnswer, updateAnswer, updateVotes } from "../services/answer.js";
import { addAnswerSchema } from "../utils/schemaValidation/answerValidation.js";

const addAnswerController = async (req, res) => {
  const validation = addAnswerSchema.validate(req.body);
    if(validation.error){
        return res.json({message: "Invalid Body Format", error: validation.error.details});
    }
  if (req.body.userId !== req.userId) {
    return res.json({ message: "Unauthorized" });
  }
  const resObj = await addAnswer(req,res);
  return res.status(resObj.status).json(resObj.jsonData);
};

const updateAnswerController = async (req, res) => {
  const resObj = await updateAnswer(req,res);
  return res.status(resObj.status).json(resObj.jsonData);
};

const deleteAnswerController = async (req, res) => {
    const resObj = await deleteAnswer(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
};

const updateVotesController = async (req,res) => {
    const resObj = await updateVotes(req,res);
    return res.status(resObj.status).json(resObj.jsonData);
}

export { addAnswerController, updateAnswerController, deleteAnswerController, updateVotesController };
