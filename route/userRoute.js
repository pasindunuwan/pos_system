const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");

router.post("/signup", userController.login);
router.post("/login", userController.signup);

module.exports = router;

module.exports = router;
