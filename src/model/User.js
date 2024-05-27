// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationExpires: Date,
  seller: { type: Boolean, default: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
