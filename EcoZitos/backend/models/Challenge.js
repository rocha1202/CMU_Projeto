import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  photos: [String], // ou array de objetos se quiseres mais detalhe
reviews: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    comment: String,
    photos: [String],
    hearts: { type: Number, default: 0 },
    createdAt: Date,
  }
],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Challenge", challengeSchema);
