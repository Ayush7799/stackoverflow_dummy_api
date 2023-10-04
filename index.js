import dotenv from "dotenv";
import express from "express";
import addRoutes from "./routes/index.js";
import main from "./utils/Database/dbconfig.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
addRoutes(app);

main().catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
