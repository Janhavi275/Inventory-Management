const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // adjust path if needed

mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createUsers() {
  const hashedAdminPass = await bcrypt.hash("123456", 10);
  const hashedEmpPass = await bcrypt.hash("abcdef", 10);

  await User.deleteMany({}); // remove old users

  await User.create([
    { username: "admin1", password: hashedAdminPass, role: "admin" },
    { username: "emp1", password: hashedEmpPass, role: "employee" },
  ]);

  console.log("✅ Admin and Employee created with hashed passwords");
  mongoose.connection.close();
}

createUsers();
