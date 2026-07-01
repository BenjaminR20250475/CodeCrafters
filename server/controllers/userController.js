const userModel = require("../models/userModel");

// Create a user
exports.createUser = async (req, res) => {
  try {
    const { role_id, name, email, password } = req.body;

    const result = await userModel.createUser(
      role_id,
      name,
      email,
      password
    );

    res.status(201).json({
      message: "User created",
      id: result.insertId,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await userModel.deleteUser(id);

    res.json({
      message: "User deleted",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};