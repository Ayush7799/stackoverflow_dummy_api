import { Router } from "express";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../services/comment.js";
import { verifyToken } from "../utils/authentication/jwtAuthentication.js";
import { addCommentController, deleteCommentController, getAllController, updateCommentController } from "../controller/comment.js";

const router = Router();

router
.get("/get-all",getAllController)
  .post("/upload-comment", verifyToken, addCommentController)
  .patch("/update-comment", verifyToken, updateCommentController)
  .delete("/delete-comment", verifyToken, deleteCommentController);

export default router;
