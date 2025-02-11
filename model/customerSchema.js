const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Customer", customerSchema);
