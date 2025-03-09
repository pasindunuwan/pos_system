const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const verifyToken = require("../middleware/Auth.js");
router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  orderController.saveOrder
);
router.put("/update/:id", verifyToken(["admin"]), orderController.updateOrder);
router.delete(
  "/delete/:id",
  verifyToken(["admin"]),
  orderController.deleteOrder
);
router.get("/find/:id", verifyToken(["admin"]), orderController.findOrder);
router.get(
  "/find-all",
  verifyToken(["admin", "manager", "user"]),
  orderController.loadAllOrder
);
router.put(
  "/update-status/:id",
  verifyToken(["admin", "manager", "user"]),
  orderController.updateOrderStatus
);
module.exports = router;
