import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import userRouter from "./routes/user.js";
import answerRouter from "./routes/answer.js";
import commentRouter from "./routes/comment.js";
import questionRouter from "./routes/question.js";


dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/answers", answerRouter);
app.use("/comments", commentRouter);

main().catch((err) => console.log(err));

async function main() {
  await connect(process.env.DATABASE_URL);
  console.log("Database connected");
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
