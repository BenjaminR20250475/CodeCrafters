


const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");
const role = require("../middleware/requireRole");
const auth = require("../middleware/tokenAuth");

router.get("/category/:id", auth, articleController.browseByCategory);
router.get("/search", auth, articleController.browseByKeyword);
router.put("/:id", auth, role(2, 3), articleController.updateArticle);
router.delete("/:id", auth, role(3), articleController.deleteArticle);
router.post("/", auth, role(2, 3), articleController.createArticle);

module.exports = router;