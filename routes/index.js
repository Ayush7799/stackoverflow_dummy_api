import userRouter from "../routes/user.js";
import questionRouter from "../routes/question.js";
import answerRouter from "../routes/answer.js";
import commentRouter from "../routes/comment.js";

export default function addRoutes(app) {
  app.use("/users", userRouter);
  app.use("/questions", questionRouter);
  app.use("/answers", answerRouter);
  app.use("/comments", commentRouter);
}
