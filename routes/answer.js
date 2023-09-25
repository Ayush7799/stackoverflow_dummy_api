import { Router } from "express";
import { addAnswer, deleteAnswer } from "../controller/answer.js";
import { verifyToken } from "../services/jwtAuthentication.js";
const router = Router();

router
  .post("/upload-answer", verifyToken, addAnswer)
  .delete("/delete-answer", verifyToken, deleteAnswer);

export default router;
