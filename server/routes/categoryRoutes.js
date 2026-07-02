const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const role = require("../middleware/requireRole");
const auth = require("../middleware/tokenAuth");

router.post("/", auth, role(3), categoryController.createCategory);
router.delete("/:id", auth, role(3), categoryController.deleteCategory);

module.exports = router;