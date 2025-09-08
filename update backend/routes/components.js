const express = require("express");
const router = express.Router();
const Capacitor = require("../models/Capacitor");
const Resistor = require("../models/Resistor");
const IC = require("../models/Ic")

// Fetch all components
router.get("/all", async (req, res) => {
  try {
    const capacitors = await Capacitor.find();
    const resistors = await Resistor.find();
    const ics = await IC.find();
    res.json([...capacitors, ...resistors, ...ics]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch by category
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    let data;

    if (category === "capacitor") data = await Capacitor.find();
    else if (category === "resistor") data = await Resistor.find();
    else if (category === "ic") data = await IC.find();
    else return res.status(404).json({ error: "Category not found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
