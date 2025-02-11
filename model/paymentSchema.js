const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  order: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  extraCharges: {
    type: Array, //[{reason:'',amount:250}]
    required: true,
  },
  status: {
    type: String, //pending, Rejected, Completed,Cancelled
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  transactionDetails: {
    type: Object,
    required: true,
  },
});
module.exports = mongoose.model("Payment", paymentSchema);
