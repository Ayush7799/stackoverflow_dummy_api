import { Router } from "express";
import { addAnswer, deleteAnswer } from "../services/answer.js";
import { verifyToken } from "../utils/authentication/jwtAuthentication.js";
import { addAnswerController, deleteAnswerController, updateVotesController } from "../controller/answer.js";
const router = Router();

router
  .post("/upload-answer", verifyToken, addAnswerController)
  .patch("/update-votes",verifyToken,updateVotesController)
  .delete("/delete-answer", verifyToken, deleteAnswerController);

export default router;
