import mongoose from "mongoose";
import { DATABASE } from "../config.js";

export const dbConnection = async () => {
  try {
    await mongoose.connect(DATABASE);
    console.log("Welcome to MongoDB, you are connected with me");
  } catch (err) {
    console.log(err);
  }
}
