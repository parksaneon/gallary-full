const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: ture },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
