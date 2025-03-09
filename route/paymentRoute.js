const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");
const verifyToken = require("../middleware/Auth.js");
//im
router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  paymentController.makePayment
);
router.get(
  "/income-by-month",
  verifyToken(["admin", "manager"]),
  paymentController.findIncomeToday
);
router.get(
  "/income-by-month",
  verifyToken(["admin", "manager"]),
  paymentController.findIncomeByCurrentMonth
);
module.exports = router;
