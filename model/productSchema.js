const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  //new mongoose.Schema({...}) creates a new schema object.
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  qtyOnHand: {
    type: Array,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema); //Creates a model named "Product".
