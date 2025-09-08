const mongoose = require("mongoose");

const resistorSchema = new mongoose.Schema({
  partNo: String,
  resistance: String,
  wattage: String,
  description: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model("Resistor", resistorSchema, "resistors");
