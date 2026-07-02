const express = require("express");
const router = express.Router();

const typeController = require("../controllers/typeController");
const role = require("../middleware/requireRole");
const auth = require("../middleware/tokenAuth");

router.post("/", auth, role(3), typeController.createType);
router.delete("/:id", auth, role(3), typeController.deleteType);

module.exports = router;