import mongoose from "mongoose";

const CharactersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const Characters = mongoose.model("characters", CharactersSchema);
