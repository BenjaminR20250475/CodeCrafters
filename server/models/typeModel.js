const db = require("../dbConnection");

// Create a type
exports.createType = async (type_name) => {
  const [result] = await db.query(
    "INSERT INTO type (type_name) VALUES (?)",
    [type_name]
  );

  return result;
};

// Delete a type
exports.deleteType = async (type_id) => {
  const [result] = await db.query(
    "DELETE FROM type WHERE type_id = ?",
    [type_id]
  );

  return result;
};