const categoryModel = require("../models/categoryModel");

// Create a category
exports.createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const result = await categoryModel.createCategory(category_name);

    if (!result) {
      return res.status(404).json({ message: "Category not created" });
    }

    res.status(201).json({
      message: "Category created",
      id: result.insertId,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoryModel.deleteCategory(id);

    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      message: "Category deleted",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};