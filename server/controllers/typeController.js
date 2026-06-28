const typeModel = require("../models/typeModel");

// Create a type
exports.createType = async (req, res) => {
  try {
    const { type_name } = req.body;

    const result = await typeModel.createType(type_name);

    res.status(201).json({
      message: "Type created",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a type
exports.deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    await typeModel.deleteType(id);

    res.json({ message: "Type deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};