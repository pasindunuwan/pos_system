const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Customer: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Order", orderSchema);
