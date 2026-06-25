


const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");

router.get("/category/:id", articleController.getByCategory);
router.post("/", articleController.createArticle);
router.delete("/:id", articleController.deleteArticle);
//router.put("/:id", articleController.modifiyArticle);


module.exports = router;