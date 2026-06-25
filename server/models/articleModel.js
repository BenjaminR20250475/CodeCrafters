

const db = require("../dbConnection");


// Create basic Article with all common attributes
exports.createArticle = async (category_id, type_id, name, about, created_by) => {
  const [result] = await db.query(
    "INSERT INTO article (category_id, type_id, name, about, created_by) VALUES (?, ?, ?, ?, ?)",
    [category_id, type_id, name, about, created_by]
  );
  return result;
};

// Create specific biography attributes
exports.createBiography = async (biography_id, born, died, nationality, known_for, notable_works) => {
  const [result] = await db.query(
    "INSERT INTO biography (biography_id, born, died, nationality, known_for, notable_works) VALUES (?, ?, ?, ?, ?, ?)",
    [biography_id, born, died, nationality, known_for, notable_works]
  );
  return result;
};

// Create specific programming attributes
exports.createProgramming = async (programming_id, designed_by, developer) => {
  const [result] = await db.query(
    "INSERT INTO programming (programming_id, designed_by, developer) VALUES (?, ?, ?)",
    [programming_id, designed_by, developer]
  );
  return result;
};

// Browse by Category
exports.getArticlesByCategory = async (category_id) => {
  const [rows] = await db.query(
    `SELECT *
     FROM article
     WHERE category_id = ?
     AND deleted_date IS NULL`, // Don't show deleted artciles
    [category_id]
  );

  return rows;
};

// Create specific painting attributes
exports.createPainting = async (painting_id, medium, dimensions, location, year) => {
  const [result] = await db.query(
    "INSERT INTO painting (painting_id, medium, dimensions, location, year) VALUES (?, ?, ?, ?, ?)",
    [painting_id, medium, dimensions, location, year]
  );
  return result;
};

// Soft delete an article
exports.deleteArticle = async (article_id, deleted_by, deleted_date) => {
  const [result] = await db.query(
    `UPDATE article SET deleted_by = ?, deleted_date = ? WHERE article_id = ?`,
    [deleted_by, deleted_date, article_id]
  );
  
  return result;
};