const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");
const role = require("../middleware/requireRole");
const auth = require("../middleware/tokenAuth");

router.post("/", auth, role(3), roleController.createRole);
router.delete("/:id", auth, role(3), roleController.deleteRole);

module.exports = router;