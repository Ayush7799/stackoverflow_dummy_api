import { connect } from "mongoose";
import { logger } from "../loggers/logger.js";

export default async function main() {
  try {
    await connect(process.env.DATABASE_URL);
    logger.info("Database connected");
  } catch (error) {
    logger.error(error);
  }
}
