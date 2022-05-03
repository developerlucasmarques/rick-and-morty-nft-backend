import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDatabase = () => {
  console.log("Connecting to database...");

  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected MongoDB!"))
    .catch((err) => console.log(`Error connecting to MongoDB ${err.message}`));
};
