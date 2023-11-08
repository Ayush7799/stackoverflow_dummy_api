import dotenv from "dotenv";
import express from "express";
import addRoutes from "./routes/index.js";
import main from "./utils/Database/dbconfig.js";
import { logger } from "./utils/loggers/logger.js";
import responseTime from "response-time";
import { client } from "./utils/Database/redisConfig.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(responseTime());
app.set("view engine", "ejs");
app.set("views", "./templates");

addRoutes(app);
try {
  await main();
  await client.connect();
} catch (error) {
  logger.error(error);
}
app.listen(PORT, () => {
  logger.info(`Server is running on ${PORT}`);
});

// logger.info('This is an informational message.');
// logger.warn('This is a warning message.');
// logger.error('This is an error message.');
