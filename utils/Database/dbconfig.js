import { connect } from "mongoose";



export default async function main() {
  await connect(process.env.DATABASE_URL);
  console.log("Database connected");
}
