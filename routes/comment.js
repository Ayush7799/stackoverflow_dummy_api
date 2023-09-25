import { Router } from "express";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controller/comment.js";
import { verifyToken } from "../services/jwtAuthentication.js";

const router = Router();

router
  .post("/upload-comment", verifyToken, addComment)
  .patch("/update-comment", verifyToken, updateComment)
  .delete("/delete-comment", verifyToken, deleteComment);

export default router;
