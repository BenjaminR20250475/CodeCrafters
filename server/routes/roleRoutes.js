const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");

router.post("/", roleController.createRole);
router.delete("/:id", roleController.deleteRole);

module.exports = router;