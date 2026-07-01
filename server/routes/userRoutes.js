const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const role = require("../middleware/requireRole");
const auth = require("../middleware/tokenAuth");

router.post("/", auth, role(3), userController.createUser);
router.delete("/:id", auth, role(3), userController.deleteUser);
router.post("/login", authController.login);

module.exports = router;