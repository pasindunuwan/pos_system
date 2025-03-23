const Product = require("../model/productSchema");

//function
const saveProduct = async (req, resp) => {
  //admin//manager
  try {
    const createdProduct = new Product(req.body);
    const savedProduct = await createdProduct.save();
    resp.status(201).json({ message: "product saved", data: savedProduct });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const updateProduct = async (req, resp) => {
  //admin//manager
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updateProduct) {
      resp.status(201).json({ messge: "product updated", data: updateProduct });
    }
    if (!updateProduct) {
      resp.status(404).json({ messge: "product not found" });
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const deleteProduct = async (req, resp) => {
  try {
    const deletedProduct = await customer.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      resp
        .status(201)
        .json({ messge: "Product deleted", data: deletedProduct });
    }
    resp.status(404).json({ messge: "Product not found" });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const findProduct = async (req, resp) => {
  try {
    const selectedProduct = await Product.findById(req.params.id);
    if (selectedProduct) {
      resp.status(201).json({ messge: "Product found", data: selectedProduct });
    }
    if (!selectedProduct) {
      resp.status(404).json({ messge: "Product not found" });
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const loadAllProduct = async (req, resp) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { productName: { $regex: searchText, $options: "i" } },
            { description: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};
    const productList = await Product.find(filter)
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await Product.countDocuments(filter);

    resp.status(200).json({
      messge: "data list",
      data: { dataList: productList, count: total },
    });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};
const findLowStockProducts = async (req, resp) => {
  try {
    const dataList = await Product.findLowStockProducts();
    resp.status(201).json({ message: "lower qty list", data: dataList });
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
};

module.exports = {
  saveProduct,
  updateProduct,
  deleteProduct,
  findProduct,
  loadAllProduct,
  findLowStockProducts,
};
