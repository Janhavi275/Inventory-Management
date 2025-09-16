const User = require("../models/User");   // Admins
const Employee = require("../models/Employee"); // Employees
const generateToken = require("../utils/generateToken");

// 🔑 Admin Login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, role: "admin" });
    if (!user) return res.status(401).json({ message: "Admin not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Admin credentials" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 👨‍💼 Employee Login
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email, status: "Active" });
    if (!employee) return res.status(401).json({ message: "Employee not found or inactive" });

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Employee credentials" });
    }

    res.json({
      _id: employee._id,
      employeeId: employee.employeeId,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      token: generateToken(employee._id, employee.role),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📝 Register User (Admin / Employee)
exports.registerUser = async (req, res) => {
  const {
    username,
    password,
    role,
    employeeId,
    name,
    email,
    phone,
    department,
    address,
    salary,
    bankdetails,
    accountNo,
    ifscCode,
    bankBranch,
    AadharCardNo,
    PANCardNo,
    status,
    extraFields,
  } = req.body;

  try {
    if (role === "admin") {
      // prevent duplicates
      const userExists = await User.findOne({ username });
      if (userExists) return res.status(400).json({ message: "Admin already exists" });

      const user = await User.create({ username, password, role: "admin" });

      return res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
      });

    } else if (role === "employee") {
      const employeeExists = await Employee.findOne({ email });
      if (employeeExists) return res.status(400).json({ message: "Employee already exists" });

      const employee = await Employee.create({
        employeeId,
        name,
        email,
        password,
        role: role || "Staff",
        phone,
        department,
        address,
        salary,
        bankdetails,
        accountNo,
        ifscCode,
        bankBranch,
        AadharCardNo,
        PANCardNo,
        status: status || "Active",
        extraFields,
      });

      return res.status(201).json({
        _id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
      });

    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🔎 Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
