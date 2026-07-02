const db = require("../dbConnection");

// Create a new role
exports.createRole = async (role_name) => {
  const [result] = await db.query(
    "INSERT INTO role (role_name) VALUES (?)",
    [role_name]
  );

  return result;
};

// Delete a role
exports.deleteRole = async (role_id) => {
  const [result] = await db.query(
    "DELETE FROM role WHERE role_id = ?",
    [role_id]
  );

  return result;
};