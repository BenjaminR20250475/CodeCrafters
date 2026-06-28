

const articleModel = require("../models/articleModel");


// Create an article
exports.createArticle = async (req, res) => {
  try {
    const { category_id, type_id, name, about, created_by } = req.body;

    const result = await articleModel.createArticle( category_id, type_id, name, about, created_by );

    const article_id = result.insertId;

    // If the type_id selected matches the "Biography" type then add attributes unique to biograhpy 
    // ID 1 is Biography in the db
    if (Number(type_id) === 1) {
      await articleModel.createBiography(
        article_id,
        req.body.born,
        req.body.died,
        req.body.nationality,
        req.body.known_for,
        req.body.notable_works
      );
    }

    // If the type_id selected matches the "Programming" type then add attributes unique to programming
    // ID 2 is Programming in the db
    else if (Number(type_id) === 2) {
      await articleModel.createProgramming(
        article_id,
        req.body.designed_by,
        req.body.developer
      );
    }

    // If the type_id selected matches the "Painting" type then add attributes unique to painting
    // ID 3 is Programming in the db
    else if (Number(type_id) === 3) {
      await articleModel.createPainting(
        article_id,
        req.body.medium,
        req.body.dimensions,
        req.body.location,
        req.body.year
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

// Browse by category
exports.browseByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const articles = await articleModel.browseByCategory(id);

    if(!articles) return res.status(404).json({message: "Category not found"}); // Check that the category exists

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Browse by keyword
exports.browseByKeyword = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === "") {
  return res.status(400).json({
    message: "Please enter a keyword"
  });
};

    const articles = await articleModel.browseByKeyword(keyword);


    res.json(articles);
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

exports.updateArticle = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      category_id,
      name,
      about,
      modified_by
    } = req.body;

    const modified_date = new Date(); // Update modified date

    // Get the article so we know its type
    const article = await articleModel.getArticleById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" }); // Check that the article exsists
    }

    const type_id = article.type_id; // Get the type ID from the article

    // Update the common article attributes first
    await articleModel.updateArticle(
      id,
      category_id,
      name,
      about,
      modified_by,
      modified_date
    );


    // Update biograhy attributes
    if (Number(type_id) === 1) {
      await articleModel.updateBiography(
        id,
        req.body.born,
        req.body.died,
        req.body.nationality,
        req.body.known_for,
        req.body.notable_works
      );
    }

    // Update programming attributes
    else if (Number(type_id) === 2) {
      await articleModel.updateProgramming(
        id,
        req.body.designed_by,
        req.body.developer
      );
    }

    // Update painting attributes
    else if (Number(type_id) === 3) {
      await articleModel.updatePainting(
        id,
        req.body.medium,
        req.body.dimensions,
        req.body.location,
        req.body.year
      );
    }

    res.json({ message: "Article updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};