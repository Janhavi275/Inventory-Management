const mongoose = require("mongoose");

const capacitorSchema = new mongoose.Schema({
  partNo: String,
  capacitance: String,
  voltage: String,
  description: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model("Capacitor", capacitorSchema, "capacitors");
