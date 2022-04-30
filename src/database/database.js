import {} from "dotenv/config";
import mongoose from "mongoose";

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