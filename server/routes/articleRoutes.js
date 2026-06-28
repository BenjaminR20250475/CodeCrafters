


const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");

router.get("/category/:id", articleController.browseByCategory);
router.get("/search", articleController.browseByKeyword);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);
router.post("/", articleController.createArticle);

module.exports = router;