const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const verifyToken = require("../middleware/Auth.js");

router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  productController.saveProduct
);
router.put(
  "/update/:id",
  verifyToken(["admin"]),
  productController.updateProduct
);
router.delete(
  "/delete/:id",
  verifyToken(["admin"]),
  productController.deleteProduct
);
router.get(
  "/find/:id",
  verifyToken(["admin", "manager", "user"]),
  productController.findProduct
);
router.get(
  "/find-all",
  verifyToken(["admin", "manager", "user"]),
  productController.loadAllProduct
);
router.get(
  "/lower-qty-list",
  verifyToken(["admin", "manager"]),
  productController.findLowStockProducts
);
module.exports = router;
