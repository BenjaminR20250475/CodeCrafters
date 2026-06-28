const db = require("../dbConnection");

// Create a new user
exports.createUser = async (role_id, name, email, password) => {
  const [result] = await db.query(
    "INSERT INTO user (role_id, name, email, password) VALUES (?, ?, ?, ?)",
    [role_id, name, email, password]
  );

  return result;
};

// Delete a user
exports.deleteUser = async (user_id) => {
  const [result] = await db.query(
    "DELETE FROM user WHERE user_id = ?",
    [user_id]
  );

  return result;
};