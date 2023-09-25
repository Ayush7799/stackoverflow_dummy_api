import { Router } from "express";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  getAll,
} from "../controller/question.js";
import { verifyToken } from "../services/jwtAuthentication.js";
const router = Router();

router
  .get("/get-all", getAll)
  .post("/upload-question", verifyToken,addQuestion)
  .patch("/update-question", verifyToken, updateQuestion)
  .delete("/delete-question", verifyToken, deleteQuestion);

export default router;
