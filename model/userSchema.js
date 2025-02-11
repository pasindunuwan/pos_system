const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  role: {
    type: Array, //[{role;manager},{role:user},{role:admin}]
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
