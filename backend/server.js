const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const componentRoutes = require("./routes/components");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/components", componentRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/inventoryDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
