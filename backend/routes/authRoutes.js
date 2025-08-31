const express = require("express");
const { loginAdmin, loginEmployee, registerUser } = require("../controllers/authController");

const router = express.Router();

router.post("/admin-login", loginAdmin);
router.post("/employee-login", loginEmployee);
router.post("/register", registerUser);

module.exports = router;
