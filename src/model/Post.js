// models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  address: { type: String, required: true },
  area: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  colleges: { type: String },
  description: { type: String },
  hospital: { type: String },
  landmark: { type: String },
  photos: { type: [String] },
  rent: { type: Number, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  liked: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Updated to be an array of User IDs
  interestedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
});

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
