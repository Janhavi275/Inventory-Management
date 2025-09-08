const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // adjust path if needed

// @route   POST /api/auth/login
// @desc    Login for admin/employee
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // ✅ Validation
    if (!username || !password || !role) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // ✅ Check user in DB
    const user = await User.findOne({ username, role });
    console.log("🔍 Login attempt:", { username, role });
    console.log("👉 Found user:", user);

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // ✅ Success response
    res.json({
      msg: "Login successful",
      username: user.username,
      role: user.role
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ msg: "Server error" }); // ✅ Always return JSON
  }
});

module.exports = router;
