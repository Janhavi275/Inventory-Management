const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Admin login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, role: "admin" });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: "Invalid Admin credentials" });
  }
};

// Employee login
exports.loginEmployee = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, role: "employee" });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: "Invalid Employee credentials" });
  }
};

// Register user (for initial setup, later only admin should register)
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ username, password, role });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};
