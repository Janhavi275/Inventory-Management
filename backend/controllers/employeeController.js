const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add New Employee
exports.addEmployee = async (req, res) => {
  try {
    const {
      employeeId, name, email, password, role, department,
      phone, address, salary, bankdetails, accountNo,
      ifscCode, bankBranch, AadharCardNo, PANCardNo,
      status, extraFields
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const exists = await Employee.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Employee already exists with this email" });
    }

    const newEmployee = new Employee({
      employeeId, name, email, password, role: role || "Staff",
      department, phone, address, salary, bankdetails,
      accountNo, ifscCode, bankBranch, AadharCardNo,
      PANCardNo, status: status || "Active",
      extraFields: extraFields || []
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Employee (No Password Here)
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.password) delete req.body.password;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Single Field (Fixed or Dynamic)
exports.updateEmployeeField = async (req, res) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const fixedFields = [
      "employeeId", "name", "email", "role", "department",
      "phone", "address", "salary", "bankdetails",
      "accountNo", "ifscCode", "bankBranch", "AadharCardNo",
      "PANCardNo", "status"
    ];

    if (fixedFields.includes(field)) {
      employee[field] = value;
    } else {
      const existing = employee.extraFields.find(f => f.key === field);
      if (existing) {
        existing.value = value;
      } else {
        employee.extraFields.push({ key: field, value });
      }
    }

    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove Dynamic Field From All Employees
exports.removeFieldFromAll = async (req, res) => {
  try {
    const { key } = req.params;
    await Employee.updateMany({}, { $pull: { extraFields: { key } } });
    res.json({ message: `Field '${key}' removed from all employees.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Old and new passwords are required" });

    const employee = await Employee.findById(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const isMatch = await bcrypt.compare(oldPassword, employee.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect" });

    employee.password = newPassword;
    await employee.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
