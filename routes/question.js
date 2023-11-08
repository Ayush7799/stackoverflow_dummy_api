import { Router } from "express";
import { verifyToken } from "../utils/authentication/jwtAuthentication.js";
import { addQuestionController, deleteQuestionController, getAllController, getQuestionDetailsController, searchByTagsController, updateQuestionController, updateVotesController } from "../controller/question.js";
const router = Router();

router
  .get("/get-all",getAllController)
  .get("/get-details", getQuestionDetailsController)
  .get("/getByTag",searchByTagsController)
  .post("/upload-question", verifyToken,addQuestionController)
  .patch("/update-question", verifyToken, updateQuestionController)
  .patch("/update-votes",verifyToken,updateVotesController)
  .delete("/delete-question", verifyToken, deleteQuestionController);

export default router;


