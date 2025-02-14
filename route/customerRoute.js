const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
router.post("/create", customerController.saveCustomer);
router.put("/update/:id", customerController.updateCustomer);
router.delete("/delete/:id", customerController.deleteCustomer);
router.get("/find/:id", customerController.findCustomer);
router.get("/find-all", customerController.loadAllCustomer);
module.exports = router;
