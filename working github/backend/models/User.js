const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,      // prevent duplicate usernames
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],  // only allow these two
    required: true,
  }
});

module.exports = mongoose.model("User", UserSchema);
