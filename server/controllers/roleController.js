const roleModel = require("../models/roleModel");

// Create a role
exports.createRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    const result = await roleModel.createRole(role_name);

    res.status(201).json({
      message: "Role created",
      id: result.insertId,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await roleModel.deleteRole(id);

    res.json({
      message: "Role deleted",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};