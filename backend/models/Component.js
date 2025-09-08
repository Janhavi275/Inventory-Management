const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  materialId: String,
  materialName: String,
  quantity: Number,
  price: Number,
  category: String,
  partNo: String,
  description: String,
  purpose: String,
});

module.exports = mongoose.model("Component", componentSchema);
