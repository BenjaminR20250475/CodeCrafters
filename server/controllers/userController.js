
const bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");


// Create a user
exports.createUser = async (req, res) => {
  try {

    const { role_id, name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
      message: "Email already exists"
      });
    };


    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.createUser(
      role_id,
      name,
      email,
      hashedPassword
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