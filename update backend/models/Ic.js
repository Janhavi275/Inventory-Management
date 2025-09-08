const mongoose = require("mongoose");

const icSchema = new mongoose.Schema({
  partNo: String,
  type: String,
  package: String,
  description: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model("Ic", icSchema, "ics");
