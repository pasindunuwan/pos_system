const express = require("express");
const router = express.Router();
const customerController = require("../controller/CustomerController");
const verifyToken = require("../middleware/Auth.js");
router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  customerController.saveCustomer
);
router.put(
  "/update/:id",
  verifyToken(["admin"]),
  customerController.updateCustomer
);
router.delete(
  "/delete/:id",
  verifyToken(["admin"]),
  customerController.deleteCustomer
);
router.get(
  "/find/:id",
  verifyToken(["admin", "manager", "user"]),
  customerController.findCustomer
);
router.get(
  "/find-all",
  verifyToken(["admin", "user", "manager"]),
  customerController.loadAllCustomer
);
module.exports = router;
