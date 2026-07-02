

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

// Create specific painting attributes
exports.createPainting = async (painting_id, medium, dimensions, location, year) => {
  const [result] = await db.query(
    "INSERT INTO painting (painting_id, medium, dimensions, location, year) VALUES (?, ?, ?, ?, ?)",
    [painting_id, medium, dimensions, location, year]
  );
  return result;
};

// Browse by Category
exports.browseByCategory = async (category_id) => {
  const [rows] = await db.query(
    `SELECT * FROM article WHERE category_id = ? 
    AND deleted_date IS NULL`, // Don't show deleted articles
    [category_id]
  );

  return rows;
};

exports.browseByKeyword = async (keyword) => {
  const [rows] = await db.query(
    `SELECT * FROM article WHERE name LIKE ?
     AND deleted_date IS NULL`, // Don't show deleted articles
    [`%${keyword}%`]
  );

  return rows;
};


// Soft delete an article
exports.deleteArticle = async (article_id, deleted_by, deleted_date) => {
  const [result] = await db.query(
    `UPDATE article SET deleted_by = ?, deleted_date = ? WHERE article_id = ?`,
    [deleted_by, deleted_date, article_id]
  );
  
  return result;
};

// Update an article
exports.updateArticle = async (article_id, category_id, name, about, modified_by, modified_date) => {

  const [result] = await db.query(
    `UPDATE article SET category_id = ?, name = ?, about = ?, modified_by = ?, modified_date = ? WHERE article_id = ?`,
    [category_id, name, about, modified_by, modified_date, article_id]
  );

  return result;
};

// Update specific biography attributes
exports.updateBiography = async (biography_id, born, died, nationality, known_for, notable_works) => {

  const [result] = await db.query(
    `UPDATE biography SET born = ?, died = ?, nationality = ?, known_for = ?, notable_works = ? WHERE biography_id = ?`,
    [born, died, nationality, known_for, notable_works, biography_id]
  );

  return result;
};

// Update specific programming attributes
exports.updateProgramming = async (programming_id, designed_by, developer) => {

  const [result] = await db.query(
    `UPDATE programming SET designed_by = ?, developer = ? WHERE programming_id = ?`,
    [designed_by, developer, programming_id]
  );

  return result;
};

// Update specific painting attributes
exports.updatePainting = async (painting_id, medium, dimensions, location, year) => {

  const [result] = await db.query(
    `UPDATE painting SET medium = ?, dimensions = ?, location = ?, year = ? WHERE painting_id = ?`,
    [medium, dimensions, location, year, painting_id]
  );

  return result;
};

// Get article by ID
exports.getArticleById = async (article_id) => {
  const [rows] = await db.query(
    `SELECT * FROM article WHERE article_id = ?`,
    [article_id]
  );

  return rows[0];
};