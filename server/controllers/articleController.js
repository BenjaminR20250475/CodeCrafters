

const articleModel = require("../models/articleModel");


// Create an article
exports.createArticle = async (req, res) => {
  try {
    const { category_id, type_id, name, about, created_by } = req.body;

    const result = await articleModel.createArticle( category_id, type_id, name, about, created_by );

    if(!result) return res.status(404).json({message: "Article not found"}); // Check that the article exists

    const article_id = result.insertId;

    // If the type_id selected matches the "biography" type then add attributes unique to biograhpy 
    if (type_id === 1) {
      await articleModel.createBiography(
        article_id,
        req.body.born,
        req.body.died,
        req.body.nationality,
        req.body.known_for,
        req.body.notable_works
      );
    }


    res.status(201).json({
      message: "Article created",
      id: result.insertId,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleted_by } = req.body; // Include the ID of the user who deletes the article

    const deleted_date = new Date(); // Get the curret date so that the time of teletion can be added

    const result = await articleModel.deleteArticle(
      id,
      deleted_by,
      deleted_date
    );
    
    if(!result) return res.status(404).json({message: "Article not found"}); // Check that the article exists

    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};