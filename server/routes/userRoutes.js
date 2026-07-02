const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const role = require("../middleware/requireRole");
const auth = require("../middleware/tokenAuth");

router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", authController.login);

module.exports = router;