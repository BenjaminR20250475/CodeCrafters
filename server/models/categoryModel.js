const db = require("../dbConnection");

// Create a category
exports.createCategory = async (category_name) => {
  const [result] = await db.query(
    "INSERT INTO category (category_name) VALUES (?)",
    [category_name]
  );

  return result;
};

// Delete a category
exports.deleteCategory = async (category_id) => {
  const [result] = await db.query(
    "DELETE FROM category WHERE category_id = ?",
    [category_id]
  );

  return result;
};